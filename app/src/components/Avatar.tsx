import { useState } from "react";
import { Image, View } from "react-native";
import { Badge } from "react-native-elements";
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
        <Badge
          status="success"
          containerStyle={{ position: "absolute", top: 0, right: 6 }}
        />
      )}
    </View>
  );
};

export default Avatar;
