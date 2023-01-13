import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import styled from "styled-components/native";

import { UrlAPI } from "../../../constants";
import readImageData from "../../../utils/imageHandler";

const CommentContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 4px;
  border-bottom-width: 1px;
`;
const CommentContentWrapper = styled(View)`
  flex-direction: row;
  height: auto;
  flex: 1;
  align-items: center;
  padding: 4px;
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
const UserName = styled(Text)`
  font-size: 15px;
`;
const CommentContent = styled(Text)``;
const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
`;

const Comment = ({ comment }) => {
  console.count("item re-render");
  const { userId, content: commentContent } = comment;
  const [imageURI, setImageURI] = useState(null);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(commentContent);
    axios
      .get(`${UrlAPI}/user/${userId}`)
      .then((res) => {
        setUserName(res.data.user.nickname);
        setImageURI(readImageData(res.data.user.avatar.data.data));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <CommentContainer>
      <TouchableOpacity>
        {imageURI == null ? (
          <Avatar
            source={require("../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        ) : (
          <Avatar source={{ uri: imageURI }}></Avatar>
        )}
      </TouchableOpacity>
      <CommentContentWrapper>
        <CommentInfo>
          <UserName>{userName}</UserName>
          <CommentContent>{content}</CommentContent>
        </CommentInfo>
        <OptionsButton>
          <MaterialIcons name="expand-more" size={24} color="black" />
        </OptionsButton>
      </CommentContentWrapper>
    </CommentContainer>
  );
};

export default Comment;
