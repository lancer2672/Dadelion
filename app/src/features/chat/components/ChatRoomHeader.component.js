import React, { memo } from "react";
import styled from "styled-components/native";
import { Ionicons, FontAwesome, Entypo, Feather } from "@expo/vector-icons";
import { Avatar } from "../../../components/Avatar";
import { TouchableOpacity, View } from "react-native";
import { colors } from "@src/infrastructure/theme/colors";

const ChatRoomHeader = ({ navigation, chatFriend = {} }) => {
  return (
    <Container>
      <BackIcon onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color="black" />
      </BackIcon>

      <TouchableOpacity>
        <Avatar width={40} height={40} />
      </TouchableOpacity>

      <HeaderInfo>
        <HeaderText>{chatFriend.nickname}</HeaderText>
        <View style={{ flexDirection: "row" }}>
          <Entypo
            style={{ position: "absolute", left: "-10%", top: "-30%" }}
            name="dot-single"
            size={32}
            color="green"
          />
          <StatusText>Đang hoạt động</StatusText>
        </View>
      </HeaderInfo>
      <TouchableOpacity style={{ padding: 4 }}>
        <FontAwesome name="video-camera" size={24} color={colors.chat.text} />
      </TouchableOpacity>

      <TouchableOpacity style={{ marginLeft: 8, marginRight: 8, padding: 4 }}>
        <Feather name="more-vertical" size={24} color={colors.chat.text} />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  background-color: white;
  padding-bottom: 12;
  elevation: 4;
`;

const BackIcon = styled.TouchableOpacity`
  margin-left: 12px;
  margin-right: 12px;
`;

const HeaderInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const HeaderText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: bold;
`;

const StatusText = styled.Text`
  font-size: 14px;
  margin-left: 4px;
`;

export default memo(ChatRoomHeader);
