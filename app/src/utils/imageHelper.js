import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const openImagePicker = () => {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};

export const readBase64 = async (uri) => {
  try {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64String;
  } catch (err) {
    throw err;
  }
};
