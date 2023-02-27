import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

import { ChatContext } from "../../../services/chat/chat.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Icon = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-top: 16px;
  margin-right: ${(props) => props.theme.space[2]};
`;

const LeftIconContainer = styled(View)`
  align-self: flex-start;
  flex-direction: row;
  margin-left: 4px;
`;
const InputText = styled(TextInput)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  flex: 1;
  margin-right: ${(props) => props.theme.space[2]};
`;

const InputBar = ({ channelId, setListMessage }) => {
  const { user } = useContext(AuthenticationContext);
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputWidth, setTextInputWidth] = useState(0);
  const [text, setText] = useState("");
  const { handleSendMessage } = useContext(ChatContext);
  const iconSize = 28;
  const iconColor = "black";

  //for animation
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

  const sendMessage = () => {
    handleSendMessage(channelId, user._id, text, setListMessage);
    setText("");
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
          value={text}
          onChangeText={(newText) => setText(newText)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={"Nhắn tin"}
          mode="outlined"
          outlineStyle={{
            borderRadius: 25,
          }}
          multiline
          style={{
            fontSize: 16,

            marginLeft: leftIconsVisible ? 0 : 8,
          }}
          right={
            <TextInput.Icon
              size={22}
              style={{
                padding: 0,
              }}
              icon={"send"}
              onPress={sendMessage}
            />
          }
          onLayout={(event) => {
            setTextInputWidth(event.nativeEvent.layout.width);
          }}
        />
      </Animated.View>
      <Icon>
        <AntDesign name="heart" size={24} color={iconColor} />
      </Icon>
    </Container>
  );
};
export default InputBar;
