import { UrlAPI } from "@src/constants";
import Notification from "./Notification";
import notifee, {
  AndroidStyle,
  AndroidImportance,
  AndroidGroupAlertBehavior,
} from "@notifee/react-native";

const PARENT_NOTIFICATION_ID = "parent_noti_id";
const MESSAGING_NOTIFICATION_CHANNEL = "messagingNotification";
class MessagingNotification extends Notification {
  constructor() {
    super({
      notificationChannelId: MESSAGING_NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
    });
    this.notifications = new Map();
    this.isParentNotificationDisplayed = false;
  }
  addUserInfor(user) {
    this.user = user;
  }

  addMessage({ notificationId, message }) {
    const notificationItem = this.notifications.get(notificationId);
    if (notificationItem) {
      notificationItem.messages.push(message);
      this.notifications.set(notificationId, notificationItem);
      console.log("notificationItem", notificationItem);
    }
  }

  addNotificationItem(id) {
    console.log("addNotificationItem", id);
    this.notifications.set(id, {
      messages: [],
    });
    console.log("addNotificationItem", this.notifications);
  }
  hasNotification(notificationId) {
    return this.notifications.has(notificationId);
  }
  async displayParentNotification() {
    console.log("Display parent");
    this.isParentNotificationDisplayed = true;
    await notifee.displayNotification({
      id: PARENT_NOTIFICATION_ID,
      title: "Notification",
      subtitle: `${this.notifications.size || 0} new messages`,
      android: {
        groupId: "123",
        groupSummary: true,
        channelId: this.notificationChannelId,
        groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
      },
    });
  }
  async removeParentNotification() {
    this.isParentNotificationDisplayed = false;
    await notifee.cancelNotification(PARENT_NOTIFICATION_ID);
  }
  async removeNotificationItem(id) {
    this.notifications.delete(id);
    //if there is no child notification
    if (this.notifications.size === 0) {
      await this.removeParentNotification();
    }
  }
  async updateNotification() {
    await this.displayNotification();
  }
  async displayNotification(notificationId) {
    const notificationItem = this.notifications.get(notificationId);
    console.log("notificationId", notificationId, notificationItem);
    if (!notificationItem) return;
    if (!this.isParentNotificationDisplayed) {
      await this.displayParentNotification();
    }
    const notification = {
      id: notificationId,
      title: "Tin nhắn mới",
      body: ``,
      android: {
        groupId: "123",
        groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
        channelId: this.notificationChannelId,
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: this.user?.nickname || "unknown user",
            icon:
              this.user?.avatar !== ""
                ? this.user.avatar
                : "https://my-cdn.com/avatars/123.png",
          },
          messages: notificationItem.messages.map((message, index) => ({
            text: message.body,
            timestamp: Number(message.createdAt),
            person: {
              name: message.user.nickname,
              icon:
                message.user.avatar !== ""
                  ? this.user.avatar
                  : "https://my-cdn.com/avatars/123.png",
            },
          })),
        },
        actions: [
          {
            title: "Reply",
            icon: "https://my-cdn.com/icons/reply.png",
            pressAction: {
              id: "reply",
            },
            input: false, // enable free text input
          },
        ],
      },
    };
    await super.displayNotification(notification);
  }
}

const messagingNotificationIns = new MessagingNotification();
export default messagingNotificationIns;
