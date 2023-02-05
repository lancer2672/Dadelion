import React, { useContext } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOptions,
  renderers,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";

import { PostContext } from "../../../services/post/post.context";
export const CommentMenu = ({ postId, commentId }) => {
  const { DeleteComment } = useContext(PostContext);
  const handleDeleteComment = async () => {
    await DeleteComment(postId, commentId);
  };
  return (
    <Menu render={renderers.SlideInMenu}>
      <MenuTrigger>
        <MaterialIcons name="expand-more" size={24} color="black" />
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
        <MenuOption onSelect={() => null} text={"Chỉnh sửa bình luận"} />
        <MenuOption onSelect={handleDeleteComment} text="Xóa bình luận" />
        <MenuOption>
          <Text>Hủy</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};
