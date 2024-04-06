import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import TextInputContainer from "./src/components/TextInputContainer";

export default function App({}) {
  const [type, setType] = useState("JOIN");

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString()
  );

  const otherUserId = useRef(null);
  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    socket.on("newCall", (data) => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType("INCOMING_CALL");
    });

    socket.on("callAnswered", (data) => {
      // 7. When Alice gets Bob's session description, she sets that as the remote description with `setRemoteDescription` method.

      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current)
      );
      setType("WEBRTC_ROOM");
    });

    socket.on("ICEcandidate", (data) => {
      let message = data.rtcMessage;

      // When Bob gets a candidate message from Alice, he calls `addIceCandidate` to add the candidate to the remote peer description.

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(new RTCIceCandidate(message.candidate))
          .then((data) => {
            console.log("SUCCESS");
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    });

    // Alice creates an RTCPeerConnection object with an `onicecandidate` handler, which runs when network candidates become available.
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        // Alice sends serialized candidate data to Bob using Socket
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log("End of candidates.");
      }
    };
  }, []);

  async function processCall() {
    // 1. Alice runs the `createOffer` method for getting SDP.
    const sessionDescription = await peerConnection.current.createOffer();

    // 2. Alice sets the local description using `setLocalDescription`.
    await peerConnection.current.setLocalDescription(sessionDescription);

    // 3. Send this session description to Bob uisng socket
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    // 4. Bob sets the description, Alice sent him as the remote description using `setRemoteDescription()`
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );

    // 5. Bob runs the `createAnswer` method
    const sessionDescription = await peerConnection.current.createAnswer();

    // 6. Bob sets that as the local description and sends it to Alice
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit("answerCall", data);
  }

  function sendCall(data) {
    socket.emit("call", data);
  }

  const JoinScreen = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          backgroundColor: "#050A0E",
          justifyContent: "center",
          paddingHorizontal: 42,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View
              style={{
                padding: 35,
                backgroundColor: "#1A1C22",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#D0D4DD",
                }}
              >
                Your Caller ID
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "#ffff",
                    letterSpacing: 6,
                  }}
                >
                  {callerId}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#1A1C22",
                padding: 40,
                marginTop: 25,
                justifyContent: "center",
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#D0D4DD",
                }}
              >
                Enter call id of another user
              </Text>
              <TextInputContainer
                placeholder={"Enter Caller ID"}
                value={otherUserId.current}
                setValue={(text) => {
                  otherUserId.current = text;
                }}
                keyboardType={"number-pad"}
              />
              <TouchableOpacity
                onPress={() => {
                  setType("OUTGOING_CALL");
                }}
                style={{
                  height: 50,
                  backgroundColor: "#5568FE",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  marginTop: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FFFFFF",
                  }}
                >
                  Call Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

  const OutgoingCallScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          backgroundColor: "#050A0E",
        }}
      >
        <View
          style={{
            padding: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#D0D4DD",
            }}
          >
            Calling to...
          </Text>

          <Text
            style={{
              fontSize: 36,
              marginTop: 12,
              color: "#ffff",
              letterSpacing: 6,
            }}
          >
            {otherUserId.current}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("JOIN");
              otherUserId.current = null;
            }}
            style={{
              backgroundColor: "#FF5D5D",
              borderRadius: 30,
              height: 60,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CallEnd width={50} height={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const IncomingCallScreen = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          backgroundColor: "#050A0E",
        }}
      >
        <View
          style={{
            padding: 35,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              marginTop: 12,
              color: "#ffff",
            }}
          >
            {otherUserId.current} is calling..
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setType("WEBRTC_ROOM");
            }}
            style={{
              backgroundColor: "green",
              borderRadius: 30,
              height: 60,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CallAnswer height={28} fill={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  switch (type) {
    case "JOIN":
      return JoinScreen();
    case "INCOMING_CALL":
      return IncomingCallScreen();
    case "OUTGOING_CALL":
      return OutgoingCallScreen();
    default:
      return null;
  }
}
