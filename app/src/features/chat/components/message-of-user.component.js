import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Container = styled(View).attrs((props) => ({
  flexDirection: props.myMessage ? "row-reverse" : "row",
  marginLeft: props.myMessage ? 0 : 8,
  marginRight: props.myMessage ? 8 : 0,
  flex: 1,
}))`
  align-content: center;
`;

const Avatar = styled(Image)`
  border-radius: 25px;
  width: 32px;
  height: 32px;
  align-self: flex-end;
`;

const MessageContainer = styled(View).attrs((props) => ({
  marginLeft: props.myMessage ? 40 : 0,
  marginRight: props.myMessage ? 0 : 40,
}))`
  margin-left: 8px;
  align-self: flex-end;
  margin-bottom: 4px;
`;

const Message = styled(Text).attrs((props) => ({}))`
  background-color: red;
  margin-top: 6px;
  border-radius: 15px;
  padding: 4px;
  padding-left: 8px;
  padding-right: 8px;
`;
const MessageWrapper = styled(View)`
  flex-direction: row;
`;

const UserMessage = ({ myMessage, messages }) => {
  return (
    <Container myMessage={myMessage}>
      <Avatar
        source={require("../../../../assets/imgs/DefaultAvatar.png")}
      ></Avatar>
      <MessageContainer>
        <MessageWrapper style={{ flexDirection: "row" }}>
          <Message>
            UserMeessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMessageUserMesssage
          </Message>
          <View style={{ flex: 1 }}></View>
        </MessageWrapper>
      </MessageContainer>
    </Container>
  );
};

export default UserMessage;

const styles = StyleSheet.create({});
