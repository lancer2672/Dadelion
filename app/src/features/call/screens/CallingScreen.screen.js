import React, { useEffect, useState, useRef, useReducer } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";
import { Ionicons } from "@expo/vector-icons";
import { requestCallingPermission } from "@src/permissions";
import { useDispatch, useSelector } from "react-redux";
import { callSelector, chatSelector, userSelector } from "@src/store/selector";

import CallActionBox from "../components/CallActionBox.component";
import { setCall } from "@src/store/slices/callSlice";
import { sendMessage } from "@src/store/slices/chatSlice";
const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);
  const voximplant = Voximplant.getInstance();
  const endpoint = useRef(null);

  // const { currentCall} = useSelector(callSelector);
  console.log("selectedChannel", selectedChannel);
  const { incomingCall, isIncomingCall, callingUserId, channelId } =
    route?.params;
  const [callStatus, setCallStatus] = useState("Initializing...");
  const [localVideoStreamId, setLocalVideoStreamId] = useState("");
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState("");
  const callSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
    extraHeaders: {
      "X-avatarUrl": user.avatar,
      "X-userId": user._id,
      "X-channelId": selectedChannel?._id,
    },
  };
  const callRef = useRef(incomingCall);

  const makeCall = async () => {
    if (Platform.OS == "android") {
      if ((await requestCallingPermission()) == false) {
        return;
      }
    }
    callRef.current = await voximplant.call(
      selectedChannel.chatFriend.username,
      callSettings
    );
    subscribeToCallEvents();
  };
  const answerCall = async () => {
    subscribeToCallEvents();
    endpoint.current = callRef.current.getEndpoints()[0];
    subscribeToEndpointEvent();
    callRef.current.answer(callSettings);
  };
  const subscribeToEndpointEvent = async () => {
    endpoint.current.on(
      Voximplant.EndpointEvents.RemoteVideoStreamAdded,
      (endpointEvent) => {
        setRemoteVideoStreamId(endpointEvent.videoStream.id);
      }
    );
  };
  const subscribeToCallEvents = () => {
    callRef.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
      dispatch(
        sendMessage({
          type: "callHistory",
          channelId: selectedChannel._id,
          senderId: user._id,
          duration: 0,
        })
      );
      navigation.goBack();
    });
    callRef.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
      setCallStatus("Calling...");
    });
    callRef.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
      setCallStatus("Connected");
    });
    callRef.current.on(
      Voximplant.CallEvents.Disconnected,
      async (callEvent) => {
        //Call.getDuration(): call is no more unavailable, already ended or failed
        console.log("disconnected", callRef.current);
        navigation.navigate("Home");
      }
    );
    callRef.current.on(
      Voximplant.CallEvents.LocalVideoStreamAdded,
      (callEvent) => {
        setLocalVideoStreamId(callEvent.videoStream.id);
      }
    );
    callRef.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
      endpoint.current = callEvent.endpoint;
      subscribeToEndpointEvent();
    });
  };
  useEffect(() => {
    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }
    return () => {
      if (callRef.current) {
        callRef.current.off(Voximplant.CallEvents.Failed);
        callRef.current.off(Voximplant.CallEvents.ProgressToneStart);
        callRef.current.off(Voximplant.CallEvents.Connected);
        callRef.current.off(Voximplant.CallEvents.Disconnected);
        callRef.current.off(Voximplant.CallEvents.LocalVideoStreamAdded);
      }
    };
  }, []);
  return (
    <View style={styles.page}>
      <Pressable onPress={null} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={25} />
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />

      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>
          {incomingCall
            ? incomingCall?.getEndpoints()[0].displayName
            : selectedChannel.chatFriend.nickname}
        </Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>

      <CallActionBox
        channelId={channelId}
        callingUserId={callingUserId}
        call={callRef.current}
      />
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: "black",
  },
  cameraPreview: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: "#ffff6e",
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 100,
  },
  remoteVideo: {
    backgroundColor: "black",
    borderRadius: 10,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 10,
  },
});
