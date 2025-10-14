import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./friend.css";
import { useParams } from "react-router-dom";

const socket = io("https://whatsapp-backend-y5rr.onrender.com");

function Friend() {
  const [friendInfo, setFriendInfo] = useState();
  const { mobileNumber } = useParams()
  console.log(mobileNumber)
 const messagesEndRef = useRef(null);

   
 

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem(`${mobileNumber}`))
    setFriendInfo(local)
  }, [mobileNumber])


  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [roomId, setRoomId]= useState();

 

useEffect(()=>{
   let userId = JSON.parse(sessionStorage.getItem('user'))
    setClientId(userId._id);
    console.log(clientId, "userIddd")

},[]);

useEffect(() => {
    if (clientId && friendInfo) {
      const id = [clientId, friendInfo._id].sort().join("_");
      setRoomId(id);
       console.log(id,"room")
      // join the private room
      socket.emit("join_private_chat", { roomId: id, userId: clientId });
    }
  }, [clientId, friendInfo]);

  useEffect(() => {


    socket.on("receive_private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {

      socket.off("receive_private_message");
    };
  }, []);

 useEffect(() => {
    if(messagesEndRef.current){
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
}, [messages]);



  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // send message with id
    socket.emit("send_private_message", {roomId, text: message, from: clientId });

    setMessage("");
  };

  const getInitials = (fname, lname) => {
  if (!fname || !lname) return "";
  return `${fname.charAt(0)}${lname.charAt(0)}`;
};
  return (
    <>
      <div className="friendProfile">

        {
          friendInfo && (
            <><div className="pageProfile">
              <div className="pic">
                {getInitials(friendInfo.fname, friendInfo.lname)}
              </div>
              <div>
                <h2>{friendInfo.fname} {friendInfo.lname}</h2>
                <h5>{friendInfo.mobileNumber}</h5>
              </div>

            </div>

            </>

          )
        }
      </div>
      <div className="chatContainer">
        <div className="messagesBox" ref={messagesEndRef}>
          {messages.map((msg, i) => (
            <p
              key={i}
              className={msg.from === clientId ? "myMessage" : "friendMessage"}
            >
              {msg.text}
            </p>
          ))}

        </div>

        <form onSubmit={sendMessage} className="chatMessages">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>

  );
}

export default Friend;


