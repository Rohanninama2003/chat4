const express=require("express");
const accessChat=require("../controllers/chatcontroller").accessChat;
const {protect} =require("../middleware/authMiddleware");
const { removeFromGroup, addToGroup } = require("../controllers/chatcontroller");

const router=express.Router();
const fetchChats=require("../controllers/chatcontroller").fetchChats;
const createGroupChat=require("../controllers/chatcontroller").createGroupChat;
const renameGroup=require("../controllers/chatcontroller").renameGroup;

 router.route("/").post(protect,accessChat);
 router.route("/").get(protect,fetchChats);
 router.route("/group").post(protect, createGroupChat);
 router.route("/rename").put(protect, renameGroup);
 router.route("/groupremove").put(protect, removeFromGroup);
 router.route("/groupadd").put(protect, addToGroup);

module.exports = router;