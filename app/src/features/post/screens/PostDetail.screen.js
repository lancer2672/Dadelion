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
import { postCreatedTimeFormater } from "@src/utils/timeFormater";
import InputBar from "../components/Inputbar.component";

import Comment from "../components/Comment.component";
import { useReactPostMutation } from "@src/store/slices/api/postApiSlice";

const DetailPost = ({ route }) => {
  const userState = useSelector(userSelector);
  const postState = useSelector(postSelector);
  const { selectedPost } = postState;
  const { postCreator } = route.params;
  const [heart, setHeart] = useState(false);
  const [reactPost, { isSuccess }] = useReactPostMutation();
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
    if (isSuccess) {
      setHeart(!heart);
    }
  }, [isSuccess]);
  const handleReact = () => {
    reactPost(selectedPost._id);
  };
  return (
    <Container>
      <PostImage source={{ uri: selectedPost.image }} />
      <UserInfoContainer>
        <UserAvatar source={{ uri: postCreator.avatar }} />
        <View style={{ marginLeft: 12, justifyContent: "flex-end", flex: 1 }}>
          <CreatorName>{postCreator.nickname}</CreatorName>
          <Text style={{ color: colors.text.secondary }}>
            {postCreatedTimeFormater(selectedPost.createdAt)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleReact}>
          {heart == true ? (
            <HeartIcon name="heart" size={24} color="red" />
          ) : (
            <HeartIcon name="heart-outline" size={24} color={colors.black} />
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
      <InputBar postId={selectedPost._id} />
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  padding-bottom: 12px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const CreatorName = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.black};
`;

const PostDescriptionContainer = styled(ReadMore)`
  margin-left: 8px;
  margin-bottom: 4px;
  margin-bottom: 20px;
  line-height: 22px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.black};
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
