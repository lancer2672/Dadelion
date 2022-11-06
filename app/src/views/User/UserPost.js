import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { useSelector } from "react-redux";

import RecordListView from "../../components/RecordListView";

const SCREEN_WIDTH = Dimensions.get("window").width;
const UserPost = () => {
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.post.posts);
  const [isLoading, setLoading] = useState(false);

  const userPosts = posts.filter((post, index) => {
    return post.user == user._id;
  });

  // const [userPosts, setUserPosts] = useState([]);
  console.log("userPosts", userPosts);
  const [heart, setHeart] = useState(false);
  useEffect(() => {
    // getUserPosts()
  }, []);

  const items = userPosts.map((post, index) => {
    return {
      type: "NORMAL",
      item: {
        id: index,
        ...post,
      },
    };
  });
  const handleReact = () => {
    setHeart(!heart);
  };
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
    const { description, createdAt, creatorName } = data.item;
    return <RecordListView props={data.item}></RecordListView>;
  };
  console.count("RENDER");
  return (
    <>
      {isLoading == true ? (
        <Text>LOading...</Text>
      ) : (
        <RecyclerListView
          style={{ minWidth: 200, minHeight: 200 }}
          rowRenderer={rowRenderer}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
        ></RecyclerListView>
      )}
    </>
  );
};

export default UserPost;

const styles = StyleSheet.create({});
