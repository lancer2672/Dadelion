import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { mediaFileStoragePermission } from "@src/permissions";
import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

export async function downloadMediaFile(fileUrl) {
  if (Platform.OS === "android" && (await mediaFileStoragePermission())) {
    return RNFetchBlob.config({
      fileCache: true,
      appendExt: "png",
    })
      .fetch("GET", fileUrl)
      .then((res) => {
        return CameraRoll.save(res.path());
      });
  }
}
