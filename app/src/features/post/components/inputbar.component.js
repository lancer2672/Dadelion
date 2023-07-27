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

import { useCommentPostMutation } from "@src/store/slices/api/postApiSlice";

const InputContainer = styled(View)`
  flex-direction: row;
  margin-top: 4px;
  min-height: 36px;
  align-items: center;
  border-radius: 25px;
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
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const InputBar = ({ postId }) => {
  const [content, setContent] = useState("");
  const [commentPost] = useCommentPostMutation();
  const handlePostComment = async () => {
    Keyboard.dismiss();
    if (content != "") {
      commentPost({ postId, content });
      setContent("");
    }
  };

  return (
    <InputContainer>
      <InputContent
        placeholder="Viết bình luận..."
        value={content}
        onChangeText={(newText) => setContent(newText)}
      ></InputContent>
      <SubmitButton onPress={handlePostComment}>
        <Ionicons name="send" size={24} color="black" />
      </SubmitButton>
    </InputContainer>
  );
};

export default InputBar;
