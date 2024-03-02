import { View } from "react-native";

import { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import ListAvatarName from "../components/ListAvatarName.component";
import ListChannel from "../components/ListChannel.component";
import SearchChannel from "../components/SearchChannel.component";
import SideMenu from "../components/SideMenu.component";
import { StyleSheet } from "react-native";

const ChatPage = ({ friendChannels }) => {
  const theme = useTheme();
  const [channels, setChannels] = useState(friendChannels);

  const resetSearch = useCallback(() => {
    setChannels(friendChannels);
  }, [friendChannels]);

  return (
    <View style={styles.container(theme)}>
      <SearchChannel
        channels={channels}
        resetSearch={resetSearch}
        setChannels={setChannels}
      ></SearchChannel>
      {/* <ListAvatarName channels={channels}></ListAvatarName> */}
      <ListChannel channels={channels}></ListChannel>
    </View>
  );
};
const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.colors.bg.primary,
    flex: 1,
    padding: 12,
    justifyContent: "flex-start",
  }),
});
export default ChatPage;
