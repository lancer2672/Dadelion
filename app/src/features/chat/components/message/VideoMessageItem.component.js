import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Pressable } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { showMessage } from "react-native-flash-message";
import { mediaFileStoragePermission } from "@src/permissions";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const VideoMessageItem = ({ videos }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [clicked, setClicked] = useState(true);
  const [paused, setPaused] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  const videoRef = useRef();
  const format = (seconds) => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, "0");
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };
  const onSliderValueChange = (value) => {
    setIsSliding(true);
    videoRef.current.seek(value);
    setSliderValue(value);
  };
  const downloadVideo = async () => {
    console.log("in");
    if (Platform.OS === "android" && (await mediaFileStoragePermission())) {
      RNFetchBlob.config({
        fileCache: true,
        appendExt: "mp4",
      })
        .fetch("GET", videos[0].url)
        .then((res) => {
          return CameraRoll.save(res.path(), "video");
        })
        .then((uri) => {
          console.log("uri", uri);
          showMessage({
            message: t("success"),
            type: "success",
            duration: 2000,
          });
        })
        .catch((error) => {
          showMessage({
            message: t("failed"),
            type: "alert",
            duration: 2000,
          });
          console.error(error);
        });
    }
  };
  return (
    <View
      style={[
        styles.container,
        { marginTop: 12, backgroundColor: theme.colors.bg.secondary },
      ]}
    >
      <Pressable
        style={{
          width: "100%",
          height: "100%",
        }}
        onPress={() => {
          setClicked(() => !clicked);
        }}
      >
        <Video
          onError={(error) => {
            console.error(error);
          }}
          paused={paused}
          source={{
            uri: videos[0].url,
          }}
          ref={videoRef}
          onLoad={({ duration }) => {
            videoRef.current.seek(0);
            setDuration(duration);
          }}
          onProgress={({ currentTime }) =>
            !isSliding && setSliderValue(currentTime)
          }
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setClicked(false);
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setPaused(() => !paused);
                }}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name={!paused ? "pause" : "play"}
                  size={24}
                  color={theme.colors.text.primary}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  videoRef.current.seek(parseInt(progress.currentTime) + 10);
                }}
              >
                <Image
                  source={require("../../../../assets/icons/video/forward.png")}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: "white",
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              onPress={downloadVideo}
              style={{
                position: "absolute",
                padding: 6,
                top: 0,
                right: 0,
              }}
            >
              <Feather name="download" size={24} color="white" />
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.colors.text.primary }}>
                {format(sliderValue)}
              </Text>
              <Slider
                style={{ flex: 1, height: 40 }}
                minimumValue={0}
                value={sliderValue}
                maximumValue={duration}
                minimumTrackTintColor="#FFFFFF"
                onSlidingStart={() => setIsSliding(true)}
                maximumTrackTintColor="#fff"
                onValueChange={onSliderValueChange}
                onSlidingComplete={(value) => {
                  setIsSliding(false);
                  onSliderValueChange(value);
                }}
              />
              <Text style={{ color: theme.colors.text.primary }}>
                {format(duration)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  );
};

export default VideoMessageItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,

    minWidth: 200,
    minHeight: 100,
    height: 300,
    elevation: 1,
  },
});
