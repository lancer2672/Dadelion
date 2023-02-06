import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";

const Avatar = styled(Image)`
  width: 40;
  height: 40;
  border-radius: 25;
`;
const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding-right: 12;
  justify-content: flex-start;
  align-items: center;
`;
const Name = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const FoundUser = ({ avatar, name }) => {
  return (
    <Container>
      <Avatar
        source={require("./../../../../assets/imgs/DefaultAvatar.png")}
      ></Avatar>
      <Spacer position={"left"} size={"medium"}></Spacer>
      <Name>{name}</Name>
    </Container>
  );
};

export default FoundUser;
