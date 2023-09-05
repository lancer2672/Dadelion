import { Text, View, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";

import FoundUser from "./FoundUser.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useSearchUserQuery } from "@src/store/slices/api/userApiSlice";
import { useTranslation } from "react-i18next";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;

const Search = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [userList, setUserList] = useState([]);
  const { t } = useTranslation();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const { data, isLoading, error, isSuccess } = useSearchUserQuery(
    searchKeyword,
    {
      skip: isTyping || searchKeyword.trim() == "",
    }
  );

  const searchTimeout = useRef();
  useEffect(() => {
    setIsSearching(isLoading);
    if (data && isSuccess) {
      const result = data.data;
      console.log("result ", result);
      if (result.length === 0) {
        setSnackbarVisible(true);
        setUserList([]);
      } else {
        setUserList(result);
      }
      setIsTyping(false);
    }
  }, [isLoading, data]);
  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setUserList([]);
    } else {
      setIsTyping(() => true);
      searchTimeout.current = setTimeout(() => {
        setIsTyping(() => false);
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
      {userList.length != 0 && (
        <View
          style={{
            marginBottom: 12,
            position: "absolute",
            backgroundColor: "gray",
            elevation: 1,
            left: 0,
            right: 0,
            top: "100%",
          }}
        >
          <FlatList
            data={userList}
            renderItem={({ item }) => {
              const { avatar, nickname, _id } = item;
              return (
                <Spacer position={"bottom"} size={"medium"}>
                  <FoundUser
                    navigation={navigation}
                    userId={_id}
                    avatar={avatar}
                    name={nickname}
                  />
                </Spacer>
              );
            }}
            keyExtractor={(item) => {
              return item._id;
            }}
          ></FlatList>
        </View>
      )}
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

export default Search;
