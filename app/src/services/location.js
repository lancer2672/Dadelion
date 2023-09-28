const {
  default: configureBackgroundGeolocation,
} = require("@src/config/location");
const { requestLocationPermission } = require("@src/permissions");
const {
  sendLocation,
  setLocation,
  stopTracking,
  startTracking,
} = require("@src/store/slices/location.Slice");
import BackgroundGeolocation from "react-native-background-geolocation";

export const enableTrackingLocation = async (dispatch) => {
  if (await requestLocationPermission()) {
    BackgroundGeolocation.onLocation((location) => {
      dispatch(sendLocation({ location }));
      dispatch(setLocation({ location }));
    });
    // BackgroundGeolocation.onMotionChange((event) => {
    //   console.log("[motionchange] -", event.isMoving, event.location);
    // });
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
