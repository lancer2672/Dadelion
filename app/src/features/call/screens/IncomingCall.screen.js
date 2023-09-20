import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";
import { useSelector } from "react-redux";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { userSelector } from "@src/store/selector";

const WAVE_SIZE = 68;
const WAVE_COLOR = "#2e7bff";
const IncomingCallScreen = () => {
  const [caller, setCaller] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useSelector(userSelector);
  const { incomingCall, callingUserAvatar, callingUserId, channelId } =
    route.params;
  useEffect(() => {
    setCaller(incomingCall?.getEndpoints()[0].displayName);
    incomingCall?.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
      navigation.navigate("Home");
    });
    return () => {
      incomingCall?.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  const onDecline = () => {
    incomingCall?.decline();
  };

  const onAccept = () => {
    navigation.replace("CallingScreen", {
      isIncomingCall: true,
      incomingCall,
      callingUserId,
      channelId,
    });
  };
  return (
    <ImageBackground
      source={callingUserAvatar && { uri: callingUserAvatar }}
      style={styles.bg}
      resizeMode="cover"
    >
      <Text style={styles.name}>{caller}</Text>
      <Text style={styles.phoneNumber}></Text>

      <View style={[styles.row, { marginTop: "auto" }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={36} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, { backgroundColor: "#2e7bff" }]}
          >
            {[...Array(3).keys()].map((index) => {
              return (
                <MotiView
                  key={`Moti${index}`}
                  from={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    delay: index * 400,
                    repeatReverse: false,
                    loop: true,
                  }}
                  style={[StyleSheet.absoluteFillObject, styles.wave]}
                ></MotiView>
              );
            })}
            <Feather name="phone" color="white" size={36} />
          </View>

          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: "white",
  },
  bg: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
  },
  wave: {
    width: WAVE_SIZE,
    height: WAVE_SIZE,
    borderRadius: 1000,
    backgroundColor: WAVE_COLOR,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconText: {
    color: "white",
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: "red",
    width: WAVE_SIZE,
    height: WAVE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});
