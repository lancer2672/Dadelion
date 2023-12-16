import { useNavigation } from "@react-navigation/native";
import { MessageType } from "@src/constants";
import { chatSelector, userSelector } from "@src/store/selector";
import { sendMessage } from "@src/store/slices/chatSlice";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";

const CallActionBox = ({ call, callingUserId, channelId }) => {
  // const { call } = useSelector(callSelector);
  const { selectedChannel } = useSelector(chatSelector);
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  console.log("user", user);
  const onToggleCamera = () => {
    setIsCameraOn((currentValue) => {
      if (call) {
        const newValue = !currentValue;
        call.sendVideo(newValue);
        return newValue;
      }
    });
  };
  const onHangupPress = async () => {
    console.log("call", call);
    if (call) {
      try {
        const duration = await call.getDuration();
        //handle 2 case: hangup from the caller (callingUserId) and hangup from the receiver
        const id = callingUserId ? callingUserId : user._id;

        dispatch(
          sendMessage({
            type: MessageType.CALL,
            channelId: channelId || selectedChannel?._id,
            duration,
          })
        );
      } catch (err) {
        console.log("get duration failed", err);
      }
      call.hangup();
    } else {
      navigation.goBack();
    }
  };
  const onReverseCamera = () => {};
  const onToggleMicrophone = () => {
    setIsMicOn((currentValue) => {
      const newValue = !currentValue;
      call.sendAudio(newValue);
      return newValue;
    });
  };

  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={30} color={"white"} />
      </Pressable>

      <Pressable onPress={onToggleCamera} style={styles.iconButton}>
        <MaterialIcons
          name={isCameraOn ? "camera" : "camera-off"}
          size={30}
          color={"white"}
        />
      </Pressable>

      <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialIcons
          name={isMicOn ? "microphone-off" : "microphone"}
          size={30}
          color={"white"}
        />
      </Pressable>

      <Pressable
        onPress={onHangupPress}
        style={[styles.iconButton, { backgroundColor: "red" }]}
      >
        <MaterialIcons name="phone-hangup" size={30} color={"white"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: "#333333",
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  iconButton: {
    backgroundColor: "#4a4a4a",
    padding: 15,
    borderRadius: 50,
  },
});

export default CallActionBox;
