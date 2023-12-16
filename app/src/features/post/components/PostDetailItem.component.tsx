import { FontAwesome5 } from "@expo/vector-icons";
import { memo, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";

import ReadMore from "@fawazahmed/react-native-read-more";
import { Avatar } from "@src/components/Avatar";
import { FastImageBackground } from "@src/components/image";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import FastImage from "react-native-fast-image";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { useTheme } from "styled-components";
import CommentPostModal from "../components/CommentPostModal.component";
import { Heart } from "../components/ReactionBar.component";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const MAX_MODAL_HEIGHT = (-SCREEN_HEIGHT * 2) / 3;
const MIN_MODAL_HEIGHT = 0;
const SWIPE_THRESHOLD = 50;
const Y_VELOCITY_SWIPE_THRESHOLD = 200;
const MODAL_ANIM_DURATION = 300;

const config = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80,
};

const PostDetailItem = ({
  onCommentModalVisibleChange,
  post,
  autoFocus = false,
}) => {
  const [isCommentVisible, setIsCommentVisible] = useState(autoFocus);
  const theme = useTheme();
  const { data: postCreator } = useGetUserByIdQuery(post.user);
  console.log("SELECTED POST", post);
  //hide modal
  const modalHeight = useSharedValue(MAX_MODAL_HEIGHT);
  const oldModalHeight = useRef(-1);

  const openFullModal = () => {
    modalHeight.value = withTiming(
      MIN_MODAL_HEIGHT,
      {
        duration: MODAL_ANIM_DURATION,
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsCommentVisible)(true);
        }
      }
    );
    // modalHeight.value = MIN_MODAL_HEIGHT;

    oldModalHeight.current = MIN_MODAL_HEIGHT;
  };
  const hideModal = () => {
    modalHeight.value = withTiming(
      MAX_MODAL_HEIGHT,
      {
        duration: MODAL_ANIM_DURATION,
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsCommentVisible)(false);
        }
      }
    );
    // modalHeight.value = MAX_MODAL_HEIGHT;
    oldModalHeight.current = MAX_MODAL_HEIGHT;
  };

  useEffect(() => {
    onCommentModalVisibleChange(isCommentVisible);
  }, [isCommentVisible]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     translateY: modalHeight.value,
      //   },
      // ],
      bottom: modalHeight.value,
    };
  });
  const handleSwipeUp = () => {
    if (isCommentVisible) {
      hideModal();
    } else {
      // openFullModal();
    }
  };
  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        handleSwipeUp();

        break;
      case SWIPE_DOWN:
        console.log("down", gestureState);
        hideModal();
        break;
      case SWIPE_LEFT:
        console.log("left", gestureState);

        break;
    }
  };
  return (
    <GestureRecognizer
      onSwipe={onSwipe}
      config={config}
      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          hideModal();
        }}
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.bg.primary,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <FastImageBackground
            fallback={true}
            source={{
              uri: post.image,
            }}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
            imageStyle={{
              flex: 1,
              backgroundColor: "gray",
            }}
            resizeMode={FastImage.resizeMode.contain}
          >
            <View style={{}}>
              <UserInfoContainer>
                <Avatar
                  width={70}
                  height={70}
                  source={{ uri: postCreator?.avatar }}
                />
                <View
                  style={{
                    marginLeft: 12,
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  <CreatorName>{postCreator?.nickname}</CreatorName>
                  <Text style={{ color: theme.colors.text.primary }}>
                    {postCreatedTimeFormatter(post.createdAt)}
                  </Text>
                </View>
              </UserInfoContainer>
              <PostContent></PostContent>
            </View>
          </FastImageBackground>
          <View
            style={{
              position: "absolute",
              top: "35%",
              height: 100,
              alignItems: "center",
              justifyContent: "space-between",
              right: 12,
            }}
          >
            <Heart post={post}></Heart>
            <TouchableOpacity
              style={{ marginTop: 12 }}
              onPress={() => openFullModal()}
            >
              <FontAwesome5 name="comment-dots" size={40} color={"white"} />
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback
            onPress={() => {
              console.log("modal");
            }}
          >
            <Animated.View
              style={[
                {
                  position: "absolute",
                  height: "66%",
                  //for hiding modal
                  // bottom: MIN_MODAL_HEIGHT,
                  width: "100%",
                },
                animatedStyle,
              ]}
            >
              <CommentPostModal
                isVisible={true}
                onClose={hideModal}
                isFocusInput={autoFocus}
              ></CommentPostModal>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </GestureRecognizer>
  );
};

const PostContent = memo(({ post, openFullModal }) => (
  <PostDescriptionContainer numberOfLines={2}>
    <PostDescription>
      {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
      }
    </PostDescription>
  </PostDescriptionContainer>
));
const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  padding-bottom: 12px;

  border-bottom-color: ${(props) => props.theme.colors.text.primary};
`;

const PostDescription = styled(Text)`
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const UserInfoContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  margin-horizontal: 24px;
`;

export default PostDetailItem;
