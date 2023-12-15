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

import { Avatar } from "@src/components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllFriendsQuery } from "@src/store/slices/api/userApiSlice";
import { useTheme } from "styled-components";
import Friend from "../components/Friend.component";
import { useRoute } from "@react-navigation/native";

const dayjs = require("dayjs");

const FriendList = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLoading, data } = useGetAllFriendsQuery();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: theme.colors.bg.primary,
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
            color={theme.colors.text.primary}
          />
        </BackButton>
        <Heading>{t("friend")}</Heading>
        <TouchableOpacity>
          <Feather name="search" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </Header>
      <Body>
        <FlatList
          data={data || []}
          renderItem={({ item, index }) => (
            <Friend
              key={`friend-item ${index}`}
              navigation={navigation}
              friend={item}
            />
          )}
          keyExtractor={(item, index) => `item.id, ${index}`}
        />
      </Body>
    </View>
  );
};

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const Body = styled.View`
  padding-vertical: 20px;
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.bg.primary};
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
  color: ${(props) => props.theme.colors.text.primary};
`;
const Heading = styled.Text`
  font-weight: bold;
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.text.primary};
`;
export default FriendList;
