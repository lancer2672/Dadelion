import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "styled-components";
import ListChannel from "../components/ListChannel.component";
import { StyleSheet } from "react-native";

const WaitingChannel = ({ waitingChanels }) => {
  const theme = useTheme();
  return (
    <View style={styles.container(theme)}>
      <ListChannel channels={waitingChanels}></ListChannel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.colors.bg.primary,
    flex: 1,
    padding: 12,
    justifyContent: "flex-start",
  }),
});

export default WaitingChannel;
