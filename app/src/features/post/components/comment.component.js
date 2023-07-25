import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, memo, useContext } from "react";
import axios from "axios";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import { UrlAPI } from "@src/constants";
import readImageData from "@src/utils/imageHandler";
import { CommentMenu } from "./CommentMenuOptionscomponent";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/services/userService";
import { commentCreatedTimeFormater } from "@src/utils/timeFormater";

const dayjs = require("dayjs");
const Comment = ({ comment, postId }) => {
  // comment == {} then we return <></>
  if (comment == false) {
    return <></>;
  }
  const { user } = useSelector(userSelector);
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(comment.userId);
  const [creator, setCreator] = useState({});
  const [content, setContent] = useState("");
  const [createTime, setCreateTime] = useState("");
  console.log("render");
  useEffect(() => {
    if (isSuccess) {
      if (comment.userId == user._id) {
        setCreator(user);
      } else {
        setCreator(data.user);
      }
    }
  }, [isLoading]);
  useEffect(() => {
    setContent(comment.content);
  }, []);
  return (
    <CommentContainer>
      <TouchableOpacity>
        {creator.avatar ? (
          <Avatar source={{ uri: creator.avatar }}></Avatar>
        ) : (
          <Avatar
            source={require("../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        )}
      </TouchableOpacity>
      <CommentContentWrapper>
        <CommentInfo>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UserName>{creator.nickname}</UserName>
          </View>
          <ReadMore numberOfLines={2}>
            <CommentContent>{content}</CommentContent>
          </ReadMore>
        </CommentInfo>
        <CreateTime>{commentCreatedTimeFormater(comment.createdAt)}</CreateTime>
      </CommentContentWrapper>
    </CommentContainer>
  );
};
const CommentContainer = styled(View)`
  flex-direction: row;
  margin-vertical: 4px;
`;
const CommentContentWrapper = styled(View)`
  flex-direction: row;
  height: auto;
  flex: 1;
  padding-left: 8px;
  align-items: flex-start;
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
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  margin-right: 8px;
  margin-bottom: 4px;
`;
const CreateTime = styled(Text)`
  color: ${(props) => props.theme.colors.text.secondary};
`;
const CommentContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 22px;
`;
const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
  position: absolute;
  top: 2px;
  right: 8px;
`;
export default memo(Comment);
