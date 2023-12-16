import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { requestCallingPermission } from "@src/permissions";
import { chatSelector, userSelector } from "@src/store/selector";
import { useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import CallActionBox from "../components/CallActionBox.component";
const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { selectedChannel } = useSelector(chatSelector);
  const endpoint = useRef(null);

  // const { currentCall} = useSelector(callSelector);

  const { data: chatFriend } = useGetUserByIdQuery(
    selectedChannel.chatFriendId,
    {
      skip: !selectedChannel.chatFriendId,
    }
  );

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
    subscribeToCallEvents();
  };
  const answerCall = async () => {
    subscribeToCallEvents();
    endpoint.current = callRef.current.getEndpoints()[0];
    subscribeToEndpointEvent();
    callRef.current.answer(callSettings);
  };
  const subscribeToEndpointEvent = async () => {};
  const subscribeToCallEvents = () => {};
  useEffect(() => {
    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }
    return () => {
      if (callRef.current) {
      }
    };
  }, []);
  return (
    <View style={styles.page}>
      <Pressable onPress={null} style={styles.backButton}>
        <Ionicons name="chevron-back" color="white" size={25} />
      </Pressable>

      <View style={styles.cameraPreview}>
        <Text style={styles.name}>
          {incomingCall
            ? incomingCall?.getEndpoints()[0].displayName
            : chatFriend.nickname}
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
