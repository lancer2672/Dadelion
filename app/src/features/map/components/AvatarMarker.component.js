import React, { useState } from "react";
import { Marker } from "react-native-maps";
import { Modal, View, Text, Button, Image } from "react-native";
import { Avatar } from "@src/components/Avatar";

const AvatarMarker = ({ user, location, openModal }) => {
  console.log(user, location);
  return (
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      onPress={openModal}
    >
      <Image
        source={{ uri: user.avatar }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "white",
        }}
      ></Image>
    </Marker>
  );
};

export default AvatarMarker;
