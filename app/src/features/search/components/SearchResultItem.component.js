import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Spacer } from "@src/components/spacer/spacer.component";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import {
  useAddUserToSearchHistoryMutation,
  useRemoveUserFromSearchHistoryMutation,
} from "@src/store/slices/api/userApiSlice";
import { Avatar } from "@src/components/Avatar";

const SearchResultItem = ({ navigation, user, isFriend }) => {
  const theme = useTheme();
  const [addUserToSearchHistory] = useAddUserToSearchHistoryMutation();
  const [removeUserFromSearchHistory] =
    useRemoveUserFromSearchHistoryMutation();

  const onSearchResultClick = () => {
    addUserToSearchHistory(user._id);
    navigation.navigate("Guest", { guestId: user._id });
  };
  const deleteSearchHistory = () => {
    removeUserFromSearchHistory(user._id);
  };
  return (
    <Container onPress={onSearchResultClick}>
      <Avatar
        style={{ width: 40, height: 40 }}
        source={{ uri: user.avatar }}
      ></Avatar>

      <Spacer position={"left"} size={"medium"}></Spacer>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Name>{user.nickname}</Name>
            {isFriend && (
              <FontAwesome5
                name="user-friends"
                size={16}
                color={theme.colors.text.primary}
              />
            )}
          </View>
          <TouchableOpacity
            style={{ padding: 4 }}
            onPress={deleteSearchHistory}
          >
            <AntDesign
              name="close"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        </View>
        <Email>{user.email}</Email>
      </View>
    </Container>
  );
};
const Container = styled(TouchableOpacity)`
  flex-direction: row;
  padding-left: 12px;
  justify-content: flex-start;
  align-items: center;
  margin-vertical: 4px;
  padding-vertical: 8px;
`;
// background-color: #d6c9c9;
const Name = styled(Text)`
  margin-right: 12px;
  font-size: ${(props) => props.theme.fontSizes.large};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;
const Email = styled(Text)`
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.medium};
  opacity: 0.7;
  color: ${(props) => props.theme.colors.text.primary};
`;
export default SearchResultItem;
