import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Icon = styled(TouchableOpacity)`
  background-color: red;
  margin-right: ${(props) => props.theme.space[2]};
`;

const LeftIconContainer = styled(View)`
  flex-direction: row;
`;
const InputText = styled(TextInput)`
  background-color: red;
  padding: 0px;
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
`;

const InputBar = () => {
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputWidth, setTextInputWidth] = useState(0);
  const iconSize = 32;
  const iconColor = "black";
  const iconContainerWidth = leftIconsVisible ? 3 * iconSize + 2 * 8 : 0;
  const inputWidth = textInputWidth + iconContainerWidth;
  const animation = new Animated.Value(inputWidth);

  const handleFocus = () => {
    setLeftIconVisible(false);
    Animated.timing(animation, {
      toValue: textInputWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setLeftIconVisible(true);
    Animated.timing(animation, {
      toValue: inputWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container>
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: animation,
          flex: 1,
        }}
      >
        {leftIconsVisible && (
          <LeftIconContainer>
            <Icon>
              <EvilIcons name="camera" size={iconSize} color={iconColor} />
            </Icon>
            <Icon>
              <EvilIcons name="image" size={iconSize} color={iconColor} />
            </Icon>
            <Icon>
              <MaterialCommunityIcons
                name="microphone"
                size={iconSize}
                color={iconColor}
              />
            </Icon>
          </LeftIconContainer>
        )}
        <InputText
          onFocus={handleFocus}
          onBlur={handleBlur}
          mode="outlined"
          outlineStyle={{
            borderRadius: 25,
          }}
          right={
            <TextInput.Icon
              size={24}
              style={{
                marginRight: 0,
                fontSize: 12,
              }}
              icon={"send"}
            />
          }
          onLayout={(event) => {
            setTextInputWidth(event.nativeEvent.layout.width);
          }}
        />
      </Animated.View>
      <Icon>
        <AntDesign name="heart" size={24} color="black" />
      </Icon>
    </Container>
  );
};
export default InputBar;
