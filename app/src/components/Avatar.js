import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Image, View } from "react-native";
import styled from "styled-components/native";

export const Avatar = (props) => {
  const [avatarSrc, setAvatarSrc] = useState(
    props.source.uri
      ? props.source
      : require("../../assets/imgs/DefaultAvatar.png")
  );

  const handleError = (e) => {
    console.log("Load image error: ", e.nativeEvent.error);
    setAvatarSrc(require("../../assets/imgs/DefaultAvatar.png"));
  };
  return (
    <View style={{}}>
      <Image
        defaultSource={require("../../assets/imgs/DefaultAvatar.png")}
        {...props}
        style={[{ borderRadius: 1000, width: 50, height: 50 }, props.style]}
        source={avatarSrc}
        resizeMode="contain"
        onError={handleError}
      />
      {props.isOnline == 1 && (
        <View
          style={{
            position: "absolute",
            right: "-35%",
            bottom: "-35%",
          }}
        >
          <Entypo name="dot-single" size={52} color="green" />
        </View>
      )}
    </View>
  );
};

export default Avatar;
