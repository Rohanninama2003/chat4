


const express=require("express");
const { chats } = require("./data/data");
const dotenv=require("dotenv");
dotenv.config();
const { connectdb } = require("./config/db");
const {notFound,error} =require("./middleware/errorMiddleware")
const userRoutes=require("./Routes/userRoutes").router;
const asyncHandler = require("express-async-handler");
const chatRoutes=require("./Routes/chatRoutes");
const messageRoutes=require("./Routes/messageRoutes");
const port=process.env.port || 4000;
const NODE_ENV=process.env.NODE_ENV || 'production';

const {Chat} = require("./models/ChatModel");

const cors=require('cors');
const path=require('path');
const { createServer } = require("http");
const http = require('http')


const app=express()

connectdb();

app.use(express.json());

app.use(cors({origin:'*'}));


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if ( NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


app.use("/api/user",asyncHandler(userRoutes));
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);
app.use(asyncHandler(notFound));
app.use(asyncHandler(error));


//const Server=app.listen(port, console.log(`server is running on port ${port}`));



//const httpServer = http.createServer(app);
// httpServer.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
 
 
const server = app.listen(4000, console.log(`server start at the ${port}`));

console.log("hello");
const io = require("socket.io")(server, {
  pingTimeout: 60000000,
  cors: {
    origin: "https://chattty-xoi1.onrender.com",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log("setup called")
    // socket.join(userData._id);
    socket.emit("connected")
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stoptyping", (room) => socket.in(room).emit("stoptyping"));

  socket.on("new message", async(newMessageRecieved) => {

      const chatId = newMessageRecieved.chat;
          console.log("chat id: ", newMessageRecieved);
        //  var chat = newMessageRecieved.chat;
         const chat = await Chat.findById(chatId);
          
  
    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      console.log("emiting from users arry");
      console.log("userid: ", user._id)
      console.log("room id: ", newMessageRecieved.chat);
      socket.in(newMessageRecieved.chat).emit("message received", newMessageRecieved);
    });
  });
  socket.on("disconnect", () => {});
});




  // const io = require("socket.io")(Server, {
  //   pingTimeout: 60000,
  //   cors: {
  //     origin: "*",
  //     // credentials: true,
  //   },
  // });
  
  // io.on("connection", (socket) => {
  //   console.log("Connected to socket.io");
  //   socket.on("setup", (userData) => {
  //     socket.join(userData._id);
  //     console.log(userData._id)
  //     console.log("setup completed");
  //     socket.emit("connected");
  //    });
       
  //    socket.on("join chat", (room) => {
  //       socket.join(room);
  //       console.log("User Joined Room: " + room);
  //     });
  //     socket.on("typing", (room) => socket.in(room).emit("typing"));
  //     socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    
  //     socket.on("new message", async (newMessageRecieved) => {
  //       console.log("newmessage",newMessageRecieved)
  //       const chatId = newMessageRecieved.chat;
  //       console.log("chat id: ", chatId);

  //       const chat = await Chat.findById(chatId);
        
  //        console.log("chat",chat)
  //       if (!chat.users) return console.log("chat.users not defined");
        
  //       chat.users.forEach((user) => {
  //         if (user._id == newMessageRecieved.sender._id) return;
  //         socket.in(user._id).emit("message recieved", newMessageRecieved);
       
  //       });
  //     });
    
  //     socket.off("setup", () => {
  //       console.log("USER DISCONNECTED");
  //       socket.leave(userData._id);
  //     });

  //   })
  
  // io.on("connection", (socket) => {
  //   console.log("Connected to socket.io");
    
  //   socket.on("setup", (userData) => {
  //     socket.join(userData._id);
  //     console.log(userData._id);
  //     console.log("setup completed");
  //     socket.emit("connected");
  //   });
  
  //   socket.on("join chat", (room) => {
  //     socket.join(room);
  //     console.log("User Joined Room: " + room);
  //   });
  
  //   socket.on("typing", (room) => socket.in(room).emit("typing"));
  //   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
  //   socket.on("new message", async (newMessageRecieved) => {
  //     console.log("newmessage", newMessageRecieved);
  //     const chatId = newMessageRecieved.chat;
  //     console.log("chat id: ", chatId);
  
  //     const chat = await Chat.findById(chatId);
  //     console.log("chat", chat);
  //     if (!chat.users) return console.log("chat.users not defined");
  
  //     chat.users.forEach((user) => {
  //       if (user._id == newMessageRecieved.sender._id) return;
  //       console.log("message jay che", user._id);
  //       socket.in(user._id).emit("message recieved", newMessageRecieved);
  //     });
  //   });
  

  // });
  
