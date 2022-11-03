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
import axios from "axios";
import { UrlAPI } from "../constants/constants";

const dayjs = require("dayjs");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;

// đây là container cho mỗi post trong recyclerListView của post
const RecordListView = ({ navigation, props }) => {
  const [heart, setHeart] = useState(false);
  const [numberOfHearts, setNumberOfHearts] = useState(
    props.reactionNumber + 1
  );
  console.log("IMAGE", props.image.data.data);
  const blob = new Blob([Int8Array.from(props.image.data.data)], {
    type: props.image.contentType,
  });
  const image = window.URL.createObjectURL(blob);
  console.log("URL", image);
  const handleReact = () => {
    setHeart(!heart);
  };
  useEffect(() => {
    if (heart == true) {
      console.log("addHeart");
      axios
        .put(`${UrlAPI}/post/:${props._id}`, {
          reactionNumber: props.reactionNumber + 1,
          description: props.description,
        })
        .then((res) => {
          console.log("data", res);
          setNumberOfHearts((preValue) => {
            return preValue + 1;
          });
        });
    } else {
      axios
        .put(`${UrlAPI}/post/:${props._id}`, {
          reactionNumber: props.reactionNumber - 1,
        })
        .then((res) => {
          setNumberOfHearts((preValue) => {
            return preValue - 1;
          });
        });
    }
  }, [heart]);

  const handleNavigation = () => {
    return;
    if (!navigation) {
      return;
    }
    navigation.navigate("User");
  };
  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigation}>
          {/* <Image
            source={require("./../../assets/imgs/24.jpg")}
            style={styles.avatar}
          ></Image> */}
          <Image source={{ uri: image }} style={styles.avatar}></Image>
        </TouchableOpacity>
        <View style={styles.userDescription}>
          <Text>{props.creatorName}</Text>
          <Text>
            {dayjs(props.createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={2}>{props.description}</Text>
      </View>
      <View
        style={{
          width: SCREEN_WIDTH_WITH_MARGIN_L_R_12,
          height: 350,
          elevation: 1,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ flex: 1, resizeMode: "stretch" }}
        ></Image>
      </View>
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
  userDescription: {
    justifyContent: "center",
  },

  content: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  reactionNumber: {},
  header: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
  },
});
