import { Voximplant } from "react-native-voximplant";
import { AppName } from "../utils/constant";
const voximplant = Voximplant.getInstance();
export const connectVoximplant = async () => {
  try {
    let clientState = await voximplant.getClientState();
    if (clientState === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
    } else if (clientState === Voximplant.ClientState.LOGGED_IN) {
      console.log("voximplant connected");
    }
    console.log("clientState", clientState);
  } catch (er) {
    console.log("er", er);
  }
};

export const loginVoximplant = async (username, password) => {
  try {
    let authResult = await voximplant.login(`${username}@${AppName}`, password);
    console.log("voximplant login successfully", authResult);
  } catch (er) {
    console.log("voximplant ", er);
  }
};
