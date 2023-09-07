import {
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGetPostByUserIdQuery } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";

const UserPost = ({ userId }) => {
  const { isSuccess, isLoading, data } = useGetPostByUserIdQuery(userId);
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.chat.bg.primary,
      }}
    >
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => null}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "50%",
                height: 280,
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}
            >
              <Pressable style={{ flex: 1 }}>
                <Image
                  style={{ resizeMode: "cover", flex: 1 }}
                  source={{ uri: item.image }}
                ></Image>
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
      ></FlatList>
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({});
