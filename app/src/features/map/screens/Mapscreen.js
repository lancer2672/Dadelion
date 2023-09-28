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
import configureBackgroundGeolocation from "@src/config/location";
import BackgroundGeolocation from "react-native-background-geolocation";
import { getSocket } from "@src/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@src/store/slices/appSlice";
import AvatarMarker from "../components/AvatarMarker.component";
import { locationSelector, userSelector } from "@src/store/selector";
import {
  sendLocation,
  startTracking,
  stopTracking,
} from "@src/store/slices/location.Slice";
import BottomModal from "../components/BottomModal.component";

const Map = () => {
  const dispatch = useDispatch();
  const { location } = useSelector(locationSelector);
  const [errorMsg, setErrorMsg] = useState(null);
  const [friendLocation, setFriendLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector(userSelector);
  const socket = getSocket();
  console.log("location", location);
  useEffect(() => {
    if (socket) {
      socket.on("start-tracking", (listFriendLocation) => {
        console.log("start-tracking", listFriendLocation);
      });
      socket.on("send-location", (friendLocation) => {
        console.log("send-location", friendLocation);
      });
    }
  }, [socket]);

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
            avtar={user.avatar}
          ></AvatarMarker>
        </MapView>
        <BottomModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
        ></BottomModal>
      </View>
    );
  }
  return <></>;
};

export default Map;
