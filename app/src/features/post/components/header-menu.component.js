import React, { useContext } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOptions,
  renderers,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Feather } from "@expo/vector-icons";

import { PostContext } from "../../../services/post/post.context";
export const HeaderMenu = ({ postId, setModalVisible, postCreatorId }) => {
  const { deletePost } = useContext(PostContext);
  const handleDeletePost = async () => {
    await deletePost(postId);
  };
  const openUpdatePostModal = () => {
    setModalVisible(true);
  };
  return (
    <Menu render={renderers.SlideInMenu}>
      <MenuTrigger>
        <Feather
          style={{ padding: 8 }}
          name="more-horizontal"
          size={24}
          color="black"
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionTouchable: {
            underlayColor: "red",
          },
          optionWrapper: {
            backgroundColor: "pink",
            margin: 5,
          },
          optionText: {
            color: "black",
          },
        }}
      >
        <MenuOption
          onSelect={openUpdatePostModal}
          text={"Chỉnh sửa bài viết"}
        />
        <MenuOption onSelect={() => handleDeletePost()} text="Xóa bài viết" />
        <MenuOption>
          <Text>Hủy</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
