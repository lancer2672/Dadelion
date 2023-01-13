import { StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import PostItem from "../components/post-item";
import { PostContext } from "../../../services/post/post.context";
import { Spacer } from "../../../components/spacer/spacer.component";

const Post = ({ navigation }) => {
  const { posts, isLoading } = useContext(PostContext);
  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  return (
    <FlatList
      style={{ marginBottom: 150 }}
      data={posts}
      ListEmptyComponent={() => <Text>Nothing</Text>}
      renderItem={({ item }) => {
        return (
          <Spacer position={"bottom"} size="medium">
            <PostItem post={item} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => item._id}
    ></FlatList>
  );
};

export default Post;

const styles = StyleSheet.create({});
