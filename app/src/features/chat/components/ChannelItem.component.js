import {
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";

import { Avatar } from "@src/features/post/shared-components";
import { useDispatch } from "react-redux";
import { joinRoom } from "@src/store/slices/chatSlice";

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const LastMessage = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const Channel = ({ navigation, channel }) => {
  const { _id: channelId } = channel;
  //hiện giờ chỉ cho chat với 1 người nên đặt tên k có "s"
  const [chatFriend, setChatFriend] = useState(null);
  const dispatch = useDispatch();

  // get infor
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get(
  //         `${UrlAPI}/chat/channel/${channelId}/members`
  //       );
  //       setChatFriend(res.data.members[0]);
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   })();
  // }, []);
  return (
    <Container
      onPress={() => {
        dispatch(joinRoom(channelId));
        navigation.navigate("ChatRoom", {
          channelId,
        });
      }}
    >
      <Avatar
        source={require("../../../../assets/imgs/DefaultAvatar.png")}
      ></Avatar>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Name>ChatRoomName</Name>
        <LastMessage>empty</LastMessage>
      </View>
    </Container>
  );
};

export default Channel;

const styles = StyleSheet.create({});
