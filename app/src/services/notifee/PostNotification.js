import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidStyle,
} from "@notifee/react-native";
import { NotificationType } from "@src/constants";
import { formatNamesWithAnd } from "@src/utils/textFormatter";
import Notification from "./Notification";

const PARENT_NOTIFICATION_ID = "parentPostNotification";
const NOTIFICATION_CHANNEL = "postNotification";
class PostNotification extends Notification {
  constructor() {
    super({
      notificationChannelId: NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
    });
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
    await super.displayParentNotification(
      PARENT_NOTIFICATION_ID,
      `${this.notifications.size} new notifications`
    );
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
