import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.descriptionText}
        onChangeText={(newDescript) => setDescription(newDescript)}
        placeholder="Bạn đang nghĩ gì..."
      ></TextInput>
      <Image source={require("./../../../assets/imgs/24.jpg")}></Image>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {},
  descriptionText: {},
});
