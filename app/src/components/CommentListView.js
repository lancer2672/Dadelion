import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { useSelector } from "react-redux";
const SCREEN_WIDTH = Dimensions.get("window").width;
const CommentListView = () => {
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
    return <View></View>;
  };
  console.log(items);
  return (
    <RecyclerListView
      style={{ minWidth: 200, minHeight: 200 }}
      rowRenderer={rowRenderer}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
    ></RecyclerListView>
  );
};

export default CommentListView;

const styles = StyleSheet.create({});
