import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Spacer } from "@src/components/spacer/spacer.component";
const Avatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;
const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding-left: 12px;
  justify-content: flex-start;
  align-items: center;
`;
// background-color: #d6c9c9;
const Name = styled(Text)`
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const FoundUser = ({ navigation, userId, avatar, name }) => {
  const onSearchResultClick = () => {
    navigation.navigate("Guest", { guestId: userId });
  };
  return (
    <Container onPress={onSearchResultClick}>
      {avatar == null ? (
        <Avatar source={require("@assets/imgs/DefaultAvatar.png")}></Avatar>
      ) : (
        <Avatar source={{ uri: avatar }}></Avatar>
      )}
      <Spacer position={"left"} size={"medium"}></Spacer>
      <Name>{name}</Name>
    </Container>
  );
};

export default FoundUser;
