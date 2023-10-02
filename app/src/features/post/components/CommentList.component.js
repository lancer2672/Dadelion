import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Comment from "./CommentItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FlashList } from "@shopify/flash-list";

const CommentList = ({ postId, comments }) => {
  const [commentList, setCommentList] = useState();
  useEffect(() => {
    setCommentList(
      comments.map((comment, index) => {
        return {
          comment,
          postId,
        };
      })
    );
  }, [comments]);
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={commentList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { postId, comment } = item;
          return (
            <Spacer position={"bottom"} size="small">
              <Comment postId={postId} comment={comment} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => {
          return item.comment._id;
        }}
      ></FlashList>
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
