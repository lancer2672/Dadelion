import { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components/native";

export const Avatar = (props) => {
  const [avatarSrc, setAvatarSrc] = useState(props.source);

  const handleError = (e) => {
    console.log("Load image error: ", e.nativeEvent.error);
    setAvatarSrc(() => {
      require("../../assets/imgs/DefaultAvatar.png");
    });
  };

  return (
    <Image
      defaultSource={require("../../assets/imgs/DefaultAvatar.png")}
      {...props}
      style={[{ borderRadius: 1000, width: 50, height: 50 }, props.style]}
      source={avatarSrc}
      onError={handleError}
    />
  );
};

export default Avatar;
