import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Comment from "./CommentItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FlashList } from "@shopify/flash-list";

const CommentList = ({ postId, comments }) => {
  console.log("comments", comments);
  return (
    <FlatList
      style={{ flex: 1 }}
      nestedScrollEnabled={true}
      data={comments}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const { comment } = item;
        return <Comment comment={comment} />;
      }}
      keyExtractor={(item, index) => {
        return `${item._id} ${index}`;
      }}
    ></FlatList>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
