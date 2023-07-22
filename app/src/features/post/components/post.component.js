import {
  StyleSheet,
  Text,
  Button,
  Image,
  Modal,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AntDesign, createIconSetFromFontello } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import Comment from "./comment.component";
import CommentList from "./comment-list.component";
import InputBar from "./inputbar.component";
import PostHeader from "./post-header.component";
import { PostContext } from "../../../services/post/post.context";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useReactPostMutation } from "@src/store/services/postService";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;
const Container = styled(View)`
  margin: 12px;
  border-width: 1px;
  border-radius: 5px;
  border-color: #ddd;
  border-bottom-width: 0px;
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 1;
  background-color: #e7e1e1;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
`;
const ReactionNumber = styled(Text)`
  margin-right: 4px;
`;
const CommentsNumber = styled(Text)`
  margin-right: 4px;
`;
const ReactButton = styled(TouchableOpacity)`
  flex-direction: row;
`;
const Seperator = styled(Text)`
  font-size: 24px;
  margin-bottom: 2px;
`;
const ShowCommentsButton = styled(TouchableOpacity)`
  flex-direction: row;
`;
const CommentListContainer = styled(View)``;
const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const PostDescription = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const ReactSectionContainer = styled(View)`
  margin-top: 8px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom-color: #ccc8c8;
  border-bottom-width: 2px;
  border-top-color: #ccc8c8;
  border-top-width: 2px;
`;

const PostItem = ({ navigation, post }) => {
  const {
    _id: postId,
    likes,
    comments,
    description,
    image: postImage = null,
    user: postCreatorId,
    creatorName,
    createdAt,
  } = post;
  const { user } = useSelector(userSelector);
  const [reactPost, { isLoading }] = useReactPostMutation();
  const { error } = useContext(PostContext);
  const [heart, setHeart] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });
  let lastComment = false;
  if (comments.length) {
    lastComment = { ...comments[comments.length - 1] };
  }
  useEffect(() => {
    //check if user reacted this post
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].userId == user._id) {
        setHeart(() => true);
      }
    }
    setReactionNumber(likes.length);
  }, [likes]);

  useEffect(() => {
    if (postImage) {
      setImageUri(postImage);
    }
  }, [postImage]);
  useEffect(() => {
    if (imageUri != null) {
      Image.getSize(imageUri, (width, height) => {
        const screenWidth = Dimensions.get("window").width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;

        setImageSize({ width: screenWidth, height: imageHeight });
      });
    }
  }, [imageUri]);

  const handleReact = () => {
    //ignore if handling react to post

    reactPost(postId);
    if (error != null) return;
    else {
      setHeart(() => !heart);
      if (heart == true) {
        setReactionNumber((reactionNumber) => reactionNumber - 1);
      } else {
        setReactionNumber((reactionNumber) => reactionNumber + 1);
      }
    }
  };

  return (
    <Container>
      <PostHeader
        postId={postId}
        description={description}
        createdAt={createdAt}
        creatorName={creatorName}
        postCreatorId={postCreatorId}
        postImageUri={imageUri}
      ></PostHeader>

      <PostDescriptionContainer numberOfLines={3}>
        <PostDescription>{description}</PostDescription>
      </PostDescriptionContainer>

      {postImage && (
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            width: SCREEN_WIDTH_WITH_MARGIN_L_R_12,
            height: 350,
          }}
        >
          <Image
            source={{
              uri: imageUri,
            }}
            style={{
              flex: 1,
            }}
          ></Image>
        </Pressable>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ width: imageSize.width, height: imageSize.height }}
          ></Image>
        </View>
      </Modal>

      <ReactSectionContainer>
        <ReactButton onPress={handleReact}>
          <ReactionNumber>{reactionNumber}</ReactionNumber>
          {heart == true ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </ReactButton>

        <Seperator>|</Seperator>

        <ShowCommentsButton
          onPress={() => setIsCommentsVisible(!isCommentsVisible)}
        >
          <CommentsNumber>{comments.length}</CommentsNumber>
          <Fontisto name="comment" size={24} color="black" />
        </ShowCommentsButton>
      </ReactSectionContainer>
      {!isCommentsVisible && (
        <Comment postId={postId} comment={lastComment}></Comment>
      )}

      {isCommentsVisible && comments.length > 1 && (
        <CommentListContainer>
          <CommentList postId={postId} comments={comments}></CommentList>
        </CommentListContainer>
      )}
      <InputBar
        commentsLength={comments.length}
        setIsCommentsVisible={setIsCommentsVisible}
        postId={postId}
      ></InputBar>
    </Container>
  );
};

export default PostItem;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#363535",
  },
});
