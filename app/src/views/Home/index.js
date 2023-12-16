import { View } from "react-native";

import PostList from "@src/features/post/screens/PostList.screen";
import { useTheme } from "styled-components";
import HomeHeader from "./HomeHeader";
const Home = ({}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.bg.primary,
      }}
    >
      <HomeHeader></HomeHeader>
      <View style={{ flex: 1 }}>
        <PostList></PostList>
      </View>
    </View>
  );
};

export default Home;
