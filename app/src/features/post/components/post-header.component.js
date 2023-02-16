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
import axios from "axios";

import { HeaderMenu } from "./header-menu.component";
import UpdatePost from "../screens/update-post.screen";
import { UrlAPI } from "../../../constants";
import readImageData from "../../../utils/imageHandler";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled(View)`
  margin-top: 8px;
  margin-left: 8px;
  flex-direction: row;
  align-items: center;
`;
const Seperator = styled(View)`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.bg.secondary};
`;
const PostInfoContainer = styled(View)`
  justify-content: center;
  flex: 1;
`;
const OpenOptionsButtonContainer = styled(View)``;
const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.label};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const Avatar = styled(Image)`
  margin-right: 12px;
  width: 40px;
  height: 40px;
  resize-mode: stretch;
  border-radius: 50px;
`;

const dayjs = require("dayjs");
const PostHeader = ({ ...props }) => {
  const {
    postCreatorId,
    postId,
    creatorName,
    createdAt,
    postImageUri,
    description,
  } = props;

  const [imageUriUserAvatar, setImageUriUserAvatar] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [createTime, setCreateTime] = useState(null);
  const { user } = useContext(AuthenticationContext);
  useEffect(() => {
    getCreatorPostAvatar();
  }, []);

  const getCreatorPostAvatar = async () => {
    await axios
      .get(`${UrlAPI}/user/${postCreatorId}`)
      .then((res) => {
        setImageUriUserAvatar(() =>
          readImageData(res.data.user.avatar.data.data)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePost = async () => {
    await DeletePost(postId);
  };
  useEffect(() => {
    let currentDate = new Date();
    let createDate = new Date(createdAt);
    const days = (currentDate, createDate) => {
      let difference = currentDate.getTime() - createDate.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      return TotalDays;
    };
    const diffDays = days(currentDate, createDate);
    if (diffDays == 1) {
      if (currentDate.getDate() == createDate.getDate()) {
        setCreateTime("Hôm nay lúc " + dayjs(createdAt).format("HH:mm"));
      } else {
        setCreateTime("Hôm qua lúc " + dayjs(createdAt).format("HH:mm"));
      }
    } else if (diffDays == 2) {
      if (currentDate.getDate() == createDate.getDate() + 1) {
        setCreateTime("Hôm qua lúc " + dayjs(createdAt).format("HH:mm"));
      } else {
        setCreateTime(
          dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")
        );
      }
    } else {
      setCreateTime(dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm"));
    }
  }, []);

  return (
    <Container>
      <TouchableOpacity>
        {imageUriUserAvatar == null ? (
          <Avatar
            source={require("./../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        ) : (
          <Avatar source={{ uri: imageUriUserAvatar || null }}></Avatar>
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
            userAvatar={imageUriUserAvatar}
            image={postImageUri}
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
