import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";
import axios from "axios";

import { UrlAPI } from "../../../constants";
import FoundedUsersList from "./found-user-list.component";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [userList, setUserList] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const searchTimeout = useRef();

  //deboucing search
  useEffect(() => {
    if (searchKeyword.trim() == "") {
      setUserList(null);
    } else {
      searchTimeout.current = setTimeout(() => {
        search();
      }, 400);
    }
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchKeyword]);

  const search = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `${UrlAPI}/user/search/?q=${searchKeyword}`
      );
      console.log("reponse", response.data);
      if (response.data.users.length === 0) {
        setSnackbarVisible(true);
        setUserList(null);
      }
      setUserList(response.data.users);
    } catch (err) {}
    setIsSearching(false);
  };
  return (
    <SearchContainer>
      <Searchbar
        icon={"account-search"}
        placeholder="Tìm kiếm"
        value={searchKeyword}
        onChange={(newKeyword) => setSearchKeyword(newKeyword)}
        onIconPress={() => console.log("press")}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        iconColor={"#bdafaf"}
      />
      <TouchableOpacity></TouchableOpacity>
      {userList && <FoundedUsersList userList={userList}></FoundedUsersList>}
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
          <Text>Không tìm thấy người dùng !!!</Text>
        </View>
      </Snackbar>
      {isSearching && <ActivityIndicator size="small" color="#0000ff" />}
    </SearchContainer>
  );
};

export default Search;
