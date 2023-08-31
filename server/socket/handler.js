const ChatChannel = require("../models/channel");
const ObjectId = require("mongoose").Types.ObjectId;
const Channel = require("../models/channel");
const User = require("../models/user");
const FriendRequestModel = require("../models/friend-request");
const NotificationController = require("../controllers/notification.controller");

const fs = require("fs");

const createChannel = async (channelName, memberIds) => {
  try {
    const channel = new Channel({
      channelName,
      memberIds,
      channelMessages: [],
    });
    await channel.save();
    console.log("Channel created successfully!");
    return channel;
  } catch (err) {
    console.error("Error creating channel", err);
  }
};
const addFriendToFriendList = async (userIdA, userIdB) => {
  const userA = await User.findById(userIdA);
  const checkIfFriend = userA.friends.some(
    (friend) => (friend.userId = userIdB)
  );
  if (!checkIfFriend) {
    userA.friends.push({
      userId: userIdB,
      createdAt: new Date().toISOString(),
    });
    await userA.save();
  }
};
const findExistedPendingFriendRequest = async (senderId, receiverId) => {
  return await FriendRequestModel.findOne({
    sender: senderId,
    receiver: receiverId,
    status: "pending",
  });
};
const acceptFriendRequest = async (request) => {
  request.status = "accepted";
  await request.save();

  const newChannel = await createChannel("New Chat Room", [
    request.sender,
    request.receiver,
  ]);

  return newChannel;
};

async function handleJoinChatRoom(channelId = null, userAId, userBId) {
  if (channelId === null) {
    const newChannel = await createChannel("New Chat Room", [userAId, userBId]);
    channelId = newChannel._id;
  }
  console.log("join channelId", channelId);
  this.join(channelId);
}

const handleSendMessage = async (io, channelId, userId, newMessage) => {
  try {
    const chatChannel = await Channel.findById(channelId);
    const newMess = {
      _id: new ObjectId(),
      userId,
      message: newMessage,
      createdAt: new Date(),
    };
    chatChannel.channelMessages.unshift(newMess);
    await chatChannel.save();
    io.to(channelId).emit("receive-message", newMess, channelId);
  } catch (e) {
    console.log("Error when sending message", e);
  }
};

const handleSendImage = async (io, { channelId, userId, imageData }) => {
  try {
    const fileName = Date.now() + "-" + userId + ".png";

    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync("uploads/" + fileName, base64Data, "base64");
    const imageUrl = "http://192.168.153.72:3000/uploads/" + fileName;

    const chatChannel = await Channel.findById(channelId);
    const newMess = {
      _id: new ObjectId(),
      userId,
      imageUrl: imageUrl,
      createdAt: new Date(),
    };
    chatChannel.channelMessages.unshift(newMess);
    await chatChannel.save();

    io.to(channelId).emit("receive-image", newMess);
  } catch (error) {
    console.log("Error when handling image", error);
  }
};

const handleLogin = async (userId) => {
  const chatChannels = await ChatChannel.find({ usersId: { $in: [userId] } });
  this.emit("get-channels", chatChannels);
};

//Sender: A receiver: B
const handleFriendRequest = async (io, { senderId, receiverId }) => {
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);
  const checkIfFriend = sender.friends.some(
    (friend) => friend.userId == receiverId
  );
  if (checkIfFriend) {
    return;
  }
  const existedRequestAtoB = await findExistedPendingFriendRequest(
    senderId,
    receiverId
  );
  if (existedRequestAtoB) {
    console.log("Friend request from A to B is already pending");
    return;
  }
  const existedRequestBtoA = await findExistedPendingFriendRequest(
    receiverId,
    senderId
  );

  if (existedRequestBtoA) {
    const newChannel = await acceptFriendRequest(existedRequestBtoA);
    console.log("newChannel", newChannel);
    await NotificationController.handleSendNotification(
      [sender.FCMtoken],
      `${receiver.nickname} đã chấp nhận lời mời kết bạn của bạn`
    );
    io.to(senderId).emit("new-channel", newChannel);
    io.to(receiverId).emit("new-channel", newChannel);
    io.to(senderId).emit("new-friendStatus", "friend");
    io.to(receiverId).emit("new-friendStatus", "friend");
    addFriendToFriendList(senderId, receiverId);
    addFriendToFriendList(receiverId, senderId);

    console.log("Friend request from B to A is accepted");
  } else {
    const newRequest = new FriendRequestModel({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });
    io.to(senderId).emit("new-friendStatus", "sentRequest");
    io.to(receiverId).emit("new-friendStatus", "sentRequest");
    await newRequest.save();
    await NotificationController.handleSendNotification(
      [receiver.FCMtoken],
      `${sender.nickname} đã gửi cho bạn lời mời kết bạn`
    );
  }
};

const handleResponseRequest = async (io, { requestId, responseValue }) => {
  const request = await FriendRequestModel.findById(requestId);
  const sender = await User.findById(request.sender);
  const receiver = await User.findById(request.receiver);
  if (!request) {
    console.log("Friend request not found");
    return;
  }
  if (responseValue === "accept") {
    const newChannel = await createChannel("New Chat Room", [
      request.sender,
      request.receiver,
    ]);

    request.status = "accepted";
    await request.save();
    await NotificationController.handleSendNotification(
      [sender.FCMtoken],
      `${receiver.nickname} đã chấp nhận lời mời kết bạn của bạn`
    );
    addFriendToFriendList(sender._id, receiver._id);
    addFriendToFriendList(receiver._id, sender._id);
    io.to(request.sender).emit("new-channel", newChannel);
    io.to(request.receiver).emit("new-channel", newChannel);

    io.to(request.sender).emit("new-friendStatus", "friend");
    io.to(request.receiver).emit("new-friendStatus", "friend");

    console.log("Friend request accepted and new chat room created");
  } else if (responseValue === "decline") {
    request.status = "declined";
    await request.save();
    console.log("Friend request declined");
  } else {
    console.log("Invalid status value");
  }
};
const handleUserOffline = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.lastOnline = new Date();
      user.isOnline = 0;
    }
    await user.save();
  } catch (er) {
    console.log(er);
  }
};
const handleUserOnline = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.isOnline = 1;
    }
    await user.save();
  } catch (er) {
    console.log(er);
  }
};
module.exports = {
  handleJoinChatRoom,
  handleSendMessage,
  handleLogin,
  handleFriendRequest,
  handleResponseRequest,
  handleSendImage,
  handleUserOffline,
  handleUserOnline,
};
