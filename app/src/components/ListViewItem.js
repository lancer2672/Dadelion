import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { UrlAPI } from "../constants/constants";
import CommentListView from "./CommentListView";
import InputBar from "./InputBar";

const base64 = require("base-64");
const dayjs = require("dayjs");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;

// đây là container cho mỗi post trong recyclerListView của post
const RecordListView = ({ navigation, props, postId }) => {
  const [heart, setHeart] = useState(false);
  const [imageUriData, setImageUriData] = useState("");
  const [numberOfHearts, setNumberOfHearts] = useState(
    props.reactionNumber + 1
  );
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    //window.btoa is not working as I want
    return base64.encode(binary);
  };
  useEffect(() => {
    if (props.image) {
      setImageUriData(
        () =>
          "data:image/jpeg;base64," + arrayBufferToBase64(props.image.data.data)
      );
    }
  }, []);
  const handleReact = () => {
    setHeart(!heart);
  };
  // useEffect(() => {
  //   if (heart == true) {
  //     console.log("addHeart");
  //     axios
  //       .put(`${UrlAPI}/post/:${props._id}`, {
  //         reactionNumber: props.reactionNumber + 1,
  //         description: props.description,
  //       })
  //       .then((res) => {
  //         console.log("data", res);
  //         setNumberOfHearts((preValue) => {
  //           return preValue + 1;
  //         });
  //       });
  //   } else {
  //     axios
  //       .put(`${UrlAPI}/post/:${props._id}`, {
  //         reactionNumber: props.reactionNumber - 1,
  //       })
  //       .then((res) => {
  //         setNumberOfHearts((preValue) => {
  //           return preValue - 1;
  //         });
  //       });
  //   }
  // }, [heart]);

  const handleNavigation = () => {
    return;
    if (!navigation) {
      return;
    }
    navigation.navigate("User");
  };
  return (
    <View style={styles.postContainer}>
      {/* post header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigation}>
          <Image
            source={{
              uri: imageUriData || null, //data.data in your case
            }}
            style={styles.avatar}
          ></Image>
        </TouchableOpacity>
        <View style={styles.postInfo}>
          <Text>{props.creatorName}</Text>
          <Text>
            {dayjs(props.createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreBtn}>
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* post content */}
      <View style={styles.content}>
        <Text numberOfLines={2}>{props.description}</Text>
      </View>
      <View
        style={{
          //to fit image in post => property: SCREEN_WIDTH_WITH_MARGIN_L_R_12 - 6
          width: SCREEN_WIDTH_WITH_MARGIN_L_R_12 - 6,
          height: 350,
        }}
      >
        <Image
          source={{
            uri: imageUriData || null,
          }}
          //to fit image in post => marginLeft 4;
          style={{ flex: 1, resizeMode: "stretch", marginLeft: 4 }}
        ></Image>
      </View>

      {/* reaction area */}
      <View style={styles.reactSection}>
        <TouchableOpacity
          onPress={handleReact}
          style={styles.reactSection_heart}
        >
          <Text style={styles.numberOfHearts}>{numberOfHearts}</Text>
          {heart == true ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginBottom: 8 }}>|</Text>
        <TouchableOpacity>
          <Text style={styles.comment}>Comment</Text>
        </TouchableOpacity>
      </View>
      {/* <CommentListView style={styles.comments}></CommentListView> */}
      <InputBar style={styles.inputBar} postId={postId}></InputBar>
    </View>
  );
};

export default RecordListView;

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
    backgroundColor: "yellow",
  },
  moreBtn: {
    paddingRight: 4,
    paddingLeft: 4,
  },
  reactSection: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomColor: "#dedede",
    borderBottomWidth: 2,
  },
  containerReact: {
    alignItems: "center",
  },
  comment: {
    height: 16,
  },
  icon: {},
  reactSection_heart: {
    flexDirection: "row",
  },
  numberOfHearts: {
    marginRight: 8,
  },
  avatar: {
    marginRight: 12,
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  postInfo: {
    justifyContent: "center",
    flex: 1,
  },

  content: {
    marginLeft: 8,
  },
  reactionNumber: {},
  header: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  // commentList: {
  //   minHeight: 200,
  //   backgroundColor: "red",
  // },
  comments: {
    height: 40,
    marginTop: 5,
  },
  inputBar: {
    height: 40,
    marginTop: 5,
  },
});
