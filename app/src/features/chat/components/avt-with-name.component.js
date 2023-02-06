import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import React from "react";

const Container = styled(TouchableOpacity)`
  width: 50;
  height: 70;
  justify-content: center;
  align-items; center;
`;
// font-size: ${(props) => props.theme.fontSizes.label};
// font-size: ${(props) => props.theme.fontWeights.medium};
const Name = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;
const Avatar = styled(Image)`
  border-radius: 25;
  width: 50;
  height: 50;
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

const styles = StyleSheet.create({});
