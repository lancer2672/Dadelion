import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import styled from "styled-components/native";

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
const Avatar = styled(Image)`
  border-radius: 25px;
  width: 50px;
  height: 50px;
`;
const LastMessage = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
`;
const Channel = () => {
  return (
    <Container>
      <Avatar
        source={require("./../../../../assets/imgs/DefaultAvatar.png")}
      ></Avatar>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Name>Tran Quoc khanh</Name>
        <LastMessage>AElkasdvlkjxzc;vjz</LastMessage>
      </View>
    </Container>
  );
};

export default Channel;

const styles = StyleSheet.create({});
