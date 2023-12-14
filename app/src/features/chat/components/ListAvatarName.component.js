import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Spacer } from "@src/components/spacer/spacer.component";
import Avatar from "@src/components/Avatar";
import { useGetAllFriendsQuery } from "@src/store/slices/api/userApiSlice";
import { useTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { setSelectedChannel } from "@src/store/slices/chatSlice";
import { useNavigation } from "@react-navigation/native";
const ListAvatarName = ({ channels }) => {
  const [isOnline, setIsOnline] = useState(1);
  const [activeFriends, setActiveFriends] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(userSelector);
  const { data } = useGetAllFriendsQuery();
  console.log("useGetAllFriendsQuery", data);

  useEffect(() => {
    if (data) {
      //get active users
      const list = data.filter((user) => user.isOnline == 1);
      setActiveFriends(list);
    }
  }, [data]);
  const navigateToChatRoom = (friendId) => {
    let channel = channels.find(
      (c) => c.memberIds.includes(user._id) && c.memberIds.includes(friendId)
    );
    if (channel) {
      dispatch(setSelectedChannel(channel));
      navigation.navigate("ChatRoom");
    }
  };

  if (activeFriends.length == 0) return <></>;
  return (
    <FlatList
      style={{
        flexGrow: 0,
      }}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const { avatar, firstname, _id } = item;
        console.log("avatar", avatar);
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                navigateToChatRoom(_id);
              }}
            >
              <Avatar isOnline={isOnline} source={{ uri: avatar }}></Avatar>
            </TouchableOpacity>
            <Text numberOfLines={1} style={styles.name(theme)}>
              {firstname}
            </Text>
          </View>
        );
      }}
      keyExtractor={(item) => {
        return `${item._id} item.name`;
      }}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  name: (theme) => ({
    textAlign: "center",
    fontSize: 16,
    maxWidth: 80,
    color: theme.colors.text.primary,
    fontWeight: "500",
  }),
});

export default ListAvatarName;
