import { StyleSheet, Image, Text, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";
import { Modal } from "react-native";

const UserMessage = ({ isMyMessage, message, imageUrl, handleShowDialog }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenImageFullScreen = () => {
    setModalVisible(true);
  };
  return (
    <Container isMyMessage={isMyMessage}>
      {!isMyMessage && (
        <>
          <Avatar source={require("@assets/imgs/DefaultAvatar.png")}></Avatar>
        </>
      )}
      <MessageContainer isMyMessage={isMyMessage}>
        <View style={{ flexDirection: "row" }}>
          {isMyMessage && <View style={{ flex: 1 }}></View>}
          <View>
            {message && <Message isMyMessage={isMyMessage}>{message}</Message>}
            {imageUrl && (
              <Pressable
                onLongPress={handleShowDialog}
                onPress={handleOpenImageFullScreen}
              >
                <Image
                  style={{
                    borderRadius: 20,
                    width: 140,
                    height: 180,
                    resizeMode: "cover",
                  }}
                  source={{ uri: imageUrl }}
                ></Image>
              </Pressable>
            )}
          </View>
        </View>
      </MessageContainer>
      {imageUrl && (
        <Modal
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          visible={modalVisible}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: imageUrl }}
              style={{ flex: 1, resizeMode: "contain" }}
            ></Image>
          </View>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled(View).attrs((props) => ({
  flexDirection: props.isMyMessage ? "row-reverse" : "row",
  flex: 1,
}))`
  align-content: center;
  margin: 8px;
  margin-bottom: 0px;
`;

const Avatar = styled(Image)`
  border-radius: 25px;
  width: 32px;
  height: 32px;
  align-self: flex-end;
`;

const MessageContainer = styled(View).attrs((props) => {
  return {
    marginLeft: props.isMyMessage ? 32 : 6,
    marginRight: props.isMyMessage ? 6 : 40,
  };
})`
  align-self: flex-end;
  margin-bottom: 2px;
`;

const Message = styled(Text).attrs((props) => {
  return { textAlign: props.isMyMessage ? "right" : "left" };
})`
  background-color: ${(props) => props.theme.colors.chat.bg.secondary};
  color: ${(props) => props.theme.colors.chat.text};
  margin-top: 6px;
  border-radius: 15px;
  line-height: 24px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
`;

export default UserMessage;

const styles = StyleSheet.create({});
