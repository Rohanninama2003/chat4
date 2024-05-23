import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory, BrowserRouter as Router } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
        try {
            
            const userInfoString = localStorage.getItem("userInfo");

            if (userInfoString) {
                console.log(userInfoString);
                const userinfo = await JSON.parse(userInfoString);
                setUser(userinfo);
                
            } else {
                setUser(null); // or set to default value as needed
                history.push("/"); // Redirect to login or homepage if user info is not available
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }finally {
          // Set loading state to false once user information is fetched or not found
          setIsLoading(false);
        }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [history]);

if (isLoading) {
  return <div>Loading...</div>;
}
console.log(user);
  return (
    <Router> {/* Wrap ChatProvider with Router */}
      <ChatContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          user,         
          setUser,
          notification,
          setNotification,
          chats,
          setChats,
        }}
      >
        {children}
      </ChatContext.Provider>
    </Router>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;  
