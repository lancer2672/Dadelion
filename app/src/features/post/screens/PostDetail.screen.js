import {
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import { postSelector, userSelector } from "@src/store/selector";
import { colors } from "@src/infrastructure/theme/colors";
import ReadMore from "@fawazahmed/react-native-read-more";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import InputBar from "../components/PostInputbar.component";

import Comment from "../components/comment.component";
// import { useReactPostMutation } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";
import { reactPost, updateSelectedPost } from "@src/store/slices/postSlice";
import { getSocket } from "@src/utils/socket";

const DetailPost = ({ route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const socket = getSocket();
  const userState = useSelector(userSelector);
  const postState = useSelector(postSelector);
  const { selectedPost } = postState;
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
    socket.on("new-comment", (postId, newComment) => {
      dispatch(updateSelectedPost({ type: "comment", postId, newComment }));
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
  console.log("selectedPost  - postDetail", selectedPost);
  // useEffect(() => {
  //   if (isSuccess) {
  //     setHeart(!heart);
  //   }
  // }, [isSuccess])
  const handleReact = () => {
    dispatch(
      reactPost({ postId: selectedPost._id, postCreatorId: selectedPost.user })
    );
    setHeart(!heart);
  };
  return (
    <Container>
      <PostImage source={{ uri: selectedPost.image }} />
      <UserInfoContainer>
        <UserAvatar source={{ uri: selectedPost.postCreator.avatar }} />
        <View style={{ marginLeft: 12, justifyContent: "flex-end", flex: 1 }}>
          <CreatorName>{selectedPost.postCreator.nickname}</CreatorName>
          <Text style={{ color: theme.colors.chat.text }}>
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
              color={theme.colors.chat.text}
            />
          )}
        </TouchableOpacity>
      </UserInfoContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24, flex: 1, marginTop: 12 }}
      >
        <View>
          <PostDescriptionContainer numberOfLines={6}>
            <PostDescription>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem non tristique convallis. Integer nec neque ipsum. Fusce consectetur, odio ut venenatis malesuada, velit nunc mattis lectus, nec facilisis risus ligula quis turpis. Cras finibus dolor vel ex iaculis hendrerit. In non metus quis est dignissim porttitor. Suspendisse scelerisque tincidunt ligula, nec finibus mi ultricies sit amet. Duis tincidunt metus quis nisl eleifend luctus. Nulla consequat a neque nec elementum. Curabitur sed eros enim. Proin tincidunt facilisis malesuada. Sed eleifend velit sed volutpat egestas. Fusce tincidunt mauris eu ipsum posuere scelerisque."
              }
            </PostDescription>
          </PostDescriptionContainer>
          <CommentContainer>
            {selectedPost.comments.map((comment) => {
              return (
                <Comment
                  key={`${selectedPost._id + comment._id}`}
                  postId={selectedPost._id}
                  comment={comment}
                ></Comment>
              );
            })}
          </CommentContainer>
        </View>
      </ScrollView>
      <InputBar autoFocus={autoFocus} postId={selectedPost._id} />
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;

const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.chat.text};
`;

const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.chat.text};
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.chat.text};
`;

const PostDescription = styled(Text)`
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

const UserAvatar = styled(Image)`
  height: 70px;
  width: 70px;
  border-radius: 50px;
`;

const HeartIcon = styled(Ionicons)`
  margin-left: auto;
`;

const CommentContainer = styled(View)`
  flex: 1;
`;

export default DetailPost;
