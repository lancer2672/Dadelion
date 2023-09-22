import { Text, View, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";

import { useTranslation } from "react-i18next";
import {
  useGetSearchHistoryQuery,
  useSearchUserQuery,
  userApi,
} from "@src/store/slices/api/userApiSlice";
import { useTheme } from "styled-components";
import SearchResultItem from "../components/SearchResultItem.component";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";

const Search = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [isTyping, setIstyping] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { data: searchHistoryList } = useGetSearchHistoryQuery();
  const searchTimeout = useRef();
  const { data, isLoading } = useSearchUserQuery(searchKeyword, {
    skip: isTyping,
  });
  console.log("searchHistoryList", searchHistoryList);
  useEffect(() => {
    setIsSearching(isLoading);
    setSearchResult(data);
  }, [isLoading, data]);
  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setIstyping(true);
      setSearchResult([]);
    } else {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        setIstyping(false);
      }, 400);
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchKeyword]);
  return (
    <SearchContainer>
      <Searchbar
        autoFocus={true}
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
      {isSearching && (
        <ActivityIndicator
          style={{ marginTop: 12 }}
          size="small"
          color={theme.colors.chat.text}
        />
      )}

      {searchKeyword === "" && searchHistoryList && (
        <>
          <Text style={{ fontSize: 16 }}>{t("searchHistory")}</Text>
          <FlatList
            style
            data={searchHistoryList}
            renderItem={({ item }) => {
              const isFriend = user.friends.some(
                (friend) => friend.userId == item._id
              );
              return (
                <SearchResultItem
                  isFriend={isFriend}
                  navigation={navigation}
                  user={item}
                />
              );
            }}
            keyExtractor={(item) => `search-history${item._id}`}
          />
        </>
      )}

      <FlatList
        style
        data={searchResult}
        renderItem={({ item }) => {
          const isFriend = user.friends.some(
            (friend) => friend.userId == item._id
          );

          return (
            <SearchResultItem
              isFriend={isFriend}
              navigation={navigation}
              user={item}
            />
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
  flex: 1;
  background-color: ${(props) => props.theme.colors.chat.bg.primary};
`;
export default Search;
