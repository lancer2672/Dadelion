import {
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postSelector } from "@src/store/selector";
import { useGetPostByUserIdQuery } from "@src/store/services/postService";

const UserPost = ({ userId }) => {
  const postState = useSelector(postSelector);
  const { isSuccess, isLoading, data } = useGetPostByUserIdQuery(userId);
  const [posts, setPost] = useState();
  useEffect(() => {
    if (isSuccess) {
      setPost(data.posts);
    }
  }, [isLoading]);
  console.log("posts", posts);
  return (
    <View style={{ flex: 1, marginHorizontal: 8 }}>
      <FlatList
        data={posts}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => null}
        renderItem={({ item }) => {
          console.log("item", item);
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
