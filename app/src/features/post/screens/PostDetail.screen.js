import {
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { postSelector, userSelector } from "@src/store/selector";
import ReadMore from "@fawazahmed/react-native-read-more";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import InputBar from "../components/PostInputbar.component";
import { useTheme } from "styled-components";
import { reactPost, updateSelectedPost } from "@src/store/slices/postSlice";
import { getSocket } from "@src/utils/socket";
import { Avatar } from "@src/components/Avatar";
import FastImage from "react-native-fast-image";
import { FlashList } from "@shopify/flash-list";
import CommentItemComponent from "../components/CommentItem.component";
import { FastImageBackground } from "@src/components/image";
import CommentPostModal from "../components/CommentPostModal.component";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const DetailPost = ({ route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  const imageHeightAnim = useRef(new Animated.Value(300)).current;
  const userState = useSelector(userSelector);
  const { selectedPost } = useSelector(postSelector);
  const { data: postCreator } = useGetUserByIdQuery(selectedPost.user);

  console.log("SELECTED POST", selectedPost);
  const { autoFocus } = route.params;
  const [heart, setHeart] = useState(false);
  const [modalVisible, setModalVisible] = useState(autoFocus);
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
      console.log("Update comment", data);
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

  const handleReact = () => {
    dispatch(
      reactPost({ postId: selectedPost._id, postCreatorId: selectedPost.user })
    );
    setHeart(!heart);
  };
  const openCommentModal = () => {
    setModalVisible(true);
  };
  console.log("selectedPost,selectedPost.comments", selectedPost.comments);
  return (
    <Container>
      <FastImageBackground
        fallback={true}
        source={{
          uri: selectedPost.image,
        }}
        style={{
          height: 300,
          flex: 1,
          width: "100%",
          justifyContent: "flex-end",
          backgroundColor: "gray",
        }}
        imageStyle={{
          width: 300,
          height: 300,
          flex: 1,
          backgroundColor: "red",
        }}
        resizeMode={FastImage.resizeMode.cover}
      >
        <View style={{ alignSelf: "flex-end", backgroundColor: "tomato" }}>
          <UserInfoContainer>
            <Avatar
              width={70}
              height={70}
              source={{ uri: postCreator?.avatar }}
            />
            <View
              style={{ marginLeft: 12, justifyContent: "flex-end", flex: 1 }}
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
        <TouchableOpacity onPress={handleReact}>
          <HeartIcon
            name={heart ? "heart" : "heart-outline"}
            size={40}
            color={heart ? "red" : theme.colors.text.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCommentModal}>
          <FontAwesome5 name="comment-dots" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
      <CommentPostModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        isFocusInput={autoFocus}
      ></CommentPostModal>
    </Container>
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
