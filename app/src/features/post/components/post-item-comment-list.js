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

const CommentList = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      ListEmptyComponent={() => null}
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

export default CommentList;

const styles = StyleSheet.create({});
