import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapViewComponent = styled(MapView)`
  flex: 1;
`;

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("Text", location);
    text = JSON.stringify(location);
  }
  if (location) {
    return (
      <MapViewComponent
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      ></MapViewComponent>
    );
  }
  return <></>;
};

export default Map;
