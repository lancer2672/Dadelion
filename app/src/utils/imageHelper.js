import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

// import { launchImageLibrary } from "react-native-image-picker";

export const openImagePicker = () => {
  // return new Promise((resolve, reject) => {
  //   launchImageLibrary(
  //     {
  //       mediaType: "photo",
  //       includeBase64: true,
  //     },
  //     (response) => {
  //       if (response.didCancel) {
  //         reject("User cancelled image picker");
  //       } else if (response.error) {
  //         reject("ImagePicker Error: ", response.error);
  //       } else {
  //         resolve(response);
  //       }
  //     }
  //   );
  // });
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
