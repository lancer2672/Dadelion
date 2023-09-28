import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";

import { Avatar } from "@src/components/Avatar";
import { formatNamesWithAnd } from "@src/utils/textFormatter";
import { useTranslation } from "react-i18next";
import { colors } from "@src/infrastructure/theme/colors";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { Spacer } from "@src/components/spacer/spacer.component";
import { commentCreatedTimeFormater } from "@src/utils/timeFormatter";
import { useGetPostByIdQuery } from "@src/store/slices/api/postApiSlice";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";

const NotificationItem = ({ notification }) => {
  //   const formattedNames = formatNamesWithAnd(names);
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  //get data of user created notification
  const { data, isLoading, error } = useGetPostByIdQuery(notification?.postId, {
    skip: !notification?.postId,
  });
  console.log("das", data);
  console.log("error", error);
  console.log("  notification?.postId", notification?.postId);

  const navigateToGuest = () => {
    navigation.navigate("Guest", {
      guestId: notification.userIds.at(-1).userId,
    });
  };
  return (
    <TouchableOpacity
      onPress={navigateToGuest}
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
