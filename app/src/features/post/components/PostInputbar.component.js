import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import styled from "styled-components/native";

// import { useCommentPostMutation } from "@src/store/slices/api/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "@src/store/slices/postSlice";
import { postSelector, userSelector } from "@src/store/selector";

const InputContainer = styled(View)`
  flex-direction: row;
  height: 40px;
  border-top-width-color: ${(props) => props.theme.colors.chat.text};
  align-items: center;
  overflow: hidden;
`;
const InputContent = styled(TextInput)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 100%;
  flex: 1;
  padding-left: 10px;
  padding-right: 4px;
`;
const SubmitButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const InputBar = ({ autoFocus }) => {
  const [content, setContent] = useState("");
  const { user } = useSelector(userSelector);
  const { selectedPost } = useSelector(postSelector);

  const dispatch = useDispatch();
  const handlePostComment = async () => {
    Keyboard.dismiss();
    if (content != "") {
      setContent(() => "");
      dispatch(
        commentPost({
          commentUserId: user._id,
          postCreatorId: selectedPost.user,
          postId: selectedPost._id,
          content,
        })
      );
    }
  };

  return (
    <InputContainer>
      <InputContent
        autoFocus={autoFocus}
        placeholder="Viết bình luận..."
        value={content}
        onChangeText={(newText) => setContent(newText)}
      ></InputContent>
      <SubmitButton onPress={handlePostComment}>
        <Ionicons name="send" size={24} color="white" />
      </SubmitButton>
    </InputContainer>
  );
};

export default InputBar;
