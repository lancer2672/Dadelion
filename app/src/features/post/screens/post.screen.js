import { StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import PostItem from "../components/post.component";
import { PostContext } from "../../../services/post/post.context";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetAllPostsQuery } from "@src/store/services/postService";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";

const Post = ({ navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const { isLoading, isSuccess, data } = useGetAllPostsQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log("data.posts", data.posts);
      setPosts(data.posts);
    }
    dispatch(setIsLoading(isLoading));
  }, [isLoading, data]);
  return (
    <FlatList
      data={posts}
      ListEmptyComponent={() => <Text></Text>}
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
