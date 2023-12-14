import "react-native-url-polyfill/auto"
import { AppRegistry } from "react-native";
import App from "./App";
import notifee, { EventType } from "@notifee/react-native";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === "reply") {
    console.log('Người dùng đã ấn "Gửi".');
    console.log("Giá trị nhập vào: ", detail.input);
  }
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    //   // Update external API
    //   await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //     method: 'POST',
    //   });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent("main", () => App);
