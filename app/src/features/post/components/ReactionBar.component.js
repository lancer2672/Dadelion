import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { memo, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
// import  { useReactPostMutation } from "@src/store/slices/api/postApiSlice";
import { useNavigation } from "@react-navigation/native";
import { userSelector } from "@src/store/selector";
import { reactPost, setSelectedPost } from "@src/store/slices/postSlice";
import { Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";

const ReactionBar = ({ post }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [heart, setHeart] = useState(false);
  const userState = useSelector(userSelector);
  const [reactionNumber, setReactionNumber] = useState(0);
  const [totalCommentNumber, setTotalCommentNumber] = useState(0);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleReact = () => {
    dispatch(reactPost({ postId: post._id, postCreatorId: post.user }));
  };
  const navigateToDetailPost = () => {
    dispatch(setSelectedPost(post));
    navigation.navigate("DetailPost", {
      autoFocus: true,
    });
  };
  useEffect(() => {
    //check if user reacted this post
    // const res = post.likes.find((object) => {
    //   return object.userId == userState.user._id;
    // });
    // if (res) {
    //   setHeart(true);
    // } else {
    //   setHeart(false);
    // }
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
    let commentCount = post.comments.reduce((acc, item, i) => {
      return acc + item.replies.length + 1; //child comments +  1  //parent comment
    }, 0);
    setTotalCommentNumber(commentCount);
  }, [post.comments]);

  return (
    // disable parent long press
    <ReactSectionContainer onLongPress={null}>
      <Heart post={post}></Heart>

      <Number>{reactionNumber}</Number>

      <ButtonWrapper onPress={navigateToDetailPost}>
        <FontAwesome5 name="comment-dots" size={28} color={"white"} />
      </ButtonWrapper>

      <Number>{totalCommentNumber}</Number>
      <ButtonWrapper onPress={null}>
        <Entypo name="dots-three-horizontal" size={28} color={"white"} />
      </ButtonWrapper>
    </ReactSectionContainer>
  );
};

export const Heart = ({ post }) => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false);
  const userState = useSelector(userSelector);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleReact = () => {
    dispatch(reactPost({ postId: post._id, postCreatorId: post.user }));
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
    <>
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
    </>
  );
};
const ReactSectionContainer = styled(Pressable)`
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
