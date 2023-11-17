import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import { useState, useEffect } from "react";

const useNotification = () => {
  const setIsBgNotificationEnable = (isEnable) => {
    messagingNotificationIns.enable = isEnable;
  };
  return {
    setIsBgNotificationEnable,
  };
};

export default useNotification;
