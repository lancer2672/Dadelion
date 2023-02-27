import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled(View).attrs((props) => ({
  flexDirection: props.myMessage ? "row-reverse" : "row",

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
    marginLeft: props.myMessage ? 32 : 6,
    marginRight: props.myMessage ? 6 : 40,
  };
})`
  align-self: flex-end;
  margin-bottom: 2px;
`;

const Message = styled(Text).attrs((props) => {
  return { textAlign: props.myMessage ? "right" : "left" };
})`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-top: 6px;
  border-radius: 15px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
`;

const UserMessage = ({ myMessage, messageBox }) => {
  return (
    <Container myMessage={myMessage}>
      {!myMessage && (
        <>
          <Avatar
            source={require("../../../../assets/imgs/DefaultAvatar.png")}
          ></Avatar>
        </>
      )}
      <MessageContainer myMessage={myMessage}>
        {messageBox.map((item, index) => {
          const id = item._id;
          return (
            <>
              <View key={id} style={{ flexDirection: "row" }}>
                {myMessage && <View style={{ flex: 1 }}></View>}
                <Message myMessage={myMessage}>{item.message}</Message>
              </View>
            </>
          );
        })}
      </MessageContainer>
    </Container>
  );
};

export default UserMessage;

const styles = StyleSheet.create({});
