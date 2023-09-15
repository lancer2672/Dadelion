import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  EvilIcons,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { launchCameraAsync } from "expo-image-picker";
import { userSelector } from "@src/store/selector";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "@src/infrastructure/theme/colors";
import { sendImage, sendMessage, typing } from "@src/store/slices/chatSlice";
import { readBase64 } from "@src/utils/imageHelper";
import { useTheme } from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
const InputBar = ({ channelId, chatFriendId }) => {
  const theme = useTheme();
  const { user } = useSelector(userSelector);
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputVisible, setTextInputVisible] = useState(true);
  const [trashIconVisible, setTrashIconVisible] = useState(false);
  const [textInputWidth, setTextInputWidth] = useState(0);
  const [photoUri, setPhotoUri] = useState(null);
  const [text, setText] = useState("");
  const iconSize = 28;
  const dispatch = useDispatch();
  const iconContainerWidth = leftIconsVisible ? 3 * iconSize + 2 * 8 : 0;
  const inputWidth = textInputWidth + iconContainerWidth;
  const animation = new Animated.Value(inputWidth);

  useEffect(() => {
    if (text.trim() != "") {
      dispatch(typing({ channelId, chatFriendId, isTyping: true }));
    } else {
      dispatch(typing({ channelId, chatFriendId, isTyping: false }));
    }
  }, [text]);
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
      const result = await launchCameraAsync();
      if (!result.canceled) {
        console.log("handleOpenCamera", result.assets[0]);
        const base64String = await readBase64(result.assets[0].uri);
        dispatch(sendImage({ channelId, imagesData: [base64String] }));
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
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
    })
      .then((images) => {
        console.log("images", images);
        return Promise.all(
          images.map(async (image, index) => {
            return await readBase64(image.path);
          })
        );
      })
      .then((data) => {
        dispatch(sendImage({ channelId, imagesData: data }));
      })
      .catch((er) => console.log("er", er));
  };
  const recordVoice = () => {};
  return (
    <Container>
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: animation,
          flex: 1,
        }}
      >
        {/* <TouchableOpacity style={{ marginLeft: 4 }}>
          <Feather name="trash" size={24} color={theme.colors.chat.text} />
        </TouchableOpacity> */}
        {leftIconsVisible && (
          <LeftIconContainer>
            <Icon onPress={handleOpenCamera}>
              <EvilIcons
                name="camera"
                size={iconSize}
                color={theme.colors.chat.text}
              />
            </Icon>

            <Icon onPress={openImagePicker}>
              <EvilIcons
                name="image"
                size={iconSize}
                color={theme.colors.chat.text}
              />
            </Icon>

            <Icon>
              <MaterialCommunityIcons
                name="microphone"
                size={iconSize}
                color={theme.colors.chat.text}
              />
            </Icon>
          </LeftIconContainer>
        )}
        {textInputVisible && (
          <TextInput
            value={text}
            onChangeText={(newText) => setText(newText)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={"Nhắn tin"}
            placeholderTextColor={theme.colors.chat.text}
            style={{
              flex: 1,
              minHeight: 32,
              padding: 6,
              color: theme.colors.chat.text,
              marginHorizontal: 12,
            }}
            multiline
            onLayout={(event) => {
              setTextInputWidth(event.nativeEvent.layout.width);
            }}
          />
        )}
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
