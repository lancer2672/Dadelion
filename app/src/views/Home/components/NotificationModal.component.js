import { useEffect, useState } from "react";
import { View, Modal, TouchableOpacity, Text, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import NotificationItem from "./NotificationItem.component";
import FriendRequestItem from "./FriendRequestItem.component";
import { useGetFriendRequestsQuery } from "@src/store/slices/api/friendRequestApiSlice";

const NotificationModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const [friendRequests, setFriendRequests] = useState([]);
  const { data, isLoading, isSuccess } = useGetFriendRequestsQuery();
  useEffect(() => {
    if (isSuccess) {
      setFriendRequests(data.data.requests);
    }
  }, [isLoading, data]);
  const data1 = [
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
    },
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
    },
    {
      userId: "64b4eef936b29d10c1fc7335",
      content: "đã thích bài viết của bạn đã thích bài viết của bạn",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
      isSeen: false,
    },
  ];
  const fr = [
    {
      _id: " 123",
      sender: "64b4eef936b29d10c1fc7335",
      receiver: "64b4eef936b29d10c1fc7335",
      status: "pending",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
    },
    {
      _id: " 123",
      sender: "64b4eef936b29d10c1fc7335",
      receiver: "64b4eef936b29d10c1fc7335",
      status: "pending",
      createdAt: new Date("2023-07-17T07:34:17.229+00:00"),
    },
  ];
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
        <View>
          <FlatList
            item
            data={friendRequests}
            keyExtractor={(item, index) => item._id.toString()}
            renderItem={({ item }) => (
              <FriendRequestItem friendRequest={item} />
            )}
          />
        </View>
        {/* <FlatList
          style={{ backgroundColor: "red", flex: 1 }}
          data={data1} 
          keyExtractor={(item, index) => item._id.toString()}
          renderItem={({ item }) => <NotificationItem notification={item} />}
        /> */}
      </View>
    </Modal>
  );
};
const Heading = styled(Text)`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.black};
`;

export default NotificationModal;
