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
  console.log("username", username, password);
  try {
    if (voximplant.getClientState() === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
    }
    // remove email part
    let authResult = await voximplant.login(
      `${username.split("@")[0].toLowerCase()}@${AppName}`,
      password
    );

    console.log("voximplant login successfully", authResult);
    return authResult.tokens.accessToken;
  } catch (er) {
    console.log("voximplant ", er);
  }
};

export const loginWithTokenVoximplant = async (username, token) => {
  try {
    //remove email part
    if (voximplant.getClientState() === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
    }
    let authResult = await voximplant.loginWithToken(
      `${username.split("@")[0].toLowerCase()}@${AppName}`,
      token
    );
    console.log("voximplant login using token successfully", authResult);
  } catch (er) {
    console.log("voximplant login er ", er);
  }
};
