const { requestLocationPermission } = require("@src/permissions");
const {
  sendLocation,
  setLocation,
  stopTracking,
  startTracking,
  setFriendLocation,
  removeFriendLocation,
  addOrUpdateFriendLocation,
} = require("@src/store/slices/location.Slice");
import configureBackgroundGeolocation from "@src/config/location";
import BackgroundGeolocation from "react-native-background-geolocation";

export const enableTrackingLocation = async (dispatch) => {
  if (await requestLocationPermission()) {
    BackgroundGeolocation.getCurrentPosition(
      {
        samples: 1,
        persist: true,
      },
      (location) => {
        dispatch(sendLocation({ location }));
        dispatch(setLocation({ location }));
      },
      (error) => {
        console.log("Location error", error);
      }
    );
    BackgroundGeolocation.onLocation((location) => {
      dispatch(sendLocation({ location }));
      dispatch(setLocation({ location }));
    });
    const state = await configureBackgroundGeolocation();
    if (!state.enabled) {
      BackgroundGeolocation.start(function () {
        console.log("BackgroundGeolocation start");
      });
    }
  } else {
    dispatch(stopTracking());
  }
  dispatch(startTracking());
};

export const receiveListLocationListener = (socket, dispatch) => {
  socket.on("start-tracking", (listFriendLocation) => {
    dispatch(setFriendLocation(listFriendLocation));
  });
  socket.on("send-location", (friendLocation) => {
    dispatch(addOrUpdateFriendLocation(friendLocation));
  });
  socket.on("stop-tracking", (userId) => {
    dispatch(removeFriendLocation(userId));
  });
  return () => {
    socket.off("start-tracking");
    socket.off("send-location");
    socket.off("stop-tracking");
  };
};
