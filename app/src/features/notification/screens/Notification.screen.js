import { useEffect, useState } from "react";
import { View, Modal, TouchableOpacity, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import NotificationItem from "../components/NotificationItem.component";
import FriendRequestItem from "../../../views/Home/components/FriendRequestItem.component";
import { useGetFriendRequestsQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useTheme } from "styled-components";
import { useGetNotificationsQuery } from "@src/store/slices/api/notificationApiSlice";

const Notification = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data: friendRequests } = useGetFriendRequestsQuery(undefined, {
    //always make new request
    refetchOnMountOrArgChange: true,
  });

  const {
    data: notifications,
    isLoading,
    isSuccess,
  } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log("notification show", notifications);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.chat.bg.primary }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.chat.text,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={theme.colors.chat.text}
          />
        </TouchableOpacity>
        <Heading>{t("notification")}</Heading>
      </View>
      <View>
        <FlatList
          item
          data={friendRequests}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => <FriendRequestItem friendRequest={item} />}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={notifications}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => <NotificationItem notification={item} />}
      />
    </View>
  );
};
const Heading = styled(Text)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.chat.text};
`;

export default Notification;
