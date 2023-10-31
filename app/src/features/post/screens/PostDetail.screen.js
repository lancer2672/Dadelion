import {
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { postSelector, userSelector } from "@src/store/selector";
import ReadMore from "@fawazahmed/react-native-read-more";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import InputBar from "../components/PostInputbar.component";
import { useTheme } from "styled-components";
import { reactPost, updateSelectedPost } from "@src/store/slices/postSlice";
import { getSocket } from "@src/utils/socket";
import { Avatar } from "@src/components/Avatar";
import FastImage from "react-native-fast-image";
import { FlashList } from "@shopify/flash-list";
import CommentItemComponent from "../components/CommentItem.component";

const DetailPost = ({ route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  const imageHeightAnim = useRef(new Animated.Value(300)).current;
  const userState = useSelector(userSelector);
  const postState = useSelector(postSelector);
  const { selectedPost } = postState;
  console.log("SELECTED POST", selectedPost);
  const { autoFocus } = route.params;
  const [heart, setHeart] = useState(false);
  // const [reactPost, { isSuccess }] = useReactPostMutation();
  useEffect(() => {
    //check if user reacted this selectedPost
    const res = selectedPost.likes.find((object) => {
      return object.userId == userState.user._id;
    });
    if (res) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  }, [selectedPost.likes]);
  useEffect(() => {
    socket.on("new-comment", (data) => {
      console.log("Update comment", data);
      dispatch(updateSelectedPost({ type: "comment", ...data }));
    });
    socket.on("react-post", (postId, reactUserId, isAddedToList) => {
      dispatch(
        updateSelectedPost({
          type: "react",
          postId,
          reactUserId,
          isAddedToList,
        })
      );
    });
  }, [socket]);

  const handleReact = () => {
    dispatch(
      reactPost({ postId: selectedPost._id, postCreatorId: selectedPost.user })
    );
    setHeart(!heart);
  };
  const handleScroll = (event) => {
    // Lấy thông tin vị trí cuộn và xử lý
    const scrollY = event.nativeEvent.contentOffset.y;
    console.log("Vị trí cuộn: ", scrollY);
  };
  console.log("selectedPost,selectedPost.comments", selectedPost.comments);
  return (
    <Container>
      <FastImage
        fallback={true}
        source={{
          uri: "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/A-Alamy-BXWK5E_vvmkuf.jpg",
          uri: selectedPost.image,
          priority: FastImage.priority.high,
        }}
        style={{
          height: 300,
          width: "100%",
          backgroundColor: "gray",
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <UserInfoContainer>
        <Avatar
          width={70}
          height={70}
          source={{ uri: selectedPost.postCreator.avatar }}
        />
        <View style={{ marginLeft: 12, justifyContent: "flex-end", flex: 1 }}>
          <CreatorName>{selectedPost.postCreator.nickname}</CreatorName>
          <Text style={{ color: theme.colors.text.primary }}>
            {postCreatedTimeFormatter(selectedPost.createdAt)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleReact}>
          {heart == true ? (
            <HeartIcon name="heart" size={24} color="red" />
          ) : (
            <HeartIcon
              name="heart-outline"
              size={24}
              color={theme.colors.text.primary}
            />
          )}
        </TouchableOpacity>
      </UserInfoContainer>
      <ScrollView
        // onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 24,
          backgroundColor: "tomato",
          flexGrow: 1,
        }}
      >
        {/* <PostDescriptionContainer numberOfLines={6}> */}
        <PostDescription>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
          }
        </PostDescription>
        {/* </PostDescriptionContainer> */}
        <CommentContainer>
          {selectedPost.comments.map((comment) => {
            return (
              <CommentItemComponent
                key={`${selectedPost._id + comment._id}`}
                comment={comment}
              ></CommentItemComponent>
            );
          })}
        </CommentContainer>
      </ScrollView>
      <InputBar autoFocus={autoFocus} postId={selectedPost._id} />
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.text.primary};
`;

const PostDescription = styled(Text)`
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.black};
`;

const PostImage = styled(Image)`
  height: 300px;
  width: 100%;
`;

const UserInfoContainer = styled(View)`
  flex-direction: row;
  margin-top: -28px;
  align-items: flex-end;

  margin-horizontal: 24px;
`;

const HeartIcon = styled(Ionicons)`
  margin-left: auto;
`;

const CommentContainer = styled(View)`
  flex: 1;
  background-color: gray;
`;

export default DetailPost;
