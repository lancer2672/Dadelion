import { useGetUserByIdQuery } from "@src/store/slices/api/userApiSlice";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

const AvatarMarker = ({ location, userId, openModal }) => {
  const { data: user } = useGetUserByIdQuery(userId);
  console.log("user data ", user);
  console.log(userId, location);
  return (
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }}
      onPress={openModal}
    >
      <Image
        source={
          user.avatar
            ? { uri: user.avatar }
            : require("../../../../assets/imgs/DefaultAvatar.png")
        }
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "white",
        }}
      ></Image>
    </Marker>
  );
};

export default AvatarMarker;
