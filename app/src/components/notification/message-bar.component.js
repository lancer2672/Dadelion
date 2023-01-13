import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

const Container = styled(View)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  top: 0px;
  left: 100px;
  z-index: 1;
`;
// #8885de

const DandelionPetal = styled.Image.attrs(() => ({
  source: require("../../../assets/DandelionPetal.png"),
}))`
  resize-mode: contain;
  width: 120px;
  height: 120px;
  position: absolute;
  top: -40px;
`;
const Message = styled.Text`
  margin-left: 100px;
  margin-right: 100px;
  color: ${(props) => props.theme.colors.text.quaternary};
  color: #5c8de0;
  line-height: 40px;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
`;

const LinearBackground = styled(LinearGradient).attrs(() => ({
  colors: ["#c597d7", "#f0c7e0"],
  start: [0.0, 0.5],
  end: [1.0, 0.5],
  locations: [0.0, 0.8],
}))`
  border-radius: 25px;
  height: 40px;
`;
export const MessageBar = ({ message }) => {
  const [position, setPosition] = useState(new Animated.Value(1000));
  const [opacity, setOpacity] = useState(new Animated.Value(0.2));
  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 6000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const disappear = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.View
      style={{
        zIndex: 1,
        transform: [{ translateX: position }],
        opacity: opacity,
      }}
    >
      <Container>
        <TouchableOpacity onPress={() => disappear()}>
          <LinearBackground>
            <Message>{message} </Message>
          </LinearBackground>
          <DandelionPetal></DandelionPetal>
        </TouchableOpacity>
      </Container>
    </Animated.View>
  );
};
