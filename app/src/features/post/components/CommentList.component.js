import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Comment from "./CommentItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FlashList } from "@shopify/flash-list";

const CommentList = ({ postId, comments }) => {
  const [commentList, setCommentList] = useState();
  console.log("comments", comments);
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "gray" }}
      nestedScrollEnabled={true}
      data={comments}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const { comment } = item;
        return <Comment comment={comment} />;
      }}
      keyExtractor={(item) => {
        return item.comment._id;
      }}
    ></FlatList>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
