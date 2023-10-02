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
import { commentPost, setRepliedComment } from "@src/store/slices/postSlice";
import { postSelector, userSelector } from "@src/store/selector";
import { useRef } from "react";
import { useEffect } from "react";

const InputBar = ({ autoFocus }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const { repliedComment } = useSelector(postSelector);
  const { user } = useSelector(userSelector);
  const { selectedPost } = useSelector(postSelector);
  console.log("repliedComment", repliedComment);
  useEffect(() => {
    if (repliedComment) {
      setReplyName(repliedComment.nickname + " ");
    } else {
      setReplyName("");
    }
  }, [repliedComment]);
  const handlePostComment = async () => {
    Keyboard.dismiss();
    if (content != "") {
      console.log("Dispatch upload comment", {
        commentUserId: user._id,
        postCreatorId: selectedPost.user,
        postId: selectedPost._id,
        content,
        parentId: repliedComment?._id,
        // repliedUserId: repliedComment?.repliedUserId,
      });
      dispatch(
        commentPost({
          commentUserId: user._id,
          postCreatorId: selectedPost.user,
          postId: selectedPost._id,
          content,
          parentId: repliedComment?._id,
          // repliedUserId: repliedComment?.repliedUserId,
        })
      );
      setContent(() => "");
      dispatch(setRepliedComment(null));
    }
  };

  return (
    <InputContainer>
      <InputContent
        autoFocus={autoFocus}
        placeholder="Viết bình luận..."
        value={`${replyName}${content}`}
        onChangeText={(newText) => setContent(newText.replace(replyName, ""))}
      ></InputContent>
      <SubmitButton onPress={handlePostComment}>
        <Ionicons name="send" size={24} color="white" />
      </SubmitButton>
    </InputContainer>
  );
};

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
export default InputBar;
