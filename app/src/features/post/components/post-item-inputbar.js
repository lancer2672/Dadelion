import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components/native";

import { UrlAPI } from "../../../constants";
import { updatePost } from "../postSlice";
import { PostContext } from "../../../services/post/post.context";

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

const InputBar = ({ ...props }) => {
  const [text, setText] = useState("");
  const { CommentPost, error } = useContext(PostContext);
  const handlePostComment = async () => {
    if (text != "") {
      await CommentPost();
      if (error != null) setText("");
    }
  };

  return (
    <InputContainer>
      <InputContent
        placeholder="Viết bình luận..."
        value={text}
        onChangeText={(newText) => setText(newText)}
      ></InputContent>

      <SubmitButton onPress={handlePostComment}>
        <Ionicons name="send" size={24} color="black" />
      </SubmitButton>
    </InputContainer>
  );
};

export default InputBar;
