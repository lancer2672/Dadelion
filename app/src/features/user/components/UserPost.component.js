import { useNavigation } from "@react-navigation/native";
import { useGetPostByUserIdQuery } from "@src/store/slices/api/postApiSlice";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { setSelectedPost } from "@src/store/slices/postSlice";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";

const UserPost = ({ route }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isSuccess, isLoading, data } = useGetPostByUserIdQuery(userId);
  const { data: userData } = useGetUserByIdQuery(userId);

  console.log("userPost", data);
  const navigateToDetailPost = (post) => {
    console.log("userData", userData);
    if (userData) {
      dispatch(setSelectedPost(post));
      navigation.navigate("DetailPost", {});
    }
  };
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: theme.colors.bg.primary,
      }}
    >
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => null}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "50%",
                height: 280,
                paddingHorizontal: 8,
                paddingVertical: 8,
              }}
            >
              <Pressable
                onPress={() => navigateToDetailPost(item)}
                style={{ flex: 1 }}
              >
                <Image
                  style={{ resizeMode: "cover", flex: 1 }}
                  source={{ uri: item.image }}
                ></Image>
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
      ></FlatList>
    </View>
  );
};

export default UserPost;

const styles = StyleSheet.create({});
