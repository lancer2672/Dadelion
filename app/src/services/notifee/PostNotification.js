import { NotificationType, UrlAPI } from "@src/constants";
import Notification from "./Notification";
import notifee, {
  AndroidStyle,
  AndroidImportance,
  AndroidGroupAlertBehavior,
} from "@notifee/react-native";
import { formatNamesWithAnd } from "@src/utils/textFormatter";

const PARENT_NOTIFICATION_ID = "parentPostNotification";
const MESSAGING_NOTIFICATION_CHANNEL = "postNotification";
class PostNotification extends Notification {
  constructor() {
    super({
      notificationChannelId: MESSAGING_NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
    });
    this.notifications = new Map();
    this.isParentNotificationDisplayed = false;
  }

  addNotificationItem(id, message) {
    this.notifications.set(id, {
      prefixNicknames: [],
      message,
    });
    console.log("addNotificationItem", this.notifications);
  }
  hasNoficationItem(postId) {
    return this.notifications.has(postId);
  }

  addPrefixNickname({ postId, nickname }) {
    const notificationItem = this.notifications.get(postId);
    if (notificationItem) {
      const isExist = notificationItem.prefixNicknames.includes(nickname);
      if (!isExist) {
        notificationItem.prefixNicknames.push(nickname);
        this.notifications.set(postId, notificationItem);
        console.log("notificationItem", notificationItem);
      }
    }
  }
  async displayParentNotification() {
    this.isParentNotificationDisplayed = true;
    await notifee.displayNotification({
      id: PARENT_NOTIFICATION_ID,
      title: "Notification",
      subtitle: `${this.notifications.size || 0} new notifications`,
      android: {
        groupId: PARENT_NOTIFICATION_ID,
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
  async displayNotification(postId) {
    const notificationItem = this.notifications.get(postId);
    console.log("postId", postId, notificationItem);
    if (!notificationItem) return;
    if (!this.isParentNotificationDisplayed) {
      await this.displayParentNotification();
    }
    const notification = {
      id: postId,
      title: "Notification",
      body: `${formatNamesWithAnd(notificationItem.prefixNicknames)} ${
        notificationItem.message
      } `,
      data: {
        type: NotificationType.POST,
        postId,
      },
      android: {
        groupId: PARENT_NOTIFICATION_ID,
        groupAlertBehavior: AndroidGroupAlertBehavior.CHILDREN,
        channelId: this.notificationChannelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: "https://my-cdn.com/user/123/upload/456.png",
        },

        pressAction: {
          id: "default",
        },
      },
    };
    await super.displayNotification(notification);
  }
}

const postNotificationIns = new PostNotification();
export default postNotificationIns;
