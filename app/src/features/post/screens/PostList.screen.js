import { StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import PostItem from "../components/PostItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useNavigation } from "@react-navigation/native";

const Post = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, isSuccess, data } = useGetAllPostsQuery();
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);
  return (
    <FlatList
      data={data ? data.posts : []}
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
