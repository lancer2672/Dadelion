import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, memo, useRef } from "react";
import {
  Fontisto,
  AntDesign,
  FontAwesome5,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import styled from "styled-components/native";
// import { useReactPostMutation } from "@src/store/slices/api/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { useTheme } from "styled-components";
import { reactPost } from "@src/store/slices/postSlice";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";

const ReactionBar = ({ post }) => {
  const { likes } = post;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [heart, setHeart] = useState(false);
  const userState = useSelector(userSelector);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  // const [reactPost, {}] = useReactPostMutation();
  const handleReact = () => {
    dispatch(reactPost({ postId: post._id, postCreatorId: post.user }));
  };
  const navigateToDetailPost = () => {
    navigation.navigate("DetailPost", {
      autoFocus: true,
    });
  };
  useEffect(() => {
    //check if user reacted this post
    const res = post.likes.find((object) => {
      return object.userId == userState.user._id;
    });
    if (res) {
      setHeart(true);
    } else {
      setHeart(false);
    }
    setReactionNumber(post.likes.length);
  }, [post.likes.length]);
  const animateHeartScaleToZero = () => {
    return Animated.timing(heartScale, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    });
  };

  const animateHeartScaleToOne = () => {
    return Animated.spring(heartScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    });
  };

  const animateScaleAndOpacity = () => {
    return Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);
  };

  useEffect(() => {
    if (!isFirstMount) {
      if (heart) {
        animateHeartScaleToZero().start(() => {
          scaleValue.setValue(0);
          Animated.parallel([animateHeartScaleToOne()]).start();
        });
      } else {
        animateHeartScaleToZero().start(() => {
          animateHeartScaleToOne().start();
        });
      }
    } else setIsFirstMount(() => false);
  }, [heart]);

  return (
    <ReactSectionContainer>
      <View>
        <ButtonWrapper style={{ flexDirection: "row" }} onPress={handleReact}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <Ionicons
              name={"heart"}
              size={32}
              color={heart ? "red" : "white"}
            />
          </Animated.View>
        </ButtonWrapper>
        <Animated.View
          style={[
            {
              borderRadius: 50,
              zIndex: -1,
              position: "absolute",
              borderColor: "red",
              borderWidth: 5,
              width: 53,

              height: 53,
              ...StyleSheet.absoluteFillObject,
              transform: [{ scale: scaleValue }],
            },
          ]}
        ></Animated.View>
      </View>

      <Number>{reactionNumber}</Number>
      <ButtonWrapper onPress={navigateToDetailPost}>
        <FontAwesome5 name="comment-dots" size={28} color={"white"} />
      </ButtonWrapper>

      <Number>{post.comments.length}</Number>
      <ButtonWrapper onPress={null}>
        <Entypo name="dots-three-horizontal" size={28} color={"white"} />
      </ButtonWrapper>
    </ReactSectionContainer>
  );
};
const ReactSectionContainer = styled(View)`
  position: absolute;
  top: 12%;
  right: 20px;
  align-items: center;
  justify-content: space-evenly;
`;
const Number = styled(Text)`
  margin-bottom: 12px;
  margin-top: 4px;
  font-weight: 500;
  color: white;
`;
const ButtonWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
`;
export default memo(ReactionBar);

const styles = StyleSheet.create({});
