import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { postCreatedTimeFormatter } from "@src/utils/timeFormatter";
import { useTheme } from "styled-components";
import CallMessageItem from "./CallMessageItem.component";
import VideoMessageItem from "./VideoMessageItem.component";
import OpenImageModal from "./OpenImageModal.component";
import ImageMessageItem from "./ImageMessageItem.component";

const MessageContainer = ({ chatFriend = {}, isMyMessage, messages }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedImageList, setSelectedImageList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOpenImageFullScreen = (imageListUrl, imageUrl) => {
    setSelectedImageList(() => imageListUrl);
    setSelectedIndex(() => imageListUrl.findIndex((item) => item === imageUrl));
    if (selectedIndex != -1) {
      setModalVisible(true);
    }
  };
  console.log("messages", messages);
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
          <MessageWrapper isMyMessage={isMyMessage}>
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
                    {/* styled component */}
                    <Message isMyMessage={isMyMessage}>{item.message}</Message>
                  </>
                )}
                {item.imageUrls && (
                  <ImageMessageItem
                    handleOpenImageFullScreen={handleOpenImageFullScreen}
                    imageUrls={item.imageUrls}
                  ></ImageMessageItem>
                )}
                {item.videoUrls && item.videoUrls?.length > 0 && (
                  <VideoMessageItem message={item}></VideoMessageItem>
                )}
                {item.callHistory && item.callHistory.duration !== -1 && (
                  <CallMessageItem message={item}></CallMessageItem>
                )}
              </View>
            </View>
          </MessageWrapper>
        )}
        keyExtractor={(item) => item._id}
      />

      {selectedIndex > -1 && (
        <OpenImageModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          selectedImageList={selectedImageList}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        ></OpenImageModal>
      )}
    </Container>
  );
};

const Container = styled(View).attrs((props) => ({
  flexDirection: props.isMyMessage ? "row-reverse" : "row",
  flex: 1,
  // backgroundColor: "tomato",
}))`
  align-content: center;
  margin: 8px;
  margin-bottom: 0px;
`;

const Avatar = styled(Image)`
  border-radius: 25px;
  width: 32px;
  height: 32px;
  align-self: flex-end;
`;

const MessageWrapper = styled(View).attrs((props) => {
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

export default MessageContainer;
