import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import RecordListView from "../../components/ListViewItem";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;

const Post = ({ navigation }) => {
  const posts = useSelector((state) => state.post.posts);
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
          //Tuỳ thuộc vào độ dài của phần text mà set độ cao cho thẻ
          dim.height = 550;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  /*#endregion*/

  const rowRenderer = (type, data) => {
    return (
      <RecordListView
        {...data.item}
        postId={data.item._id}
        navigation={navigation}
      ></RecordListView>
    );
  };
  return (
    <RecyclerListView
      style={{ minWidth: 1, minHeight: 1 }}
      rowRenderer={rowRenderer}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
    ></RecyclerListView>
  );
};

export default Post;

const styles = StyleSheet.create({});
