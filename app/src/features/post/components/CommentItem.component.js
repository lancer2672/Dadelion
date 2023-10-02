import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState, memo, useContext } from "react";
import axios from "axios";
import styled from "styled-components/native";
import ReadMore from "@fawazahmed/react-native-read-more";

import { UrlAPI } from "@src/constants";
import readImageData from "@src/utils/imageHandler";
import { CommentMenu } from "./CommentMenuOptionscomponent";
import { useDispatch, useSelector } from "react-redux";
import { postSelector, userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { setRepliedComment } from "@src/store/slices/postSlice";
import { FlashList } from "@shopify/flash-list";

const dayjs = require("dayjs");
const Comment = ({ comment, parentId }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(comment.userId);
  const [creator, setCreator] = useState({});
  const [content, setContent] = useState("");
  const [showAllReply, setShowAllReply] = useState(false);
  console.count("rerender");
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

  const toggleSetRepliedComment = () => {
    const newRepliedComment = {
      ...comment,
      nickname: creator.nickname,
      // repliedUserId: comment.userId,
      _id: parentId || comment._id,
    };

    dispatch(setRepliedComment(newRepliedComment));
  };

  const showAllReplyComments = () => {
    setShowAllReply(true);
  };
  return (
    <View style={{ marginTop: 4, marginBottom: 10 }}>
      <CommentContainer isReplyComment={parentId ? true : false}>
        <TouchableOpacity>
          {creator.avatar ? (
            <Avatar source={{ uri: creator.avatar }}></Avatar>
          ) : (
            <Avatar source={require("@assets/imgs/DefaultAvatar.png")}></Avatar>
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
            <TouchableOpacity
              onPress={toggleSetRepliedComment}
              style={{ marginTop: 4, padding: 2 }}
            >
              <Text
                style={{
                  opacity: 0.8,
                  fontWeight: "bold",
                  color: theme.colors.chat.text,
                }}
              >
                {t("reply")}
              </Text>
            </TouchableOpacity>
            {!showAllReply && !parentId && comment.replies.length > 1 && (
              <TouchableOpacity
                onPress={showAllReplyComments}
                style={{ marginTop: 4, padding: 2 }}
              >
                <Text>{`${t("viewMore")} ${comment.replies.length - 1} ${t(
                  "comment"
                )}`}</Text>
              </TouchableOpacity>
            )}
          </CommentInfo>
          <CreateTime>
            {commentCreatedTimeFormater(comment.createdAt)}
          </CreateTime>
        </CommentContentWrapper>
      </CommentContainer>

      {/* show the latest comment  */}
      {!showAllReply && comment.replies && comment.replies.length > 0 && (
        <Comment comment={comment.replies[0]} parentId={comment._id} />
      )}
      {!parentId &&
        showAllReply &&
        comment.replies.map((cmt) => {
          return (
            <Comment
              key={`rep${cmt._id}`}
              comment={cmt}
              parentId={comment._id}
            />
          );
        })}
    </View>
  );
};
const CommentContainer = styled(View).attrs((props) => ({
  marginLeft: props.isReplyComment ? 16 : 0,
}))`
  flex-direction: row;
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
  color: ${(props) => props.theme.colors.chat.text};
`;
const CreateTime = styled(Text)`
  color: ${(props) => props.theme.colors.chat.text};
`;
const CommentContent = styled(Text)`
  color: ${(props) => props.theme.colors.chat.text};
  line-height: 22px;
`;
const OptionsButton = styled(TouchableOpacity)`
  margin-left: 6px;
  position: absolute;
  top: 2px;
  right: 8px;
`;
export default memo(Comment);
