import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import axios from "axios";

import { UrlAPI } from "../../../constants";
import FoundedUsersList from "./found-user-list.component";
const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[2]};
`;

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [userList, setUserList] = useState([1]);
  const search = async () => {
    try {
      const response = await axios.get(
        `${UrlAPI}/user/search/?q=${searchKeyword}`
      );
      console.log(response.data);
    } catch (err) {}
  };
  return (
    <SearchContainer>
      <Searchbar
        icon={"account-search"}
        onIconPress={null}
        placeholder="Tìm kiếm"
        value={searchKeyword}
        onSubmitEditing={search}
        onFocus={() => console.log("focsing")}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        iconColor={"#bdafaf"}
      />
      {userList && <FoundedUsersList></FoundedUsersList>}
    </SearchContainer>
  );
};

export default Search;
