import { FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import Channel from "./ChannelItem.component";
const ListChannel = ({ channels }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <FlatList
      style={{
        backgroundColor: theme.colors.bg.primary,
      }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return <Channel navigation={navigation} channel={item} />;
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListChannel;
