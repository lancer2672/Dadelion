import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import CallActionBox from "../components/CallActionBox.component";

import { useNavigation, useRoute } from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";
import { Ionicons } from "@expo/vector-icons";
import { requestCallingPermission } from "@src/permissions";
const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [callStatus, setCallStatus] = useState("Initializing...");
  const { call: incomingCall, isIncomingCall, user } = route?.params;
  const [localVideoStreamId, setLocalVideoStreamId] = useState("");
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState("");
  const voximplant = Voximplant.getInstance();
  const callRef = useRef(incomingCall);
  const endpoint = useRef(null);
  const callSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
  };
  console.log("remoteVideoStreamId", remoteVideoStreamId);
  console.log("localVideoStreamId", localVideoStreamId);
  const makeCall = async () => {
    if (Platform.OS == "android") {
      if ((await requestCallingPermission()) == false) {
        return;
      }
    }
    callRef.current = await voximplant.call(user.username, callSettings);
    subscribeToCallEvents();
  };
  const answerCall = async () => {
    subscribeToCallEvents();
    console.log(
      "callRef.current.getEndpoints()[0]",
      callRef.current.getEndpoints()[0]
    );
    endpoint.current = callRef.current.getEndpoints()[0];
    subscribeToEndpointEvent();
    callRef.current.answer(callSettings);
  };
  const subscribeToEndpointEvent = async () => {
    endpoint.current.on(
      Voximplant.EndpointEvents.RemoteVideoStreamAdded,
      (endpointEvent) => {
        console.log(
          "endpointEvent.videoStream.id",
          endpointEvent.videoStream.id
        );
        setRemoteVideoStreamId(endpointEvent.videoStream.id);
      }
    );
  };
  const subscribeToCallEvents = () => {
    callRef.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
      console.log("callEvent", callEvent);
      navigation.goBack();
    });
    callRef.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
      setCallStatus("Calling...");
    });
    callRef.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
      setCallStatus("Connected");
    });
    callRef.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
      console.log("disconnected");
      navigation.navigate("Home");
    });
    callRef.current.on(
      Voximplant.CallEvents.LocalVideoStreamAdded,
      (callEvent) => {
        setLocalVideoStreamId(callEvent.videoStream.id);
      }
    );
    callRef.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
      endpoint.current = callEvent.endpoint;
      console.log("callEvent.endpoint;", callEvent.endpoint);
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
  const onHangupPress = () => {
    callRef.current.hangup();
  };
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
          {/* {user.nickname} */}
          Unknown
        </Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>

      <CallActionBox onHangupPress={onHangupPress} />
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    backgroundColor: "#7b4e80",
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
    backgroundColor: "#7b4e80",
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
