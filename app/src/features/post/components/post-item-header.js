import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import axios from "axios";
import { useDispatch } from "react-redux";

import { deletePost } from "../postSlice";
import UpdatePost from "../screens/UpdatePost";
import { UrlAPI } from "../../../constants";
import readImageData from "../../../utils/imageHandler";

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
const OptionsContainer = styled(View)`
  position: absolute;
  width: 80px;
  bottom: -60px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  right: 4px;
  z-index: 1;
  border-radius: 2px;
  padding: 2px;
  shadow-color: "#000";
  shadow-opacity: 0.6;
  shadow-radius: 5px;
  elevation: 1;
`;
const OpenOptionsButton = styled(TouchableOpacity)`
  padding-right: 4px,
  padding-reft: 4px, 
`;
const OpenOptionsButtonContainer = styled(View)``;
const Option = styled(Text)`
  padding: 4px;
`;
const ModalUpdatePostContainer = styled(Modal)`
  background-color: rgba(1, 1, 1, 0.2);
  flex: 1;
  align-items: center;
  margin-top: 22px;
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
  const { postCreatorId, creatorName, createdAt, postImageUri, description } =
    props;
  const [imageUriUserAvatar, setImageUriUserAvatar] = useState("");
  const [viewEditOptions, setViewEditOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
    await axios
      .delete(`${UrlAPI}/post/${postId}`)
      .then((res) => {
        console.log("res", res);
        setViewEditOptions(false);
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };
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
        <Text>{creatorName}</Text>
        <Text>{dayjs(createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}</Text>
      </PostInfoContainer>

      <OpenOptionsButtonContainer>
        <OpenOptionsButton onPress={() => setViewEditOptions(!viewEditOptions)}>
          <Feather name="more-horizontal" size={24} color="black" />
        </OpenOptionsButton>

        {/* edit post */}

        {viewEditOptions && (
          <OptionsContainer>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Option>Chỉnh sửa</Option>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                  setViewEditOptions(false);
                }}
              >
                <ModalUpdatePostContainer>
                  <UpdatePost
                    userAvatar={imageUriUserAvatar}
                    image={postImageUri}
                    createdAt={createdAt}
                    description={description}
                    creatorName={creatorName}
                    setIsvisible={setModalVisible}
                  ></UpdatePost>
                </ModalUpdatePostContainer>
              </Modal>
            </TouchableOpacity>

            <Seperator></Seperator>

            <TouchableOpacity onPress={handleDeletePost}>
              <Option>Xoá</Option>
            </TouchableOpacity>
          </OptionsContainer>
        )}
      </OpenOptionsButtonContainer>
    </Container>
  );
};

export default PostHeader;

const styles = StyleSheet.create({});
