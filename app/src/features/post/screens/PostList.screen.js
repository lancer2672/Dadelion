import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import PostItem from "../components/PostItem.component";
const Post = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLoading, isSuccess, data } = useGetAllPostsQuery();
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data ? data.posts : []}
        estimatedItemSize={480}
        renderItem={({ item }) => {
          return (
            <Spacer position={"bottom"} size="medium">
              <PostItem navigation={navigation} post={item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item._id}
      ></FlashList>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
