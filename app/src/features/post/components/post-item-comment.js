import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import styled from "styled-components/native";

import { UrlAPI } from "../../../constants";
import readImageData from "../../../utils/imageHandler";
import Color from "../../../utils/color";

const CommentContainer = styled(View)`
  flex-direction: row;
  height: 40px;
  width: 100%;
  align-items: center;
  background-color: red;
  border-radius: 25px;
`;
const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  resize-mode: stretch;
  border-radius: 50px;
  margin-right: 8px;
`;
const CommentInfo = styled(View)`
  flex: 1;
`;
const UserName = styled(Text)``;
const CommentContent = styled(Text)``;
const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
`;

const Comment = ({ ...props }) => {
  console.log(props);
  const { userId, content: commentContent } = props;
  const [imageURI, setImageURI] = useState("");
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .get(`${UrlAPI}/user/${userId}`)
      .then((res) => {
        setUserName(res.data.user.nickname);
        setContent(commentContent);
        setImageURI(readImageData(res.data.user.avatar.data.data));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CommentContainer>
      <TouchableOpacity>
        <Avatar source={{ uri: imageURI || null }}></Avatar>
      </TouchableOpacity>

      <CommentInfo>
        <UserName>{userName}</UserName>
        <CommentContent>{content}</CommentContent>
      </CommentInfo>

      <OptionsButton>
        <MaterialIcons name="expand-more" size={24} color="black" />
      </OptionsButton>
    </CommentContainer>
  );
};

export default Comment;
