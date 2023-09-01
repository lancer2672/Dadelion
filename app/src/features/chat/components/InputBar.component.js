import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import {
  EvilIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { userSelector } from "@src/store/selector";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "@src/infrastructure/theme/colors";
import { sendImage, sendMessage } from "@src/store/slices/chatSlice";
import { readBase64 } from "@src/utils/imageHelper";

const InputBar = ({ channelId }) => {
  const { user } = useSelector(userSelector);
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputWidth, setTextInputWidth] = useState(0);
  const [photoUri, setPhotoUri] = useState(null);
  const [text, setText] = useState("");
  const iconSize = 28;
  const iconColor = "black";
  const dispatch = useDispatch();

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
  const handleOpenCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        const base64String = await readBase64(result.assets[0].uri);
        dispatch(
          sendImage({ channelId, senderId: user._id, imageData: base64String })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = () => {
    setText("");
    dispatch(sendMessage({ channelId, senderId: user._id, newMessage: text }));
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        selectionLimit: 5, // Set the maximum number of images the user can select
      });
      if (!result.canceled) {
        const base64String = await readBase64(result.assets[0].uri);
        dispatch(
          sendImage({ channelId, userId: user._id, imageData: base64String })
        );
      }
    } catch (err) {
      console.log(err);
    }
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
            <TouchableOpacity onPress={handleOpenCamera}>
              <Icon>
                <EvilIcons name="camera" size={iconSize} color={iconColor} />
              </Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={openImagePicker}>
              <Icon>
                <EvilIcons name="image" size={iconSize} color={iconColor} />
              </Icon>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon>
                <MaterialCommunityIcons
                  name="microphone"
                  size={iconSize}
                  color={iconColor}
                />
              </Icon>
            </TouchableOpacity>
          </LeftIconContainer>
        )}

        <TextInput
          value={text}
          onChangeText={(newText) => setText(newText)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={"Nhắn tin"}
          style={{
            flex: 1,
            minHeight: 32,
            padding: 6,
            marginHorizontal: 12,
          }}
          multiline
          onLayout={(event) => {
            setTextInputWidth(event.nativeEvent.layout.width);
          }}
        />
      </Animated.View>
      <TouchableOpacity
        onPress={handleSendMessage}
        style={{
          padding: 12,
          backgroundColor: "white",
          borderRadius: 25,
          elevation: 2,
        }}
      >
        <Ionicons name="send" size={20} color="black" />
      </TouchableOpacity>
    </Container>
  );
};
const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 6px;
  border-radius: 40px;
  margin-horizontal: 12px;
  margin-vertical: 16px;
  background-color: ${(props) => props.theme.colors.chat.bg.secondary};
`;

const Icon = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-top: 8px;
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

export default InputBar;
