import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, memo, useContext } from "react";
import axios from "axios";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import { UrlAPI } from "@src/constants";
import readImageData from "@src/utils/imageHandler";
import { CommentMenu } from "./comment-menu-options.component";
import { useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";

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
  margin-right: 8px;
`;
const CommentContent = styled(Text)``;

const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
  position: absolute;
  top: 2px;
  right: 8px;
`;
const dayjs = require("dayjs");
const Comment = ({ comment, postId }) => {
  // comment == {} then we return <></>
  if (comment == false) {
    return <></>;
  }
  const { user } = useSelector(userSelector);
  const { userId: creatorId, content: commentContent } = comment;
  const [imageURI, setImageURI] = useState(null);
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [createTime, setCreateTime] = useState("");
  useEffect(() => {
    setContent(commentContent);
    setCreateTime(
      dayjs(comment.createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")
    );
    //get avatar of people commenting
    axios
      .get(`${UrlAPI}/user/${creatorId}`)
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <UserName>{userName}</UserName>
            <Text>{createTime}</Text>
          </View>
          <ReadMore numberOfLines={2}>
            <CommentContent>{content}</CommentContent>
          </ReadMore>
        </CommentInfo>

        {/* check if it is user's comment */}
        {creatorId == user._id && (
          <OptionsButton>
            <CommentMenu postId={postId} commentId={comment._id}></CommentMenu>
          </OptionsButton>
        )}
      </CommentContentWrapper>
    </CommentContainer>
  );
};

export default memo(Comment);
