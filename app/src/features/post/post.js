import { StyleSheet, Text, Image, View, Dimensions } from "react-native";
import React, { Component } from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { useSelector, useDispatch } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Post = () => {
    const posts = useSelector((state) => state.post.posts);
    console.log("posts",posts);
    const items = posts.map((post, index) => {
      return {
        type: "NORMAL",
        item: {
          id: index,
          ...post,
        },
      };
    });
    const dataProvider = new DataProvider((r1, r2) => r1 != r2).cloneWithRows(
      items
    );
    const layoutProvider = new LayoutProvider(
      (i) => {
        return dataProvider.getDataForIndex(i).type;
      },
      (type, dim) => {
        switch (type) {
          case "NORMAL":
            dim.width = SCREEN_WIDTH;
            dim.height = 100;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );

    const rowRenderer = (type, data) => {
      const { title, description } = data.item;
      return (
        <View>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>
      );
    };
  
    return (
      <RecyclerListView
        style={{ minHeight: 100, minWidth: 100 }}
        rowRenderer={rowRenderer}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
      ></RecyclerListView>
    );  
}

export default Post

const styles = StyleSheet.create({})