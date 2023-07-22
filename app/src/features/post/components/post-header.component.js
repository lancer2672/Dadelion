import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";

import { HeaderMenu } from "./header-menu.component";
import UpdatePost from "../screens/update-post.screen";
import { PostCreatedTimeFormater } from "@src/utils/timeFormater";
import { Avatar } from "../shared-components";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/services/userService";

const Container = styled(View)`
  margin-top: 8px;
  margin-left: 8px;
  flex-direction: row;
  align-items: center;
`;

const PostInfoContainer = styled(View)`
  justify-content: center;
  flex: 1;
  margin-left: 12px;
`;
const OpenOptionsButtonContainer = styled(View)``;
const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.label};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const PostHeader = ({
  postCreatorId,
  postId,
  creatorName,
  createdAt,
  postImageUri,
  description,
}) => {
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(postCreatorId);
  const [postOwnerAvatar, setPostOwnerAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [createTime, setCreateTime] = useState(null);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (isSuccess) {
      console.log("Data", data);
      setPostOwnerAvatar(data.user.avatar);
    }
  }, [isSuccess]);

  useEffect(() => {
    setCreateTime(PostCreatedTimeFormater(createdAt));
  }, []);

  return (
    <Container>
      <TouchableOpacity>
        {postOwnerAvatar == null ? (
          <Avatar
            source={require("./../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        ) : (
          <Avatar source={{ uri: postOwnerAvatar || null }}></Avatar>
        )}
      </TouchableOpacity>

      <PostInfoContainer>
        <CreatorName>{creatorName}</CreatorName>
        <Text>{createTime}</Text>
      </PostInfoContainer>

      <OpenOptionsButtonContainer>
        <Modal
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <UpdatePost
            userAvatar={postOwnerAvatar}
            postImage={postImageUri}
            postId={postId}
            createdAt={createdAt}
            description={description}
            creatorName={creatorName}
            setIsvisible={setModalVisible}
          ></UpdatePost>
        </Modal>
      </OpenOptionsButtonContainer>
      {user._id == postCreatorId && (
        <HeaderMenu
          postCreatorId={postCreatorId}
          postId={postId}
          setModalVisible={setModalVisible}
        ></HeaderMenu>
      )}
    </Container>
  );
};

export default PostHeader;

const styles = StyleSheet.create({});
