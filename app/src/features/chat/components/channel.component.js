import {
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState, useLayoutEffect } from "react";
import styled from "styled-components/native";
import axios from "axios";

import { Avatar } from "../shared-styled-component";
import { UrlAPI } from "../../../constants";
import { ChatContext } from "../../../services/chat/chat.context";
import readImageData from "../../../utils/imageHandler";
import ChatRoom from "./chat-room.component";

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const LastMessage = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;

const Channel = ({ channelId, channelMessages }) => {
  const { HandleGetGroupChatMembers } = useContext(ChatContext);
  //hiện giờ chỉ cho chat với 1 người nên đặt tên k có "s"
  const [chatFriend, setChatFriend] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  let friendAvatar = null;
  useLayoutEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${UrlAPI}/chat/channel/${channelId}/members`
        );
        setChatFriend(res.data.members[0]);
        friendAvatar = readImageData(res.data.members[0].avatar.data.data);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);
  console.log("chatf", chatFriend);
  if (!chatFriend) {
    return <></>;
  }
  return (
    <Container
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ChatRoom setModalVisible={setModalVisible}></ChatRoom>
      </Modal>
      {friendAvatar ? (
        <Avatar
          source={{ uri: readImageData(chatFriend.avatar.data.data) }}
        ></Avatar>
      ) : (
        <Avatar
          source={require("../../../../assets/imgs/DefaultAvatar.png")}
        ></Avatar>
      )}
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Name>{chatFriend.nickname}</Name>
        <LastMessage>empty</LastMessage>
      </View>
    </Container>
  );
};

export default Channel;

const styles = StyleSheet.create({});
