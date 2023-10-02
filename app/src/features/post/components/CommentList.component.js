import { StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Comment from "./CommentItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FlashList } from "@shopify/flash-list";

const CommentList = ({ postId, comments }) => {
  const [commentList, setCommentList] = useState();
  console.log("comments", comments);
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        nestedScrollEnabled={true}
        data={comments}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const { comment } = item;
          return (
            <Spacer position={"bottom"} size="small">
              <Comment comment={comment} />
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
