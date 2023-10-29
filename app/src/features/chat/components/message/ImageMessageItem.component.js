import { StyleSheet, Image, Pressable, Text, View } from "react-native";
import React, { useState, memo } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";
import { readBase64 } from "@src/utils/imageHelper";
import OpenImageModal from "./OpenImageModal.component";

const ImageMessageItem = ({ imageUrls }) => {
  console.count("ImageMessage");

  const [selectedImageList, setSelectedImageList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenImageFullScreen = (imageListUrl, imageUrl) => {
    setSelectedImageList(() => imageListUrl);
    setSelectedIndex(() => imageListUrl.findIndex((item) => item === imageUrl));
    if (selectedIndex != -1) {
      setModalVisible(true);
    }
  };

  return (
    <View>
      {imageUrls && imageUrls?.length > 0 && (
        <View style={{ flexDirection: "row" }}>
          {imageUrls.map((imageUrl, index) => {
            if (index == 0 || (index == 1 && imageUrls.length <= 2)) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(imageUrls, imageUrl)}
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
                    resizeMode={FastImage.resizeMode.contain}
                    // source={{ uri: imageUrl }}
                    source={{ uri: imageUrl }}
                  ></FastImage>
                </ImageContainer>
              );
            } else if (index == 1 && imageUrls.length > 2) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(imageUrls, imageUrl)}
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
                    source={{ uri: imageUrl }}
                  ></FastImage>
                  <ImageOverlay>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: 500,
                        color: "white",
                      }}
                    >
                      {imageUrls.length - 1}
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
