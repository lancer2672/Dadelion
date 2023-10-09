import {
  LayoutAnimation,
  UIManager,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import React, {
  useEffect,
  useState,
  memo,
  useContext,
  useCallback,
} from "react";
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
import { useRef } from "react";
import { Avatar } from "@src/components/Avatar";
const dayjs = require("dayjs");
const VIEW_MORE_HEIGHT = 24;

// TODO: Tại sao không hiển viewMore, lưu tổng height
const Comment = ({ comment, parentId, totalChildHeightRef }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { data, isLoading, isSuccess } = useGetUserByIdQuery(comment.userId);
  const [creator, setCreator] = useState({});

  const heightAnim = useRef(new Animated.Value(0)).current;
  const [showAllReply, setShowAllReply] = useState(false);

  // to apply animation for children's height
  const [parentFirstMount, setParentFirstMount] = useState(true);
  // all children heights
  const parentTotalChildHeightRef = useRef(0);
  //get height from layout of children only at first time render
  const firstMountRef = useRef(true);

  const onLayout = useCallback(
    (event) => {
      const { height } = event.nativeEvent.layout;
      if (firstMountRef.current) {
        console.log(
          "onlayout height ",
          firstMountRef.current,
          parentId == null,
          height
        );

        if (firstMountRef.current) {
          if (!parentId) {
            // apply animated property(height) to list comment
            setParentFirstMount(false);
          } else {
            totalChildHeightRef.current += height;
            console.log(
              "totalChildHeightRef.current",
              totalChildHeightRef.current
            );
          }
          firstMountRef.current = false;
        }
      }
    },
    [parentId]
  );

  useEffect(() => {
    if (isSuccess) {
      if (comment.userId == user._id) {
        setCreator(user);
      } else {
        setCreator(data.user);
      }
    }
  }, [isLoading]);

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
    setShowAllReply(() => true);
  };
  useEffect(() => {
    if (showAllReply) {
      console.log(
        "useEffect before",
        parentTotalChildHeightRef.current,
        heightAnim._value
      );
      Animated.timing(heightAnim, {
        toValue: parentTotalChildHeightRef.current,
        duration: 1000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          console.log("Animation completed");
        } else {
          console.log("Animation interrupted");
        }
      });
    }
  }, [showAllReply]);
  console.log("parentId", parentId ? "gray" : "red");
  return (
    <View
      style={{
        paddingTop: 4,
        marginTop: 8,
        paddingBottom: 10,
        // flexGrow: 1,
        height: "auto",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "red",
      }}
      onLayout={onLayout}
    >
      <CommentContainer isReplyComment={parentId ? true : false}>
        <TouchableOpacity>
          <Avatar uri={creator.avatar}></Avatar>
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

            <CommentContent>{comment.content}</CommentContent>

            <TouchableOpacity
              onPress={toggleSetRepliedComment}
              style={{ marginTop: 4, padding: 2, marginBottom: 4 }}
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
                style={{ height: VIEW_MORE_HEIGHT }}
              >
                <Text style={{ color: theme.colors.chat.text }}>{`${t(
                  "viewMore"
                )} ${comment.replies.length - 1} ${t("comment")}`}</Text>
              </TouchableOpacity>
            )}
          </CommentInfo>
          <CreateTime>
            {commentCreatedTimeFormater(comment.createdAt)}
          </CreateTime>
        </CommentContentWrapper>
      </CommentContainer>

      {!parentId && (
        <Animated.View
          style={{ height: parentFirstMount ? "auto" : heightAnim }}
        >
          {comment.replies.map((cmt) => {
            return (
              <Comment
                totalChildHeightRef={parentTotalChildHeightRef}
                key={`rep${cmt._id}`}
                comment={cmt}
                parentId={comment._id}
              />
            );
          })}
        </Animated.View>
      )}
    </View>
  );
};
const CommentContainer = styled(View).attrs((props) => ({
  marginLeft: props.isReplyComment ? 16 : 0,
  // backgroundColor: "red",
  flex: 1,
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

export default Comment;
