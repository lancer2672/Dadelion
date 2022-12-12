import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import Comment from "./post-item-comment";
import styled from "styled-components/native";
const SCREEN_WIDTH = Dimensions.get("window").width;

const CommentList = ({ ...props }) => {
  const { comments } = props;
  const items = comments.map((comment, index) => {
    return {
      type: "NORMAL",
      item: {
        id: index,
        ...comment,
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
          dim.height = 50;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  /*#endregion*/

  const rowRenderer = (type, data) => {
    return <Comment {...data.item}></Comment>;
  };
  return (
    <RecyclerListView
      style={{
        marginTop: 5,
        height: "100%",
        width: "100%",
        backgroundColor: "grey",
      }}
      rowRenderer={rowRenderer}
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
    ></RecyclerListView>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
