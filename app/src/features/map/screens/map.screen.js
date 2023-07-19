import { StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
const MapViewComponent = styled(MapView)`
  flex: 1;
`;

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setIsLoading(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
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
      >
        <Marker
          key={"name"}
          title={"Tran Khanh"}
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        >
          <Callout onPress={null}>
            <Text>SomeThing</Text>
          </Callout>
        </Marker>
      </MapViewComponent>
    );
  }
  return <></>;
};

export default Map;
