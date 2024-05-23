const express=require("express")
const registerUser=require("../controllers/usercontroller").registerUser
const authUser = require("../controllers/usercontroller").authUser
const router=express.Router()
const allUsers=require("../controllers/usercontroller").allUsers
const protect=require("../middleware/authMiddleware").protect

router.route("/").post(registerUser).get(protect,allUsers);
router.route("/login").post(authUser);


module.exports={router};