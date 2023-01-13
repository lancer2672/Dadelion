import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, memo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import { UrlAPI } from "../../../constants";
import readImageData from "../../../utils/imageHandler";

const CommentContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 4px;
`;
const CommentContentWrapper = styled(View)`
  flex-direction: row;
  height: auto;
  flex: 1;
  padding-left: 8px;
  align-items: center;

  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
  border-radius: 10px;
`;
const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  margin-top: 4px;
  resize-mode: stretch;
  border-radius: 50px;
  margin-right: 8px;
`;
const CommentInfo = styled(View)`
  flex: 1;
`;
const UserName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.label};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const CommentContent = styled(Text)``;
const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
  position: absolute;
  top: 2px;
  right: 8px;
`;
const Comment = ({ comment }) => {
  if (comment == false) {
    return <></>;
  }
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
          <ReadMore numberOfLines={2}>
            <CommentContent>{content}</CommentContent>
          </ReadMore>
        </CommentInfo>
        <OptionsButton>
          <MaterialIcons name="expand-more" size={24} color="black" />
        </OptionsButton>
      </CommentContentWrapper>
    </CommentContainer>
  );
};

export default memo(Comment);
