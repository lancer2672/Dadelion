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
import RecordListView from "../../components/RecordListView";

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
  console.log("Posts", posts);
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
          dim.height = 500;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  /*#endregion*/

  const rowRenderer = (type, data) => {
    const { description, createdAt, creatorName, reactionNumber, _id } =
      data.item;
    return (
      <RecordListView
        props={data.item}
        // description={description}
        // createdAt={createdAt}
        // username={creatorName}
        // reactionNumber={reactionNumber}
        navigation={navigation}
      ></RecordListView>
    );
  };
  return (
    <RecyclerListView
      style={{ minWidth: 200, minHeight: 200 }}
      rowRenderer={rowRenderer}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
    ></RecyclerListView>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  reactSection: {
    marginLeft: 12,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerReact: {
    alignItems: "center",
  },
  comment: {
    height: 16,
    backgroundColor: "red",
  },
  icon: {},
  avatar: {
    marginRight: 12,
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  userDescription: {
    justifyContent: "center",
  },

  content: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  header: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
  },
});
