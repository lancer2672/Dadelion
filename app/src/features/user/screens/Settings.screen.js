import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AntDesign, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import i18next from "i18next";
import * as Animatable from "react-native-animatable";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";

import SettingItem from "../components/SettingItem.component";
import { Avatar } from "@src/components/Avatar";
import { logoutUser } from "@src/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { ThemeContext } from "../../../../App";
import LanguageSelection from "../components/LanguageSelection.component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const openDeviceSetting = () => {
    Linking.openSettings();
  };

  const viewRef = React.useRef(null);
  const data = [
    {
      name: t("language"),
      icon: "globe",
      iconColor: "#fca312",
      backgroundIconColor: "#ffdba1",
      selectionName: t(i18next.language),
      onClick: () => {
        setShowLanguageSelection(true);
      },
    },
    {
      name: t("notifications"),
      icon: "bell",
      iconColor: "#3da9fc",

      backgroundIconColor: "#a3d3f7",

      onClick: openDeviceSetting,
    },
    {
      name: t("darkmode"),
      icon: "moon",
      iconColor: "#8024c7",
      backgroundIconColor: "#ae9bbd",
      isToggleMode: true,
      defaultSwitchValue: isDarkTheme,
      onClick: async () => {
        setIsDarkTheme((prev) => !prev);
        viewRef.current.animate({ 0: { opacity: 0.65 }, 1: { opacity: 1 } });
        await AsyncStorage.setItem("AppTheme", !isDarkTheme ? "dark" : "light");
      },
    },
  ];
  return (
    <Container>
      <Animatable.View
        useNativeDriver={true}
        style={{ flex: 1 }}
        ref={viewRef}
        easing={"ease-in-out"}
      >
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={theme.colors.chat.text}
            />
          </BackButton>
          <Heading>{t("settings")}</Heading>
        </Header>

        <Body>
          <SettingCategory>{t("account")}</SettingCategory>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar uri={user.avatar} width={50} height={50}></Avatar>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={{ color: theme.colors.chat.text, fontSize: 18 }}>
                {user.nickname}
              </Text>
              <Text style={{ color: theme.colors.chat.text }}>
                {t("personalInfo")}
              </Text>
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
      </Animatable.View>

      <LanguageSelection
        setAppLanguage={async (value) => {
          i18next.changeLanguage(value);
          await AsyncStorage.setItem("Language", value);
        }}
        currentLanguage={i18next.language}
        visible={showLanguageSelection}
        onClose={() => {
          setShowLanguageSelection(false);
        }}
      ></LanguageSelection>
    </Container>
  );
};

const Container = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
  flex: 1;
`;
const Body = styled.View`
  flex: 1;
`;
const SettingCategory = styled.Text`
  margin-top: 20px;

  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.chat.text};
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
  color: ${(props) => props.theme.colors.chat.text};
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
