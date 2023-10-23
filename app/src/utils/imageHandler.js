import * as FileSystem from "expo-file-system";
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
