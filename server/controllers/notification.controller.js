const FriendRequest = require("../models/friend-request");
const admin = require("../firebase/firebaseAdmin");
const Notification = require("../models/notification");
exports.handleSendNotification = async (
  tokenList,
  message,
  messageData,
  senderId,
  receiverId,
  postId,
  title = "Thông báo mới"
) => {
  if (senderId && postId) {
    const notification = new Notification({
      description: message,
      userIds: [
        {
          userId: senderId,
          createdAt: Date.now(),
        },
      ],
      receiverId,
      postId,
    });
    await notification.save();
  }
  await admin.messaging().sendToDevice(
    tokenList,
    {
      notification: {
        title,
        body: message,
      },
      data: {
        ...messageData,
        //  ex:
        // type: "chat",
        // channelId: channelId,
        // memberIds: JSON.stringify(memberIds),
      },
    },
    {
      priority: "high",
    }
  );
};
exports.sendNotification = async (req, res) => {
  try {
    const { tokenList, message, title } = req.body;
    handleSendNotification(tokenList, message, title);
    res.json({
      success: true,
      message: "Send notification successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Cannot send notification",
    });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverId: req.userId,
    }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      message: "success",
      data: { notifications },
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "get all notifications failed" });
  }
};
