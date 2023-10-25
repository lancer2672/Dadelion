import { StyleSheet, Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

const ImageMessageItem = ({ imageUrls, handleOpenImageFullScreen }) => {
  console.log("IMage urls", imageUrls);
  return (
    <>
      {imageUrls && imageUrls?.length > 0 && (
        <View style={{ flexDirection: "row" }}>
          {imageUrls.map((imageUrl, index) => {
            if (index == 0 || (index == 1 && imageUrls.length <= 2)) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(imageUrls, imageUrl)}
                >
                  <Image
                    style={{
                      flex: 1,
                    }}
                    resizeMode="cover"
                    source={{ uri: imageUrl }}
                  ></Image>
                </ImageContainer>
              );
            } else if (index == 1 && imageUrls.length > 2) {
              return (
                <ImageContainer
                  key={`chat-image` + index}
                  onPress={() => handleOpenImageFullScreen(imageUrls, imageUrl)}
                >
                  <Image
                    style={{
                      flex: 1,
                    }}
                    resizeMode="cover"
                    source={{ uri: imageUrl }}
                  ></Image>
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
    </>
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
