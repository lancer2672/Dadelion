import { StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import PostItem from "../components/post.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";

const Post = ({ navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const { isLoading, isSuccess, data } = useGetAllPostsQuery();
  useEffect(() => {
    if (isSuccess) {
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
            <PostItem navigation={navigation} post={item} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => item._id}
    ></FlatList>
  );
};

export default Post;

const styles = StyleSheet.create({});
