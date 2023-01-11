import {
  StyleSheet,
  Text,
  Button,
  Image,
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import CommentList from "./post-item-comment-list";
import InputBar from "./post-item-inputbar";
import readImageData from "../../../utils/imageHandler";
import PostHeader from "./post-item-header";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { PostContext } from "../../../services/post/post.context";

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
  margin-right: 8px;
`;
const ReactButton = styled(TouchableOpacity)`
  flex-direction: row;
`;
const Seperator = styled(Text)`
  font-size: 24px;
  margin-bottom: 2px;
`;
const ShowCommentsButton = styled(TouchableOpacity)``;
const ShowCommentsButtonContent = styled(Text)`
  height: 16px;
`;
const CommentListContainer = styled(View)`
  height: 200px;
  margin-top: 5px;
  min-width: 1px;
`;
const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-top: 4px;
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const PostDescription = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;
//to fit image in post => property: SCREEN_WIDTH_WITH_MARGIN_L_R_12 - 6
const PostImageContainer = styled(View)`
width: ${SCREEN_WIDTH_WITH_MARGIN_L_R_12 - 6}px,
height: 350px,
`;
const ReactSectionContainer = styled(View)`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom-color: #dedede;
  border-bottom-width: 2px;
`;
const PostItem = ({ navigation, post }) => {
  const {
    _id: postId,
    likes,
    comments,
    description,
    image = null,
    user: postCreatorId,
    creatorName,
    createdAt,
  } = post;
  const { user } = useContext(AuthenticationContext);
  const { ReactPost, error } = useContext(PostContext);
  const [heart, setHeart] = useState(false);
  const [imageUriData, setImageUriData] = useState("");
  const [reactionNumber, setReactionNumber] = useState(likes.length);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    //check if post have an image
    if (image) {
      setImageUriData(() => readImageData(image.data.data));
    }
    //check if user reacted this post
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].userId == user._id) {
        setHeart(() => true);
      }
    }
  }, []);
  useEffect(() => {
    //check if post have an image
    if (image) {
      setImageUriData(() => readImageData(image.data.data));
    }
    //check if user reacted this post
  }, [image]);
  const handleReact = async () => {
    await ReactPost(postId);
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
        postImageUri={imageUriData}
      ></PostHeader>

      <PostDescriptionContainer numberOfLines={3}>
        <PostDescription>{description}</PostDescription>
      </PostDescriptionContainer>

      <View
        style={{
          width: SCREEN_WIDTH_WITH_MARGIN_L_R_12,
          height: 350,
        }}
      >
        <Image
          source={{
            uri: imageUriData || null,
          }}
          style={{
            flex: 1,
            resizeMode: "cover",
          }}
        ></Image>
      </View>

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

        <ShowCommentsButton>
          <ShowCommentsButtonContent>Comment</ShowCommentsButtonContent>
        </ShowCommentsButton>
      </ReactSectionContainer>

      {viewComments && (
        <CommentListContainer>
          <CommentList comments={comments}></CommentList>
        </CommentListContainer>
      )}
      <InputBar postId={postId}></InputBar>
    </Container>
  );
};

export default PostItem;
