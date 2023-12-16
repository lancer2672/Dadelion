import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { uploadFile } from "@src/api/upload";
import { MessageType } from "@src/constants";
import { chatSelector, userSelector } from "@src/store/selector";
import { sendMessage, typing } from "@src/store/slices/chatSlice";
import {
  createFormDataImages,
  createFormDataVideo,
} from "@src/utils/formDataHelper";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

const ICON_SIZE = 28;
const InputBar = ({ chatFriendId }) => {
  const theme = useTheme();

  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);

  const { _id: channelId } = selectedChannel;
  const [leftIconsVisible, setLeftIconVisible] = useState(true);
  const [textInputVisible, setTextInputVisible] = useState(true);
  const [trashIconVisible, setTrashIconVisible] = useState(false);
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  const [textInputWidth, setTextInputWidth] = useState(0);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const iconContainerWidth = leftIconsVisible ? 3 * ICON_SIZE + 2 * 8 : 0;
  const inputWidth = textInputWidth + iconContainerWidth;

  const animation = useRef(new Animated.Value(inputWidth)).current;

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
  const handleSendMessage = () => {
    setText("");
    dispatch(
      sendMessage({
        channelId,
        newMessage: text,
        type: MessageType.TEXT,
      })
    );
  };
  const openMediaFilePicker = (selectedType) => {
    if (selectedType == "video") {
      openVideoPicker();
    } else {
      openImagePicker();
    }
  };

  const handleBlur = () => {
    setLeftIconVisible(true);
    Animated.timing(animation, {
      toValue: inputWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const dispatchMediaMessage = (messageType, messageData) => {
    const messagePayload =
      messageType === MessageType.VIDEO
        ? { channelId, videos: messageData, type: MessageType.VIDEO }
        : { channelId, images: messageData, type: MessageType.IMAGE };

    dispatch(sendMessage(messagePayload));
  };

  const handleMediaSelection = async (options, messageType, fileProcessor) => {
    try {
      const media = await ImagePicker.openPicker(options);
      const mediaFormData = fileProcessor(media);
      const { files } = await uploadFile({
        data: mediaFormData,
        type: messageType,
      });

      const messageData = files.map((file, index) => {
        return {
          name: file.id,
          url: file.url,
        };
      });
      console.log("messageData", messageData);
      dispatchMediaMessage(messageType, messageData);
    } catch (error) {
      console.log(`Error when selecting ${messageType.toLowerCase()}:`, error);
    } finally {
      setBottomMenuVisible(false);
    }
  };

  const openCamera = () => {
    handleMediaSelection(
      { multiple: false, mediaType: "photo" },
      MessageType.IMAGE,
      createFormDataImages
    );
  };

  const openImagePicker = () => {
    handleMediaSelection(
      { multiple: true, mediaType: "photo" },
      MessageType.IMAGE,
      createFormDataImages
    );
  };

  const openVideoPicker = () => {
    handleMediaSelection(
      { mediaType: "video" },
      MessageType.VIDEO,
      createFormDataVideo
    );
  };

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
        {leftIconsVisible && (
          <LeftIconContainer>
            <Icon onPress={openCamera}>
              <EvilIcons
                name="camera"
                size={ICON_SIZE}
                color={theme.colors.text.primary}
              />
            </Icon>

            <Icon onPress={() => setBottomMenuVisible((prev) => !prev)}>
              <EvilIcons
                name="image"
                size={ICON_SIZE}
                color={theme.colors.text.primary}
              />
            </Icon>

            <Icon>
              <MaterialCommunityIcons
                name="microphone"
                size={ICON_SIZE}
                color={theme.colors.text.primary}
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
            placeholderTextColor={theme.colors.text.primary}
            style={{
              flex: 1,
              minHeight: 32,
              padding: 6,
              color: theme.colors.text.primary,
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
                backgroundColor: theme.colors.text.primary,
              }}
            >
              <View
                style={{
                  height: 12,
                  width: 100,
                  borderBottomWidth: 2,
                  marginBottom: 12,

                  borderColor: theme.colors.bg.primary,
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
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Icon = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-top: 8px;
  margin-right: ${(props) => props.theme.space[2]};
`;

const Option = styled(Pressable).attrs((props) => ({
  borderTopWidth: props.lastItem ? 0 : 1,
}))`
  background-color: ${(props) => props.theme.colors.text.primary};
  border-color: gray;
  border-top-width: 1px;
  justify-content: center;
  padding-vertical: 8px;
  width: 100%;
`;

const OptionName = styled(Text)`
  font-weight: 500;
  color: ${(props) => props.theme.colors.bg.primary};
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
