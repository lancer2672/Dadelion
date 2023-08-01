import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Channel from "./ChannelItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { colors } from "@src/infrastructure/theme/colors";
const ListChannel = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const { isLoading, isSuccess, data } = useGetChannelsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (isSuccess) {
      console.log("data channels", data);
      setChannels(data);
    }
  }, [isLoading, data]);
  return (
    <FlatList
      style={{
        padding: 12,
        backgroundColor: colors.chat.bg.primary,
        flexGrow: 1,
      }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return (
          <Spacer position={"bottom"} size={"large"}>
            <Channel navigation={navigation} channel={item} />
          </Spacer>
        );
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListChannel;

const styles = StyleSheet.create({});
