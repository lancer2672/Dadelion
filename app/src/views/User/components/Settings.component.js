import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { AntDesign, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import SettingItem from "./SettingItem.component";
import { Avatar } from "@src/components/Avatar";
import { logoutUser } from "@src/store/slices/userSlice";
import { useDispatch } from "react-redux";

const Settings = ({ visible, onClose, user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("click");

    dispatch(logoutUser());
  };
  const onClick = ({ selection }) => {
    console.log("click");
  };
  const data = [
    {
      name: t("language"),
      icon: "globe",
      iconColor: "#fca312",
      backgroundIconColor: "#ffdba1",
      selectionName: "Tiếng Việt",
      onClick,
    },
    {
      name: t("notifications"),
      icon: "bell",
      iconColor: "#3da9fc",
      backgroundIconColor: "#a3d3f7",
      onClick,
    },
    {
      name: t("darkmode"),
      icon: "moon",
      iconColor: "#8024c7",
      backgroundIconColor: "#ae9bbd",
      isToggleMode: true,

      onClick,
    },
  ];
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <Container>
        <Header>
          <BackButton onPress={onClose}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </BackButton>
          <Heading>{t("settings")}</Heading>
        </Header>

        <Body>
          <SettingCategory>{t("account")}</SettingCategory>
          <TouchableOpacity
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar uri={user.avatar} width={50} height={50}></Avatar>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text>{user.nickname}</Text>
              <Text>{t("personalInfo")}</Text>
            </View>
            <IconContainer>
              <Entypo name="chevron-right" size={24} color="white" />
            </IconContainer>
          </TouchableOpacity>

          <SettingCategory>{t("settings")}</SettingCategory>
          <FlatList
            data={data}
            renderItem={({ item }) => <SettingItem {...item} />}
            keyExtractor={(item) => item.name}
          />
        </Body>
        <LogoutButton onPress={handleLogout}>
          <LogoutText>{t("logout")}</LogoutText>
        </LogoutButton>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  padding: 20px;
  flex: 1;
`;
const Body = styled.View`
  flex: 1;
`;
const SettingCategory = styled.Text`
  margin-top: 20px;
  font-size: ${(props) => props.theme.fontSizes.large};
`;
const LogoutButton = styled.TouchableOpacity`
  border-radius: 4px;
  padding-vertical: 4px;
  background-color: gray;
`;
const IconContainer = styled.View`
  border-radius: 8px;
  background-color: gray;
  padding: 8px;
  margin-left: 12px;
`;
const LogoutText = styled.Text`
  text-align: center;
  padding-vertical: 4px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.large};
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  padding-horizontal: 8px;
  padding-vertical: 4px;
`;

const Heading = styled.Text`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.black};
`;

export default Settings;
