import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
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
import { chatSelector, userSelector } from "@src/store/selector";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "@src/infrastructure/theme/colors";
import { sendMessage, typing } from "@src/store/slices/chatSlice";
import { readBase64 } from "@src/utils/imageHelper";
import { useTheme } from "styled-components";
import ImagePicker from "react-native-image-crop-picker";
import { useTranslation } from "react-i18next";
import { useUploadFileMutation } from "@src/store/slices/api/uploadApi";

const InputBar = ({ chatFriendId }) => {
  const theme = useTheme();
  console.count("input bar");

  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);
  const [uploadFile, { data, isLoading, error }] = useUploadFileMutation();
  const { _id: channelId } = selectedChannel;
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputVisible, setTextInputVisible] = useState(true);
  const [trashIconVisible, setTrashIconVisible] = useState(false);
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
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
        dispatch(
          sendMessage({ channelId, imagesData: [base64String], type: "image" })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSendMessage = () => {
    setText("");
    dispatch(
      sendMessage({
        channelId,
        newMessage: text,
        type: "text",
      })
    );
  };
  useEffect(() => {
    if (data) {
      console.log("video data", data);
    }
    if ((!isLoading, data)) {
      dispatch(
        sendMessage({ channelId, videoUrls: [data.fileUrl], type: "video" })
      );
    }
  }, [isLoading, data]);
  const openMediaFilePicker = (selectedType) => {
    if (selectedType == "video") {
      openVideoPicker();
    } else {
      openImagePicker();
    }
  };
  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo",
    })
      .then((images) => {
        return Promise.all(
          images.map(async (image, index) => {
            return await readBase64(image.path);
          })
        );
      })
      .then((data) => {
        dispatch(sendMessage({ channelId, imagesData: data, type: "image" }));
      })
      .catch((er) => console.log("er", er))
      .finally(() => setBottomMenuVisible(false));
  };
  const openVideoPicker = () => {
    ImagePicker.openPicker({
      mediaType: "video",
    })
      .then((video) => {
        const videoMessage = new FormData();

        videoMessage.append("video", {
          uri: video.path,
          name: new Date() + "_profile",
          type: "video/mp4",
        });
        videoMessage.append("duration", video.duration);
        uploadFile(videoMessage);
      })
      .catch((er) => console.log("er", er))
      .finally(() => setBottomMenuVisible(false));
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

            <Icon onPress={() => setBottomMenuVisible((prev) => !prev)}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={bottomMenuVisible}
        onRequestClose={() => {
          setBottomMenuVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setBottomMenuVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: theme.colors.chat.text,
              }}
            >
              <View
                style={{
                  height: 12,
                  width: 100,
                  borderBottomWidth: 2,
                  marginBottom: 12,

                  borderColor: theme.colors.chat.bg.primary,
                }}
              ></View>

              <Option
                onPress={() => {
                  openMediaFilePicker("video");
                }}
              >
                <OptionName>Video</OptionName>
              </Option>
              <Option
                lastItem={true}
                onPress={() => {
                  openMediaFilePicker("image");
                }}
              >
                <OptionName>{t("image")}</OptionName>
              </Option>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

const Option = styled(Pressable).attrs((props) => ({
  borderTopWidth: props.lastItem ? 0 : 1,
}))`
  background-color: ${(props) => props.theme.colors.chat.text};
  border-color: gray;
  border-top-width: 1px;
  justify-content: center;
  padding-vertical: 8px;
  width: 100%;
`;

const OptionName = styled(Text)`
  font-weight: 500;
  color: ${(props) => props.theme.colors.chat.bg.primary};
  text-align: center;
  font-size: 18px;
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
