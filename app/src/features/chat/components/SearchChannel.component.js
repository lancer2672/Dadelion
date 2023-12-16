import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";

import { userSelector } from "@src/store/selector";
import { useGetListUserMutation } from "@src/store/slices/api/userApiSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SearchChannel = ({ channels = [], resetSearch, setChannels }) => {
  const { t } = useTranslation();
  const { user } = useSelector(userSelector);
  const [getListUser, { data: users = [], isLoading, isSuccess }] =
    useGetListUserMutation();

  useEffect(() => {
    const chatMemberIds = channels.map((c) => {
      return c.memberIds.filter((id) => id != user._id);
    });
    getListUser(chatMemberIds);
  }, [channels]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const searchTimeout = useRef();

  const search = () => {
    //find matching users
    const userResult = users.filter((user) =>
      user.nickname.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const userResultIds = userResult.map((res) => {
      return res._id;
    });
    //get channels from search result
    const channelResult = channels.filter((channel) =>
      channel.memberIds.some((id) => userResultIds.includes(id))
    );
    setChannels(channelResult);
  };

  useEffect(() => {
    if (searchKeyword.trim() == "") {
      resetSearch();
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
      <View
        style={{
          height: 52,
          width: "100%",
          marginVertical: 8,
          flexDirection: "row",
        }}
      >
        <Searchbar
          style={{ flex: 1 }}
          icon={"account-search"}
          placeholder="Tìm kiếm"
          value={searchKeyword}
          onChange={(newKeyword) => setSearchKeyword(newKeyword)}
          onChangeText={(text) => {
            setSearchKeyword((prevKeyword) => text);
          }}
          iconColor={"#bdafaf"}
        />
      </View>
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
export default SearchChannel;
