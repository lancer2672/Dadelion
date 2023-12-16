import { FlatList, StyleSheet } from "react-native";

import Comment from "./CommentItem.component";

const CommentList = ({ postId, comments }) => {
  console.log("comments", comments);
  return (
    <FlatList
      style={{ flex: 1 }}
      nestedScrollEnabled={true}
      data={comments}
      estimatedItemSize={100}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const { comment } = item;
        return <Comment comment={comment} />;
      }}
      keyExtractor={(item, index) => {
        return `${item._id} ${index}`;
      }}
    ></FlatList>
  );
};

export default CommentList;

const styles = StyleSheet.create({});
