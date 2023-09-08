import { Text, View, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Searchbar, Snackbar } from "react-native-paper";
import styled from "styled-components/native";

import { useTranslation } from "react-i18next";
import { Animated } from "react-native";

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
  const [containerWidth, setContainerWidth] = useState(0);
  const searchTimeout = useRef();
  const searchBarRef = useRef();
  const animation = new Animated.Value(52);
  const search = () => {
    const userResult = listUser.filter((user) =>
      user.nickname.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const userResultIds = userResult.map((res) => {
      return res._id;
    });
    const channelResult = channels.filter((channel) =>
      channel.memberIds.some((id) => userResultIds.includes(id))
    );
    const channelResultIds = channelResult.map((channel) => channel._id);
    setChannelIdsResult(channelResultIds);
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
  const handleFocus = () => {
    Animated.timing(animation, {
      toValue: containerWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    Animated.timing(animation, {
      toValue: 52,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setSearchKeyword("");
    });
  };
  const onIconPress = () => {
    if (searchBarRef.current.isFocused()) {
      handleBlur();
      searchBarRef.current.blur();
    } else {
      handleFocus();
      searchBarRef.current.focus();
    }
  };
  return (
    <SearchContainer
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width);
      }}
    >
      <Animated.View
        style={{
          width: animation,
          height: 52,
          marginVertical: 8,
          flexDirection: "row",
        }}
      >
        <Searchbar
          ref={searchBarRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ flex: 1 }}
          icon={"account-search"}
          placeholder="Tìm kiếm"
          value={searchKeyword}
          onChange={(newKeyword) => setSearchKeyword(newKeyword)}
          onIconPress={onIconPress}
          onChangeText={(text) => {
            setSearchKeyword((prevKeyword) => text);
          }}
          iconColor={"#bdafaf"}
        />
      </Animated.View>
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
  flex: 1;
  margin-left: 12px;
`;
export default SearchChannel;
