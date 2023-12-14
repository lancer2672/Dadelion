import {
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  useAnimatedProps,
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
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { FlatList } from "react-native";
import PostDetailItem from "../components/PostDetailItem.component";
import { setSelectedPost } from "@src/store/slices/postSlice";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const DetailPost = ({ route }) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  // const imageHeightAnim = useRef(new Animated.Value(300)).current;
  const userState = useSelector(userSelector);
  const { autoFocus } = route.params;
  const { selectedPost } = useSelector(postSelector);
  const { data: postCreator } = useGetUserByIdQuery(selectedPost.user);
  const flatlistRef = useRef<FlatList>();
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length === 1) {
      const post = viewableItems[0].item;
      console.log("viewableItems", post);
      dispatch(setSelectedPost(post));
    }
  }).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100, // Item được coi là có thể nhìn thấy nếu 50% của nó hiển thị trên màn hình
  }).current;

  const { data } = useGetAllPostsQuery();

  console.log("data posts", data);
  //total y moved
  const [heart, setHeart] = useState(false);

  const disableScroll = () => {
    setIsScrollEnabled(false);
  };

  const enableScroll = () => {
    setIsScrollEnabled(true);
  };

  console.log("selectedPost,selectedPost.comments", selectedPost.comments);

  const handleCommentModalVisibleChange = (visible) => {
    console.log("handleCommentModalVisibleChange", visible);
    if (visible) {
      disableScroll();
    } else {
      enableScroll();
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
      console.log("new comment postdetail", data);
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
  useLayoutEffect(() => {
    const selectedItemIndex = data.posts.findIndex(
      (post) => post._id === selectedPost._id
    );
    console.log("selectedItemIndex", selectedItemIndex);
    if (selectedItemIndex) {
      flatlistRef.current.scrollToIndex({ animated: false, index: 1 });
    }
  }, []);
  return (
    <FlatList
      style={{}}
      contentContainerStyle={{}}
      data={data.posts || []}
      // horizontal
      getItemLayout={(data, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
      // initialScrollIndex={1}
      scrollEnabled={isScrollEnabled}
      pagingEnabled={true}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatlistRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
          });
        });
      }}
      onScrollEndDrag={() => console.log("end")}
      ref={flatlistRef}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <PostDetailItem
          post={item}
          onCommentModalVisibleChange={handleCommentModalVisibleChange}
          autoFocus={false}
        ></PostDetailItem>
      )}
      keyExtractor={(item, index) => `month-picker-${index}`}
    />
  );
};
export default DetailPost;
