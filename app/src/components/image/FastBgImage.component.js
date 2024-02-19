import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

export const FastImageBackground = ({
  children,
  style,
  imageStyle,
  source,
}) => (
  <View style={style}>
    <FastImage
      fallback={true}
      source={source}
      style={[StyleSheet.absoluteFill, imageStyle]}
      resizeMode={FastImage.resizeMode.cover}
    />
    {children}
  </View>
);
