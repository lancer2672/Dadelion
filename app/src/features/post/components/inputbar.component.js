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

const InputBar = ({ postId, commentsLength, setIsCommentsVisible }) => {
  const [text, setText] = useState("");
  const { commentPost, error } = useContext(PostContext);
  const handlePostComment = async () => {
    Keyboard.dismiss();
    if (text != "") {
      await commentPost(postId, text);
      if (error == null) {
        setText("");
        //  If there isn't any comments we will render this comment
        //  otherwise we  will display commentlist
        if (commentsLength !== 0) {
          console.log("commentLength", commentsLength);
          setIsCommentsVisible(true);
        }
      }
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
