import { StyleSheet, Image, Pressable, Text, View } from "react-native";
import React, { useState, memo } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { readBase64 } from "@src/utils/imageHelper";
import OpenImageModal from "./OpenImageModal.component";
import { useEffect } from "react";

const ImageMessageItem = ({ images }) => {
  const [selectedImageList, setSelectedImageList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const listImageUrl = images.map((image) => image.url);
    setSelectedImageList(() => listImageUrl);
  }, []);
  const handleOpenImageFullScreen = (imageUrl) => {
    setSelectedIndex(() =>
      selectedImageList.findIndex((item) => item === imageUrl)
    );
    if (selectedIndex != -1) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      {images?.length > 0 && (
        <View style={{ flexDirection: "row" }}>
          {images.map((image, index) => {
            image;
            if (index == 0 || (index == 1 && images.length <= 2)) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(image.url)}
                >
                  <FastImage
                    onError={() => {
                      console.log("Error when loading image");
                    }}
                    fallback={true}
                    onProgress={(e) =>
                      console.log(
                        "Loading image",
                        e.nativeEvent.loaded / e.nativeEvent.total
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor: "gray",
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    // source={{ uri: imageUrl }}
                    source={{ uri: image.url }}
                  ></FastImage>
                </ImageContainer>
              );
            } else if (index == 1 && images.length > 2) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(image.url)}
                >
                  <FastImage
                    onError={() => {
                      console.log("Error when loading image");
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                    fallback={true}
                    onProgress={(e) =>
                      console.log(
                        "Loading image",
                        e.nativeEvent.loaded / e.nativeEvent.total
                      )
                    }
                    style={{
                      flex: 1,
                      backgroundColor: "gray",
                    }}
                    // resizeMode="cover"
                    source={{ uri: image.url }}
                  ></FastImage>
                  <ImageOverlay>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {images.length - 1}
                    </Text>
                  </ImageOverlay>
                </ImageContainer>
              );
            }
          })}
        </View>
      )}
      {selectedIndex > -1 && (
        <OpenImageModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          selectedImageList={selectedImageList}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        ></OpenImageModal>
      )}
    </View>
  );
};

const ImageOverlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(52, 52, 52, 0.5);
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled(Pressable)`
  border-radius: 20px;
  margin-top: 12px;
  margin-right: 12px;
  width: 140px;
  overflow: hidden;
  height: 180px;
`;

export default ImageMessageItem;
