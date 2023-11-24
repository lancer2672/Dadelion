import { NotificationType, UrlAPI } from "@src/constants";
import Notification from "./Notification";
import notifee, {
  AndroidStyle,
  AndroidImportance,
  AndroidGroupAlertBehavior,
} from "@notifee/react-native";
import { formatNamesWithAnd } from "@src/utils/textFormatter";

const PARENT_NOTIFICATION_ID = "parentFriendRequestNotification";
const NOTIFICATION_CHANNEL = "friendRequestNotification";

class FriendRequestNotification extends Notification {
  constructor() {
    super({
      notificationChannelId: NOTIFICATION_CHANNEL,
      importance: AndroidImportance.HIGH,
    });
  }

  async displayParentNotification() {
    await super.displayParentNotification(
      PARENT_NOTIFICATION_ID,
      `${this.notifications.size} new friend requests`
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
  async displayNotification(friendRequestId) {
    const notificationItem = this.notifications.get(friendRequestId);
    console.log("friendRequestId", friendRequestId, notificationItem);
    if (!notificationItem) return;
    if (!this.isParentNotificationDisplayed) {
      await this.displayParentNotification();
    }
    const notification = {
      id: friendRequestId,
      title: "Notification",
      data: {
        requestId: friendRequestId,
      },
      body: `${notificationItem.nickname} sent you a friend request`,
      android: {
        largeIcon: notificationItem.avatar
          ? `${UrlAPI}/${notificationItem.avatar}`
          : "https://my-cdn.com/users/123456.png",
        channelId: this.notificationChannelId,
        pressAction: {
          id: "default",
        },
        actions: [
          {
            title: "Accept",
            icon: "https://my-cdn.com/icons/snooze.png",
            pressAction: {
              id: "friendRequest-accept",
            },
          },
          {
            title: "Decline",
            icon: "https://my-cdn.com/icons/snooze.png",
            pressAction: {
              id: "friendRequest-decline",
            },
          },
        ],
      },
    };

    await super.displayNotification(notification);
  }
}

const friendRequestNotificationIns = new FriendRequestNotification();
export default friendRequestNotificationIns;
