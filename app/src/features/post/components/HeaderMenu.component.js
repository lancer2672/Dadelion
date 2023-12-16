import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

import { useDeletePostMutation } from "@src/store/slices/api/postApiSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useDispatch } from "react-redux";

export const HeaderMenu = ({ postId, setModalVisible, postCreatorId }) => {
  const [deletePost, { isSuccess, isLoading }] = useDeletePostMutation();
  const dispatch = useDispatch();
  const handleDeletePost = async () => {
    deletePost(postId);
  };

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (isSuccess) {
    }
  }, [isLoading]);
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
