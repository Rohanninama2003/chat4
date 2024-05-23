const asyncHandler = require("express-async-handler");
const {Message} = require("../models/messageMode");
const User = require("../models/userModel");
const { Chat } = require("../models/ChatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  console.log("newmessage:",newMessage);

  try {
    
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    console.log('Populated sender:', message.sender);
    
    message = await message.populate("chat");
    console.log('Populated chat:', message.chat);
    
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    console.log('Populated chat users:', message.chat.users);

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
    console.log("tatti")
  } catch (error) {
   
    res.status(400);

    throw new Error(error.message);
    
  }
});

module.exports = { allMessages, sendMessage };