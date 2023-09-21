import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { Entypo, Feather } from "@expo/vector-icons";
import { mediaFileStoragePermission } from "@src/permissions";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { showMessage } from "react-native-flash-message";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import CallMessageItem from "./CallMessageItem.component";
import VideoMessageItem from "./VideoMessageItem.component";
const UserMessage = ({
  chatFriend = {},
  isMyMessage,
  messages,
  handleShowDialog,
}) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [selectedImageList, setSelectedImageList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handlePressLeft = () => {
    setSelectedIndex(
      selectedIndex - 1 < 0 ? selectedImageList.length - 1 : selectedIndex - 1
    );
    setSelectedImageUrl(selectedImageList[selectedIndex]);
  };
  const handlePressRight = () => {
    setSelectedIndex(
      selectedIndex + 1 >= selectedImageList.length ? 0 : selectedIndex + 1
    );
    setSelectedImageUrl(selectedImageList[selectedIndex]);
  };
  const handleOpenImageFullScreen = (imageListUrl, imageUrl) => {
    setSelectedImageList(() => imageListUrl);
    setSelectedImageUrl(() => imageUrl);
    if (selectedImageUrl != null) {
      setModalVisible(true);
    }
  };
  const handleDownloadImage = async (imageUrl) => {
    if (Platform.OS === "android" && (await mediaFileStoragePermission())) {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: "png",
      })
        .fetch("GET", imageUrl)
        .then((res) => {
          return CameraRoll.save(res.path());
        })
        .then((uri) => {
          showMessage({
            message: t("success"),
            type: "success",
          });
        })
        .catch((error) => {
          showMessage({
            message: t("failed"),
            type: "alert",
          });
          console.error(error);
        });
    }
  };
  return (
    <Container isMyMessage={isMyMessage}>
      {!isMyMessage && (
        <>
          {chatFriend.avatar ? (
            <Avatar source={{ uri: chatFriend.avatar }}></Avatar>
          ) : (
            <Avatar source={require("@assets/imgs/DefaultAvatar.png")}></Avatar>
          )}
        </>
      )}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageContainer isMyMessage={isMyMessage}>
            {item.timeMarker && (
              <Text
                style={{
                  flex: 1,
                  color: theme.colors.chat.text,
                  textAlign: "center",
                }}
              >
                {postCreatedTimeFormatter(item.createdAt)}
              </Text>
            )}
            <View style={{ flexDirection: "row" }}>
              {isMyMessage && <View style={{ flex: 1 }}></View>}
              <View>
                {item.message && (
                  <>
                    <Message isMyMessage={isMyMessage}>{item.message}</Message>
                  </>
                )}
                {item.imageUrls && item.imageUrls?.length > 0 && (
                  <View style={{ flexDirection: "row" }}>
                    {item.imageUrls.map((imageUrl, index) => {
                      if (
                        index == 0 ||
                        (index == 1 && item.imageUrls.length <= 2)
                      ) {
                        return (
                          <ImageContainer
                            key={`chat-image` + index}
                            onPress={() =>
                              handleOpenImageFullScreen(
                                item.imageUrls,
                                imageUrl
                              )
                            }
                          >
                            <Image
                              style={{
                                flex: 1,
                              }}
                              resizeMode="cover"
                              source={{ uri: imageUrl }}
                            ></Image>
                          </ImageContainer>
                        );
                      } else if (index == 1 && item.imageUrls.length > 2) {
                        return (
                          <ImageContainer
                            key={`chat-image` + index}
                            onPress={() =>
                              handleOpenImageFullScreen(
                                item.imageUrls,
                                imageUrl
                              )
                            }
                          >
                            <Image
                              style={{
                                flex: 1,
                              }}
                              resizeMode="cover"
                              source={{ uri: imageUrl }}
                            ></Image>
                            <ImageOverlay>
                              <Text
                                style={{
                                  fontSize: 28,
                                  fontWeight: 500,
                                  color: "white",
                                }}
                              >
                                {item.imageUrls.length - 1}
                              </Text>
                            </ImageOverlay>
                          </ImageContainer>
                        );
                      }
                    })}
                  </View>
                )}
                {item.videoUrls && item.videoUrls?.length > 0 && (
                  <VideoMessageItem message={item}></VideoMessageItem>
                )}
                {item.callHistory && item.callHistory.duration !== -1 && (
                  <CallMessageItem message={item}></CallMessageItem>
                )}
              </View>
            </View>
          </MessageContainer>
        )}
        keyExtractor={(item) => item._id}
      />

      <Modal
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
      >
        <ImageBackground
          source={{ uri: selectedImageUrl }}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={() => handleDownloadImage(selectedImageUrl)}
            style={{ position: "absolute", top: 16, right: 16, padding: 12 }}
          >
            <Feather name="download" size={40} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressLeft} style={{ padding: 24 }}>
            <Entypo name="chevron-left" size={40} color="gray" />
          </TouchableOpacity>
          <View
            style={{
              height: 80,
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(52, 52, 52, 0.5)",
              paddingVertical: 8,
            }}
          >
            <FlatList
              data={selectedImageList}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelectedImageUrl(() => item);
                    }}
                  >
                    <Image
                      key={`list-image-item` + index}
                      style={{ width: 80, height: 72, marginHorizontal: 8 }}
                      resizeMode="cover"
                      source={{ uri: item }}
                      title={item.title}
                    />
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item}
            />
          </View>
          <TouchableOpacity onPress={handlePressRight} style={{ padding: 24 }}>
            <Entypo name="chevron-right" size={40} color="gray" />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    </Container>
  );
};

const Container = styled(View).attrs((props) => ({
  flexDirection: props.isMyMessage ? "row-reverse" : "row",
  flex: 1,
}))`
  align-content: center;
  margin: 8px;
  margin-bottom: 0px;
`;

const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(52, 52, 52, 0.5);
  bottom: 0;
  justify-content: center;
  align-items: center;
`;
const Avatar = styled(Image)`
  border-radius: 25px;
  width: 32px;
  height: 32px;
  align-self: flex-end;
`;

const MessageContainer = styled(View).attrs((props) => {
  return {
    marginLeft: props.isMyMessage ? 32 : 6,
    marginRight: props.isMyMessage ? 6 : 40,
  };
})`
  margin-bottom: 2px;
`;

const Message = styled(Text).attrs((props) => {
  return { textAlign: props.isMyMessage ? "right" : "left" };
})`
  background-color: ${(props) => props.theme.colors.chat.bg.secondary};
  color: ${(props) => props.theme.colors.chat.text};
  margin-top: 6px;
  border-radius: 15px;
  line-height: 24px;
  padding: 6px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
`;
const ImageContainer = styled(Pressable)`
  border-radius: 20px;
  margin-top: 12px;
  margin-right: 12px;
  width: 140px;
  overflow: hidden;
  height: 180px;
`;
export default UserMessage;

const styles = StyleSheet.create({});
