import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Channel from "./ChannelItem.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import { colors } from "@src/infrastructure/theme/colors";
import { joinChannels } from "@src/store/slices/chatSlice";
const ListChannel = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const { isLoading, isSuccess, data } = useGetChannelsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    if (isSuccess) {
      setChannels(data);
      const channelIds = data.map((c) => c._id);
      dispatch(joinChannels(channelIds));
    }
  }, [isLoading, data]);
  return (
    <FlatList
      style={{
        padding: 12,
        backgroundColor: colors.chat.bg.primary,
      }}
      data={channels}
      ListEmptyComponent={() => null}
      renderItem={({ item }) => {
        return <Channel navigation={navigation} channel={item} />;
      }}
      keyExtractor={(item) => {
        return item._id;
      }}
    ></FlatList>
  );
};

export default ListChannel;
