import {
  StyleSheet,
  Text,
  Button,
  Image,
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import CommentListView from "./CommentListView";
import InputBar from "../InputBar";
import { useSelector, useDispatch } from "react-redux";

import readImageData from "../../utils/imageHandler";
import {
  UrlAPI,
  PostHeight,
  PostHeightWithoutCommentList,
} from "../../constants";
import Color from "../../utils/color";
import UpdatePost from "../../features/post/UpdatePost";
import { deletePost } from "../../features/post/postSlice";

const dayjs = require("dayjs");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_WIDTH_WITH_MARGIN_L_R_12 = SCREEN_WIDTH - 24;

// đây là container cho mỗi post trong recyclerListView của post
const RecordListView = ({
  navigation,
  setCommentsViewHeight,
  postId,
  ...props
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [heart, setHeart] = useState(false);
  const [imageUriData, setImageUriData] = useState("");
  const [imageUriUserAvatar, setImageUriUserAvatar] = useState("");
  const [reactionNumber, setReactionNumber] = useState(props.likes.length);
  const [viewComments, setViewComments] = useState(false);
  const [viewEditOptions, setViewEditOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    //if post have an image
    if (props.image) {
      setImageUriData(() => readImageData(props.image.data.data));
    }
    //User's avatar posted this post
    getUserAvatar();

    //check if user reacted this post
    for (let i = 0; i < props.likes.length; i++) {
      if (props.likes[i].userId == user._id) {
        setHeart(() => true);
      }
    }
  }, []);
  const getUserAvatar = async () => {
    await axios
      .get(`${UrlAPI}/user/${props.user}`)
      .then((res) => {
        setImageUriUserAvatar(() =>
          readImageData(res.data.user.avatar.data.data)
        );
      })
      .catch((err) => console.log(err));
  };
  const handleReact = async () => {
    await axios
      .put(`${UrlAPI}/post/${postId}`, {
        react: true,
      })
      .then((res) => {
        setHeart(() => !heart);
        if (heart == true) {
          setReactionNumber((reactionNumber) => reactionNumber - 1);
        } else {
          setReactionNumber((reactionNumber) => reactionNumber + 1);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleNavigation = () => {
    return;
    if (!navigation) {
      return;
    }
    navigation.navigate("User");
  };
  const handleRenderComments = () => {
    setCommentsViewHeight((height) => {
      return height == PostHeight ? PostHeightWithoutCommentList : PostHeight;
    });
    setViewComments(!viewComments);
  };
  const handleDeletePost = async () => {
    setViewEditOptions(false);
    await axios
      .delete(`${UrlAPI}/post/${postId}`)
      .then((res) => {
        console.log("res", res);
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };
  return (
    <View style={styles.postContainer}>
      {/* post header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavigation}>
          {imageUriUserAvatar == null ? (
            <Image
              style={styles.avatar}
              source={require("./../../../assets/imgs/DefaultAvatar.png")}
            ></Image>
          ) : (
            <Image
              style={styles.avatar}
              source={{ uri: imageUriUserAvatar || null }}
            ></Image>
          )}
        </TouchableOpacity>
        <View style={styles.postInfo}>
          <Text>{props.creatorName}</Text>
          <Text>
            {dayjs(props.createdAt).format("DD/MM/YYYY" + " lúc " + "HH:mm")}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setViewEditOptions(!viewEditOptions)}
            style={styles.moreBtn}
          >
            <Feather name="more-horizontal" size={24} color="black" />
          </TouchableOpacity>

          {viewEditOptions && (
            <View style={styles.editOptions}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={styles.option}>Chỉnh sửa</Text>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                    setViewEditOptions(false);
                  }}
                >
                  <View style={styles.centeredView}>
                    <UpdatePost
                      userAvatar={imageUriUserAvatar}
                      image={imageUriData}
                      createdAt={props.createdAt}
                      description={props.description}
                      creatorName={props.creatorName}
                      setIsvisible={setModalVisible}
                    ></UpdatePost>
                  </View>
                </Modal>
              </TouchableOpacity>
              <View style={styles.seperator}></View>
              <TouchableOpacity onPress={handleDeletePost}>
                <Text style={[styles.option]}>Xoá</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* post content */}
      <View style={styles.content}>
        <Text numberOfLines={2}>{props.description}</Text>
      </View>
      {/* post image */}
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
          <Text style={styles.numberOfHearts}>{reactionNumber}</Text>
          {heart == true ? (
            <AntDesign name="heart" size={24} color="red" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginBottom: 2 }}>|</Text>
        <TouchableOpacity onPress={handleRenderComments}>
          <Text style={styles.comment}>Comment</Text>
        </TouchableOpacity>
      </View>

      {viewComments && (
        <View style={styles.comments}>
          <CommentListView comments={props.comments}></CommentListView>
        </View>
      )}
      <InputBar postId={postId}></InputBar>
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
    backgroundColor: "#e7e1e1",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  moreBtn: {
    paddingRight: 4,
    paddingLeft: 4,
  },
  editOptions: {
    position: "absolute",
    width: 80,
    bottom: -60,
    backgroundColor: Color.descriptionBtnBackground,
    right: 4,
    zIndex: 1,
    borderRadius: 2,
    padding: 2,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 15,
  },
  option: {
    padding: 4,
  },
  seperator: {
    borderWidth: 1,
    borderColor: Color.descriptionBackground,
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
    marginBottom: 4,
  },
  reactionNumber: {},
  header: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  comments: {
    height: 200,
    marginTop: 5,
    minWidth: 1,
  },

  centeredView: {
    backgroundColor: "rgba(1, 1, 1, 0.2)",
    flex: 1,
    alignItems: "center",
    marginTop: 22,
  },
});
