import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@src/components/Avatar";
import FeatureTabs from "@src/features/user/components/FeatureTabs.component";
import { colors } from "@src/infrastructure/theme/colors";
import { userSelector } from "@src/store/selector";
import { useFindOrCreateChannelMutation } from "@src/store/slices/api/chatApiSlice";
import { useCheckFriendStatusQuery } from "@src/store/slices/api/friendRequestApiSlice";
import { useGetPostByUserIdQuery } from "@src/store/slices/api/postApiSlice";
import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import {
  joinChannel,
  sendFriendRequest,
  setSelectedChannel,
  unfriend,
} from "@src/store/slices/chatSlice";
import { getSocket } from "@src/utils/socket";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

const Guest = ({ props, navigation, route }) => {
  const theme = useTheme();
  const { guestId } = route.params;
  const socket = getSocket();
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [guest, setGuest] = useState({});
  const [friendStatus, setFriendStatus] = useState("");
  const { data: postData } = useGetPostByUserIdQuery(guestId);
  const [showEntireAvatar, setShowEntireAvatar] = useState(false);
  const {
    isLoading: isLoadingUser,
    isSuccess: getUserSuccess,
    data: userData,
    status,
  } = useGetUserByIdQuery(guestId);
  const {
    data,
    isLoading: isChecking,
    refetch,
  } = useCheckFriendStatusQuery(userData?._id, {
    skip: status !== "fulfilled" || !userData,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (socket) {
      socket.on("unfriend", () => {
        refetch();
      });
      socket.on(
        "response-friendRequest",
        ({ requestId, responseValue, userIds }) => {
          refetch();
        }
      );
      socket.on("send-friendRequest", (status) => {
        refetch();
      });
    }
  }, [socket]);
  const [
    findOrCreateChannel,
    { data: channelData, isSuccess, isLoading: isFindOrCreating },
  ] = useFindOrCreateChannelMutation();
  useEffect(() => {
    if (data) {
      setFriendStatus(data.data.result);
    }
  }, [isChecking, data]);

  useEffect(() => {
    if (getUserSuccess) {
      setGuest(() => userData);
    }
  }, [isLoadingUser, userData]);
  useEffect(() => {
    if (isSuccess && userData) {
      const channel = channelData.channel;
      console.log("Guest - channel", channel);
      dispatch(joinChannel({ userBId: guest._id, channelId: channel._id }));
      dispatch(setSelectedChannel({ ...channel }));
      navigation.navigate("ChatRoom");
    }
  }, [isFindOrCreating, channelData]);

  const handleSendAddFriendRequest = () => {
    dispatch(sendFriendRequest({ senderId: user._id, receiverId: guestId }));
  };
  const handleUnfriend = () => {
    dispatch(unfriend({ userId: user._id, friendId: guestId }));
  };
  const handleJoinChatRoom = () => {
    if (guest) {
      findOrCreateChannel({
        channelName: "",
        memberIds: [user._id, guest._id],
      });
    }
  };
  const showAvatar = () => {
    if (guest.avatar) {
      setShowEntireAvatar(true);
    }
  };
  const navigateToFriendListScreen = () => {
    console.log("navigate");
    navigation.navigate("FriendList", { userId: guestId });
  };
  return (
    <Container>
      <HeaderContainer>
        <Header>
          <HeaderContent>
            <TouchableOpacity>
              {/* <AntDesign name="arrowleft" size={32} color="black" /> */}
            </TouchableOpacity>
          </HeaderContent>

          <TouchableOpacity onPress={showAvatar}>
            <Avatar
              style={{ width: 110, height: 110 }}
              source={{ uri: guest.avatar }}
            ></Avatar>
          </TouchableOpacity>

          <UserDescription>
            <Name>{guest.nickname}</Name>
            {/* <Text>User description "ICON"</Text> */}
          </UserDescription>
          <View style={{ flexDirection: "row" }}>
            <StyledButton2
              onPress={() => {
                if (friendStatus === "friend") {
                  handleUnfriend();
                } else {
                  handleSendAddFriendRequest();
                }
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  color: colors.white,
                }}
              >
                {friendStatus === "friend"
                  ? t("unfriend")
                  : t(`${friendStatus}`)}
              </Text>
            </StyledButton2>
            <StyledButton1 onPress={handleJoinChatRoom}>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  color: "#9971ee",
                }}
              >
                {t("sendMessage")}
              </Text>
            </StyledButton1>
          </View>
        </Header>
        <BottomHeader>
          <ItemContainer>
            <ItemValue>{postData ? postData.length : 0}</ItemValue>
            <ItemLabel>Bài viết</ItemLabel>
          </ItemContainer>
          <ItemContainer onPress={navigateToFriendListScreen}>
            <ItemValue>{guest.friends?.length}</ItemValue>
            <ItemLabel>Bạn bè</ItemLabel>
          </ItemContainer>
        </BottomHeader>
      </HeaderContainer>

      <FeatureTabs userId={guestId}></FeatureTabs>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showEntireAvatar}
        onRequestClose={() => {
          setShowEntireAvatar(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: guest.avatar }}
          ></Image>
        </View>
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Header = styled.View`
  width: 100%;
  height: 80%;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.bg.primary};
  elevation: 5;
  padding-bottom: 24px;
  padding-top: 12px;
`;

const CameraIcon = styled.View`
  justify-content: center;
  align-items: center;
  background-color: rgba(52, 52, 52, 0.4);
  padding-bottom: 10px;
`;
const StyledButton1 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 128px;
  border-radius: 2px;
  border-width: 2px;
  border-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const StyledButton2 = styled.TouchableOpacity`
  padding-horizontal: 20px;
  margin-horizontal: 12px;
  width: 128px;
  border-radius: 2px;
  background-color: #9971ee;
  justify-content: center;
  align-items: center;
  height: 40px;
`;
const UserDescription = styled.View`
  margin-bottom: 29px;
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
`;
const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 24px;
`;
const HeaderContainer = styled.View`
  height: 360px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  width: 100%;
  background-color: #9971ee;
  elevation: 5;
`;
const BottomHeader = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const ItemValue = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ItemLabel = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.text.primary};
`;
const ItemContainer = styled.Pressable`
  align-items: center;
  margin-horizontal: 12px;
`;
export default Guest;

const styles = StyleSheet.create({});
