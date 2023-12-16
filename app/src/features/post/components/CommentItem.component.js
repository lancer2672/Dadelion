import { useCallback, useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

import { Avatar } from "@src/components/Avatar";
import { userSelector } from "@src/store/selector";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { setRepliedComment } from "@src/store/slices/postSlice";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
const dayjs = require("dayjs");
const VIEW_MORE_HEIGHT = 24;

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
        if (firstMountRef.current) {
          if (!parentId) {
            // apply animated property(height) to list comment
            setParentFirstMount(false);
          } else {
            totalChildHeightRef.current += height;
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
        setCreator(data);
      }
    }
  }, [isLoading]);

  const toggleSetRepliedComment = () => {
    const newRepliedComment = {
      ...comment,
      nickname: creator.nickname,
      _id: parentId || comment._id,
    };
    dispatch(setRepliedComment(newRepliedComment));
  };

  const showAllReplyComments = () => {
    setShowAllReply(() => true);
  };
  useEffect(() => {
    if (showAllReply) {
      Animated.timing(heightAnim, {
        toValue: parentTotalChildHeightRef.current,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [showAllReply]);
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
      }}
      onLayout={onLayout}
    >
      <CommentContainer isReplyComment={parentId ? true : false}>
        <TouchableOpacity>
          <Avatar source={{ uri: creator.avatar }}></Avatar>
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
                  opacity: 0.5,
                  fontWeight: "bold",
                  color: theme.colors.bg.primary,
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
                <Text style={{ color: theme.colors.text.primary }}>{`${t(
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
  color: ${(props) => props.theme.colors.bg.primary};
`;
const CreateTime = styled(Text)`
  color: ${(props) => props.theme.colors.bg.primary};
`;
const CommentContent = styled(Text)`
  color: ${(props) => props.theme.colors.bg.primary};
  line-height: 22px;
`;

export default Comment;
