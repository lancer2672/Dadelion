import {
  Text,
  Image,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import { useDispatch, useSelector } from "react-redux";
import { postSelector, userSelector } from "@src/store/selector";
import { BackgroundImage } from "@src/features/auth/components/authentication.style";
import ReactionBar from "./ReactionBar.component";
import { Avatar } from "@src/components/Avatar";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { colors } from "@src/infrastructure/theme/colors";
import { reactPost, setSelectedPost } from "@src/store/slices/postSlice";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { FastImageBackground } from "@src/components/image";
import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;
const PostItem = ({ navigation, post }) => {
  const { image: postImage = null, createdAt } = post;

  const scaleAnim = useRef(new Animated.Value(1.6)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const userState = useSelector(userSelector);
  const dispatch = useDispatch();
  const { user } = userState;
  //post.user is id of owner
  const { isSuccess, data } = useGetUserByIdQuery(post.user);
  const [postCreator, setPostCreator] = useState(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const handleReact = () => {
    dispatch(
      reactPost({ postId: post._id, postCreatorId: post.user, addToList: true })
    );
  };
  useEffect(() => {
    console.log("translateYAnim", translateYAnim);
    if (!isFirstMount) {
      const endAnim = Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -32,
          duration: 200,
          useNativeDriver: true,
        }),
      ]);
      const startAnim = Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]);
      startAnim.start(() => {
        handleReact();
        endAnim.start(() => {
          translateYAnim.setValue(0);
        });
      });

      // Animated.sequence([start, end]).start(() => {
      //   translateYAnim.setValue(0);
      // });
    } else {
      setIsFirstMount(() => false);
    }
  }, [heartPosition]);
  useEffect(() => {
    if (isSuccess) {
      if (post.user == user._id) {
        //user
        setPostCreator(user);
      } else {
        //other user created post
        setPostCreator(data.user);
      }
    }
  }, [isSuccess, user]);
  const navigatePostDetail = () => {
    dispatch(setSelectedPost({ ...post, postCreator }));
    navigation.navigate("DetailPost", {});
  };
  const handleNavigateToGuest = () => {
    if (postCreator) {
      navigation.navigate("Guest", { guestId: postCreator._id });
    }
  };

  const onLongPress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    console.log("position", locationX, locationY);
    setHeartPosition(() => ({ x: locationX - 25, y: locationY - 25 }));
  };
  return (
    <Pressable onLongPress={onLongPress} onPress={navigatePostDetail}>
      <FastImageBackground
        style={{
          marginHorizontal: 24,
          marginVertical: 12,
          overflow: "hidden",
          minHeight: 480,
          backgroundColor: "gray",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingBottom: 12,
          paddingLeft: 12,
          elevation: 1,
        }}
        source={postImage}
      >
        <View
          style={{
            minHeight: 200,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleNavigateToGuest}>
              <Avatar uri={postCreator?.avatar}></Avatar>
            </TouchableOpacity>
            <PostInfoContainer>
              <CreatorName>{postCreator?.nickname}</CreatorName>
              <Text style={{ color: "white" }}>
                {postCreatedTimeFormatter(createdAt)}
              </Text>
            </PostInfoContainer>
          </View>

          <PostDescriptionContainer numberOfLines={3}>
            <PostDescription>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
              }
            </PostDescription>
          </PostDescriptionContainer>
        </View>

        <Animated.View
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            top: heartPosition.y,
            left: heartPosition.x,
            opacity: opacityAnim,

            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          }}
        >
          <AntDesign name="heart" size={48} color="red" />
        </Animated.View>
        <ReactionBar post={post}> </ReactionBar>
      </FastImageBackground>
    </Pressable>
  );
};
const Container = styled(BackgroundImage).attrs((props) => ({
  source: { uri: props.postImage && props.postImage },
  resizeMode: "cover",
}))`
  margin-horizontal: 24px;
  margin-vertical: 12px;
  overflow: hidden;
  height: 480px;
  background-color: gray;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 12px;
  padding-left: 12px;
  border-bottom-width: 0px;
  elevation: 1;
`;
const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: white;
`;

const PostInfoContainer = styled(View)`
  justify-content: center;
  margin-left: 12px;
`;
const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: white;
`;
const PostDescription = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  color: white;
`;

export default memo(PostItem);
