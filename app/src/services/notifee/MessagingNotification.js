import Notification from "./Notification";
import notifee, {
  AndroidStyle,
  AndroidImportance,
} from "@notifee/react-native";

const MESSAGING_NOTIFICATION_ID = "messagingNotificationId";
const MESSAGING_NOTIFICATION_CHANNEL = "messagingNotification";
class MessagingNotification extends Notification {
  constructor() {
    super({
      notificationId: MESSAGING_NOTIFICATION_ID,
      channelId: MESSAGING_NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
    });
  }

  async updateNotification({}) {
    await this.displayNotification();
  }

  async displayNotification() {
    const notification = {
      id: this.notificationId,
      title: "Theo dõi hoạt động",
      body: `💧 ml 🚶  m &#128099 step`,
      android: {
        channelId: this.channelId,
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: "John Doe",
            icon: "https://my-cdn.com/avatars/123.png",
          },
          messages: [
            {
              text: "Hey, how are you?",
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: "Great thanks, food later?",
              timestamp: Date.now(), // Now
              person: {
                name: "Sarah Lane",
                icon: "https://my-cdn.com/avatars/567.png",
              },
            },
          ],
        },
        actions: [
          {
            title: "Reply",
            icon: "https://my-cdn.com/icons/reply.png",
            pressAction: {
              id: "reply",
            },
            input: true, // enable free text input
          },
        ],
      },
    };
    super.displayNotification(notification);
  }
}

const messagingNotificationIns = new MessagingNotification();
export default messagingNotificationIns;
