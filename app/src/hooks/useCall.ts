import { getSocket } from "@src/utils/socket";
import { useEffect, useRef, useState } from "react";
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";

const useCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  // Handling Mic status
  const [localMicOn, setlocalMicOn] = useState(true);
  const [type, setType] = useState("JOIN");
  // Handling Camera status
  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  const socket = getSocket();

  const otherUserId = useRef(null);
  let remoteRTCMessage = useRef(null);
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "stun:stun1.l.google.com:19302",
        },
        {
          urls: "stun:stun2.l.google.com:19302",
        },
      ],
    })
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("newCall", (data) => {
      /* This event occurs whenever any peer wishes to establish a call with you. */
    });

    socket.on("callAnswered", (data) => {
      /* This event occurs whenever remote peer accept the call. */
    });

    socket.on("ICEcandidate", (data) => {
      /* This event is for exchangin Candidates. */
    });

    let isFront = false;

    /*The MediaDevices interface allows you to access connected media inputs such as cameras and microphones. We ask the user for permission to access those media inputs by invoking the mediaDevices.getUserMedia() method. */
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == "videoinput" &&
          sourceInfo.facing == (isFront ? "user" : "environment")
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? "user" : "environment",
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then((stream) => {
          // Get local stream!
          setLocalStream(stream);

          // setup stream listening
          peerConnection.current.addStream(stream);
        })
        .catch((error) => {
          // Log error
        });
    });

    peerConnection.current.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    // Setup ice handling
    peerConnection.current.onicecandidate = (event) => {};

    return () => {
      socket.off("newCall");
      socket.off("callAnswered");
      socket.off("ICEcandidate");
    };
  }, [socket]);

  const callListener = () => {
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
  };
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
  function switchCamera() {
    localStream.getVideoTracks().forEach((track) => {
      track._switchCamera();
    });
  }
  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  // Destroy WebRTC Connection
  function leave() {
    peerConnection.current.close();
    setLocalStream(null);
    setType("JOIN");
  }

  return { peerConnection, localStream, remoteStream };
};

export default useCall;
