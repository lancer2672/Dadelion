import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Comment from "./Comment.component";
import { Spacer } from "@src/components/spacer/spacer.component";

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
    <FlatList
      data={commentList}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => null}
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
    ></FlatList>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
