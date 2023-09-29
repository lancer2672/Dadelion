import { View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { getSocket } from "@src/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import AvatarMarker from "../components/AvatarMarker.component";
import { locationSelector, userSelector } from "@src/store/selector";
import BottomModal from "../components/BottomModal.component";

const Map = () => {
  const dispatch = useDispatch();
  const { location, friendLocation } = useSelector(locationSelector);
  const { user } = useSelector(userSelector);
  const [modalVisible, setModalVisible] = useState(false);
  console.log("location, friendLocation", location, friendLocation);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  if (!location) {
    return <></>;
  }
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
        {/* user location */}
        {location && (
          <AvatarMarker
            openModal={openModal}
            closeModal={closeModal}
            location={location}
            userId={user._id}
          ></AvatarMarker>
        )}

        {friendLocation.map((item) => {
          return (
            <AvatarMarker
              key={`Avatar-marker${item.userId}`}
              openModal={openModal}
              closeModal={closeModal}
              location={item.location}
              userId={item.userId}
            ></AvatarMarker>
          );
        })}
      </MapView>
      <BottomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      ></BottomModal>
    </View>
  );
};

export default Map;
