import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import Color from "../../../utils/color";
import { UrlAPI } from "../../../constants";
import { updatePost } from "../postSlice";

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
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handlePostComment = () => {
    if (text != "") {
      axios
        .put(`${UrlAPI}/post/${props.postId}`, {
          content: text,
        })
        .then((res) => {
          setText("");
          dispatch(updatePost(res.data.updatedPost));
        })
        .catch((err) => console.log(err));
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 4,
    minHeight: 36,
    alignItems: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  inputText: {
    backgroundColor: Color.lightGray,
    height: "100%",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 4,
  },
  sendBtn: {
    backgroundColor: Color.gray,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
