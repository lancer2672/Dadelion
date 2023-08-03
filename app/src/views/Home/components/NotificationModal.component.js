import React from "react";
import { View, Modal, TouchableOpacity, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import NotificationItem from "./NotificationItem.component";

const NotificationModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const data = [
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
      isAddFriendRequest: false,
    },
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
      isAddFriendRequest: false,
    },
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
      isAddFriendRequest: false,
    },
  ];
  //notificationSchema
  return (
    <Modal animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            borderBottomWidth: 2,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Heading>{t("notification")}</Heading>
        </View>
        <FlatList
          data={data} // Truyền danh sách tên người dùng vào FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NotificationItem notification={item} />}
        />
      </View>
    </Modal>
  );
};
const Heading = styled(Text)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
`;

export default NotificationModal;
