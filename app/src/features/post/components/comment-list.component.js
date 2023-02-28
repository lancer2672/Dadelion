import { StyleSheet, FlatList } from "react-native";
import React from "react";

import Comment from "./comment.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const CommentList = ({ postId, comments }) => {
  let commentList;

  // just render lesser than 4 comments
  // if (comments.length > 5) {
  //   commentList = comments.slice(-4).map((comment, index) => {
  //     return {
  //       comment,
  //       postId,
  //     };
  //   });
  // } else {
  //   commentList = comments.map((comment, index) => {
  //     return {
  //       comment,
  //       postId,
  //     };
  //   });
  // }

  commentList = comments.map((comment, index) => {
    return {
      comment,
      postId,
    };
  });
  return (
    <FlatList
      data={commentList}
      initialNumToRender={4}
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
