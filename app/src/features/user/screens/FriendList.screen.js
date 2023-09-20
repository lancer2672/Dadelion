import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { Avatar } from "@src/components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { showMessage, hideMessage } from "react-native-flash-message";

import CustomEditText from "@src/components/CustomEditText";
import { colors } from "@src/infrastructure/theme/colors";
import { useState, useEffect } from "react";

import GenderSelection from "../components/GenderSelection.component";
import { useUpdateUserMutation } from "@src/store/slices/api/userApiSlice";
import { setIsLoading } from "@src/store/slices/appSlice";
import { useTheme } from "styled-components";
import Friend from "../components/Friend.component";

const dayjs = require("dayjs");

const FriendList = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: theme.colors.chat.bg.primary,
        flex: 1,
      }}
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
        <Heading>{t("friend")}</Heading>
        <TouchableOpacity>
          <Feather name="search" size={24} color={theme.colors.chat.text} />
        </TouchableOpacity>
      </Header>
      <Body>
        <FlatList
          data={user.friends}
          renderItem={({ item, index }) => (
            <Friend
              key={`friend-item ${index}`}
              navigation={navigation}
              friend={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Body>
    </View>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.chat.bg.secondary};
`;
const Body = styled.View`
  padding-vertical: 20px;
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;
const BackButton = styled.TouchableOpacity`
  padding-horizontal: 8px;
  padding-vertical: 4px;
`;
const SaveBtn = styled.TouchableOpacity`
  background-color: gray;
  padding: 8px;
  border-radius: 8px;
`;
const SaveBtnText = styled.Text`
  text-align: center;

  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.chat.text};
`;
const Heading = styled.Text`
  font-weight: bold;
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.black};
`;
export default FriendList;
