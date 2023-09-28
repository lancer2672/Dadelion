import { Voximplant } from "react-native-voximplant";

export const enableCallingService = (navigation) => {
  const voximplant = Voximplant.getInstance();
  voximplant.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent) => {
    const callingUserAvatar = incomingCallEvent.headers["X-avatarUrl"];
    const callingUserId = incomingCallEvent.headers["X-userId"];
    const channelId = incomingCallEvent.headers["X-channelId"];
    navigation.navigate("IncomingCall", {
      incomingCall: incomingCallEvent.call,
      callingUserAvatar,
      callingUserId,
      channelId,
    });
  });

  return () => {
    voximplant.off(Voximplant.ClientEvents.IncomingCall);
  };
};
