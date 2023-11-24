import { AppState, Alert } from "react-native";
import notifee, {
  TriggerType,
  TimeUnit,
  EventType,
  AndroidImportance,
  RepeatFrequency,
  AndroidStyle,
  AndroidGroupAlertBehavior,
} from "@notifee/react-native";
class Notification {
  static enable = true;
  constructor({ notificationChannelId, importance }) {
    this.notifications = new Map();
    this.isParentNotificationDisplayed = false;
    this.createChannel({ notificationChannelId, importance });
  }

  async createChannel({
    notificationChannelId,
    importance = AndroidImportance.DEFAULT,
  }) {
    this.notificationChannelId = await notifee.createChannel({
      id: notificationChannelId,
      name: notificationChannelId,
      importance,
    });
  }
  hasNoficationItem(id) {
    return this.notifications.has(id);
  }
  async displayParentNotification(id, subtitle) {
    this.isParentNotificationDisplayed = true;
    await notifee.displayNotification({
      id,
      title: "Notification",
      subtitle,
      android: {
        groupId: id,
        groupSummary: true,
        channelId: this.notificationChannelId,
        groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
      },
    });
  }
  // async checkingBatterySavingEnabled() {
  //   const batteryOptimizationEnabled =
  //     await notifee.isBatteryOptimizationEnabled();
  //   if (batteryOptimizationEnabled) {
  //     // 2. ask your users to disable the feature
  //     Alert.alert(
  //       "Restrictions Detected",
  //       "To ensure notifications are delivered, please disable battery optimization for the app.",
  //       [
  //         // 3. launch intent to navigate the user to the appropriate screen
  //         {
  //           text: "OK, open settings",
  //           onPress: async () =>
  //             await notifee.openBatteryOptimizationSettings(),
  //         },
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // }
  addNotificationItem(id, item) {
    this.notifications.set(id, item);
    console.log("addNotificationItem", this.notifications);
  }
  async displayNotification(notification) {
    if (!Notification.enable) return;
    await notifee.displayNotification(notification);
  }

  static async stopForegroundService() {
    await notifee.stopForegroundService();
  }
}

export default Notification;
