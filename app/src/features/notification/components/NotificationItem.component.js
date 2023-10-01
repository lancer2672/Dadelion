import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useGetPostByIdQuery } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useDeleteNotificationMutation } from "@src/store/slices/api/notificationApiSlice";
import BottomMenu from "./BottomMenu.component";

const NotificationItem = ({ notification }) => {
  //   const formattedNames = formatNamesWithAnd(names);

  const { t } = useTranslation();
  const theme = useTheme();
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  const [deleteNotification] = useDeleteNotificationMutation();
  const navigation = useNavigation();
  //get data of user created notification
  const { data, isLoading, error } = useGetPostByIdQuery(notification?.postId, {
    skip: !notification?.postId,
  });

  const navigateToGuest = () => {
    navigation.navigate("Guest", {
      guestId: notification.userIds.at(-1).userId,
    });
  };

  return (
    <TouchableOpacity
      onPress={navigateToGuest}
      onLongPress={() => {
        setBottomMenuVisible(true);
      }}
      style={{
        backgroundColor: notification.isSeen
          ? theme.colors.chat.bg.primary
          : theme.colors.chat.bg.secondary,
        padding: 12,
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
      isSeen={notification.isSeen}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={
          data
            ? { uri: data.image }
            : require("../../../../assets/imgs/DandelionIcon.png")
        }
      ></Image>

      <ContentContainer>
        <NotificationContent>{`${notification.description}  `}</NotificationContent>
        <CreatedAt>
          {commentCreatedTimeFormater(notification.createdAt)}
        </CreatedAt>
      </ContentContainer>
      <TouchableOpacity
        onPress={() => {
          setBottomMenuVisible(true);
        }}
        style={{
          paddingHorizontal: 4,
        }}
      >
        <Feather
          name="more-horizontal"
          size={24}
          color={theme.colors.chat.text}
        />
      </TouchableOpacity>
      <BottomMenu
        visible={bottomMenuVisible}
        onClose={() => {
          setBottomMenuVisible(false);
        }}
        notificationId={notification._id}
      ></BottomMenu>
    </TouchableOpacity>
  );
};

const NotificationContent = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
`;

const CreatedAt = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.5;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export default NotificationItem;
