import {
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from "react-native-reanimated";

import { postSelector, userSelector } from "@src/store/selector";
import ReadMore from "@fawazahmed/react-native-read-more";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import { reactPost, updateSelectedPost } from "@src/store/slices/postSlice";
import { getSocket } from "@src/utils/socket";
import { Avatar } from "@src/components/Avatar";
import FastImage from "react-native-fast-image";
import CommentItemComponent from "../components/CommentItem.component";
import { FastImageBackground } from "@src/components/image";
import CommentPostModal from "../components/CommentPostModal.component";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";
import { Heart } from "../components/ReactionBar.component";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MIN_MODAL_HEIGHT = (-SCREEN_HEIGHT * 2) / 3;
const MAX_MODAL_HEIGHT = 0;

const DetailPost = ({ route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  // const imageHeightAnim = useRef(new Animated.Value(300)).current;
  const userState = useSelector(userSelector);
  const { autoFocus } = route.params;
  const { selectedPost } = useSelector(postSelector);
  const { data: postCreator } = useGetUserByIdQuery(selectedPost.user);

  console.log("SELECTED POST", selectedPost);
  //hide modal
  const modalHeight = useSharedValue(MAX_MODAL_HEIGHT);
  const oldModalHeight = useRef(-1);
  //total y moved
  const deltaTranslationY = useRef(0);
  const [heart, setHeart] = useState(false);
  const [modalVisible, setModalVisible] = useState(autoFocus);

  const openFullModal = () => {
    // modalHeight.value = withTiming(MIN_MODAL_HEIGHT);
    modalHeight.value = MIN_MODAL_HEIGHT;

    oldModalHeight.current = MIN_MODAL_HEIGHT;
  };
  const hideModal = () => {
    console.log("Hide modal");
    // modalHeight.value = withTiming(MAX_MODAL_HEIGHT, {
    //   duration: 500,
    // });
    modalHeight.value = MAX_MODAL_HEIGHT;
    oldModalHeight.current = MAX_MODAL_HEIGHT;
  };

  const handleReact = () => {
    dispatch(
      reactPost({ postId: selectedPost._id, postCreatorId: selectedPost.user })
    );
    setHeart(!heart);
  };
  const openCommentModal = () => {
    setModalVisible(true);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (a, ctx) => {
      ctx.oldY = 0;
      console.log("CTX start", a, ctx);
    },
    onActive: (event, ctx) => {
      // newHeight = ctx.startY - event.translationY;
      if (oldModalHeight.current == -1) {
        modalHeight.value = event.translationY;
      } else {
        let newValue = oldModalHeight.current + event.translationY - ctx.oldY;
        modalHeight.value = Math.max(
          MIN_MODAL_HEIGHT,
          Math.min(MAX_MODAL_HEIGHT, newValue)
        );
        console.log("CTX act", newValue, modalHeight.value, event, ctx);
      }

      oldModalHeight.current = modalHeight.value;
      ctx.oldY = event.translationY;
    },
    onEnd: (a, ctx) => {
      // x.value = withSpring(0);
      console.log("CTX end", a, ctx);
      handleIsRenderHalfModal();
    },
  });
  const handleIsRenderHalfModal = () => {
    if (modalHeight.value > MIN_MODAL_HEIGHT / 2) {
      hideModal();
    } else {
      openFullModal();
    }
  };

  useEffect(() => {
    //check if user reacted this selectedPost
    const res = selectedPost.likes.find((object) => {
      return object.userId == userState.user._id;
    });
    if (res) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }, [selectedPost.likes]);
  useEffect(() => {
    socket.on("new-comment", (data) => {
      dispatch(updateSelectedPost({ type: "comment", ...data }));
    });
    socket.on("react-post", (postId, reactUserId, isAddedToList) => {
      dispatch(
        updateSelectedPost({
          type: "react",
          postId,
          reactUserId,
          isAddedToList,
        })
      );
    });
  }, [socket]);

  console.log("selectedPost,selectedPost.comments", selectedPost.comments);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // bottom: modalHeight.value,
      transform: [
        {
          translateY: modalHeight.value,
        },
      ],
    };
  });
  return (
    <PanGestureHandler
      onGestureEvent={gestureHandler}
      // onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.bg.primary,
          },
        ]}
      >
        <FastImageBackground
          fallback={true}
          source={{
            uri: selectedPost.image,
          }}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "gray",
          }}
          imageStyle={{
            flex: 1,
            backgroundColor: "red",
          }}
          resizeMode={FastImage.resizeMode.contain}
        >
          <View style={{ backgroundColor: "tomato" }}>
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
                  {postCreatedTimeFormatter(selectedPost.createdAt)}
                </Text>
              </View>
            </UserInfoContainer>
            <PostDescriptionContainer numberOfLines={2}>
              <PostDescription>
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
                }
              </PostDescription>
            </PostDescriptionContainer>
          </View>
        </FastImageBackground>
        <View
          style={{
            position: "absolute",
            top: "25%",
            height: 100,
            justifyContent: "space-between",
            right: 12,
          }}
        >
          <Heart post={selectedPost}></Heart>
          <TouchableOpacity
            style={{ marginTop: 12 }}
            onPress={() => openFullModal()}
          >
            <FontAwesome5 name="comment-dots" size={40} color={"white"} />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            {
              position: "absolute",
              height: "66%",
              //for hiding modal
              bottom: MIN_MODAL_HEIGHT,
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
      </Animated.View>
    </PanGestureHandler>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

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

const PostImage = styled(Image)`
  height: 300px;
  width: 100%;
`;

const UserInfoContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  margin-horizontal: 24px;
`;

const HeartIcon = styled(Ionicons)`
  margin-left: auto;
`;

const CommentContainer = styled(View)`
  flex: 1;
  background-color: gray;
`;

export default DetailPost;
