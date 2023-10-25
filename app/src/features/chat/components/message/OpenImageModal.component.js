import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { downloadMediaFile } from "@src/utils/downloads";
import { useTranslation } from "react-i18next";
const OpenImageModal = ({
  visible,
  onClose,
  selectedIndex,
  setSelectedIndex,
  selectedImageList = [],
}) => {
  console.log("selected", selectedImageList, selectedIndex);
  const { t } = useTranslation();
  const handlePressLeft = () => {
    setSelectedIndex(
      selectedIndex - 1 < 0 ? selectedImageList.length - 1 : selectedIndex - 1
    );
  };
  const handlePressRight = () => {
    setSelectedIndex(
      selectedIndex + 1 >= selectedImageList.length ? 0 : selectedIndex + 1
    );
  };
  const handleDownloadImage = (fileUrl) => {
    downloadMediaFile(fileUrl)
      .then((uri) => {
        console.log("download success");

        showMessage({
          message: t("success"),
          type: "success",
          duration: 2000,
        });
      })
      .catch((error) => {
        console.log("download error", error);
        showMessage({
          message: t("failed"),
          type: "alert",
          duration: 2000,
        });
      });
  };
  return (
    <Modal animationType="fade" onRequestClose={onClose} visible={visible}>
      <ImageBackground
        source={{ uri: selectedImageList[selectedIndex] }}
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => handleDownloadImage(selectedImageList[selectedIndex])}
          style={{ position: "absolute", top: 16, right: 16, padding: 12 }}
        >
          <Feather name="download" size={40} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressLeft} style={{ padding: 24 }}>
          <Entypo name="chevron-left" size={40} color="gray" />
        </TouchableOpacity>
        <View
          style={{
            height: 80,
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(52, 52, 52, 0.5)",
            paddingVertical: 8,
          }}
        >
          <FlatList
            data={selectedImageList}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectedIndex(() => index);
                  }}
                >
                  <Image
                    key={`list-image-item` + index}
                    style={{ width: 80, height: 72, marginHorizontal: 8 }}
                    resizeMode="cover"
                    source={{ uri: item }}
                    title={item.title}
                  />
                </Pressable>
              );
            }}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableOpacity onPress={handlePressRight} style={{ padding: 24 }}>
          <Entypo name="chevron-right" size={40} color="gray" />
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

export default OpenImageModal;
