import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import MapView, {
  Marker,
  Callout,
  UrlTile,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { requestLocationPermission } from "@src/permissions";
import * as Location from "expo-location";
// ERROR: undefined -  import Geolocation from "react-native-geolocation-service";
import { getSocket } from "@src/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import AvatarMarker from "../components/AvatarMarker.component";
import { userSelector } from "@src/store/selector";

const Map = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector(userSelector);
  const socket = getSocket();
  console.log("location", location);
  const trackUserPosition = () => {};
  useEffect(() => {
    (async () => {
      if (await requestLocationPermission()) {
        try {
          dispatch(setIsLoading(true));
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          dispatch(setIsLoading(false));
        } catch (er) {
          console.log("er", er);
        }
      }
    })();
  }, []);

  if (location) {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* <UrlTile urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png" /> */}
          {/* <Marker
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
        </Marker> */}
          <AvatarMarker
            openModal={() => {
              setModalVisible(true);
            }}
            closeModal={() => {
              setModalVisible(false);
            }}
            location={location}
            user={user}
          ></AvatarMarker>
        </MapView>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  padding: 20,
                }}
              >
                <Text>{user.name}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
  return <></>;
};

export default Map;
