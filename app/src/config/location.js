import BackgroundGeolocation from "react-native-background-geolocation";

export default function configureBackgroundGeolocation() {
  return BackgroundGeolocation.ready({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 50,
    stopTimeout: 1,
    debug: true,
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
