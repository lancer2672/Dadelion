import { Text, View, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";

import { useTranslation } from "react-i18next";

const SearchChannel = ({
  listUser,
  channels,
  resetSearchData,
  setChannelIdsResult,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const searchTimeout = useRef();

  const search = () => {
    const userResult = listUser.filter((user) =>
      user.nickname.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    console.log("userResult", userResult);
    const userResultIds = userResult.map((res) => {
      return res._id;
    });
    console.log("userResultIds", userResultIds);
    const channelResult = channels.filter((channel) =>
      channel.memberIds.some((id) => userResultIds.includes(id))
    );
    const channelResultIds = channelResult.map((channel) => channel._id);
    setChannelIdsResult(channelResultIds);
    console.log("channelResult", channelResult);
    console.log("channelResultIds", channelResultIds);
  };
  useEffect(() => {
    if (searchKeyword.trim() == "") {
      resetSearchData();
    } else {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        search();
      }, 400);
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchKeyword]);
  return (
    <SearchContainer>
      <Searchbar
        icon={"account-search"}
        placeholder="Tìm kiếm"
        value={searchKeyword}
        onChange={(newKeyword) => setSearchKeyword(newKeyword)}
        onIconPress={() => console.log("press")}
        onChangeText={(text) => {
          setSearchKeyword((prevKeyword) => text);
        }}
        iconColor={"#bdafaf"}
      />
      <Snackbar
        visible={snackbarVisible}
        duration={1000}
        onDismiss={() => setSnackbarVisible(false)}
        style={{
          backgroundColor: "#e3d8d8",
          position: "absolute",
          top: 0,
          right: -16,
          left: 0,
          zIndex: 1,
        }}
      >
        <View>
          <Text>{t("notFoundUser")}</Text>
        </View>
      </Snackbar>
      {isSearching && <ActivityIndicator size="small" color="#0000ff" />}
    </SearchContainer>
  );
};

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;
export default SearchChannel;
