import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.searchBox} accessibilityHint="Tìm kiếm"></Text>
      <TouchableOpacity style={styles.searchBtn}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    minHeight: 30,
  },
  searchBox: {
    flex: 1,
  },
  searchBtn: {
    width: 50,
  },
});
