import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import React from "react";
import { Avatar } from "@src/features/post/shared-components";

const Container = styled(TouchableOpacity)`
  width: 50px;
  height: 70px;
  justify-content: center;
  align-items; center;
`;
// font-size: ${(props) => props.theme.fontSizes.label};
// font-size: ${(props) => props.theme.fontWeights.medium};
const Name = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const AvtWithName = ({ avatar, name }) => {
  return (
    <Container>
      <Avatar
        source={require("./../../../../assets/imgs/DefaultAvatar.png")}
      ></Avatar>
      <Name>{name}</Name>
    </Container>
  );
};

export default AvtWithName;
