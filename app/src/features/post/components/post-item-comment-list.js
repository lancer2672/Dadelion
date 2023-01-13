import { StyleSheet, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import Comment from "./post-item-comment-item";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { memo } from "react";

const CommentList = ({ comments }) => {
  console.log("list_render");
  return (
    <FlatList
      style={{
        marginTop: 5,
        height: 200,
        width: "100%",
      }}
      data={comments}
      ListEmptyComponent={() => <Text>Nothing</Text>}
      renderItem={({ item }) => {
        return (
          <Spacer position={"bottom"} size="small">
            <Comment comment={item} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => item._id}
    ></FlatList>
  );
};

export default memo(CommentList);

const styles = StyleSheet.create({});
