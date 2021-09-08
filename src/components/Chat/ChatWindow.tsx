import React, { useContext, useEffect, useState } from "react";
import MessageContext from "../../contexts/Message";
import UserContext from "../../contexts/User";
import IMessage from "../../interfaces/IMessage";

export function ChatWindow() {
  const messageContext = useContext(MessageContext);
  const userContext = useContext(UserContext);
  const style: React.CSSProperties = {
    backgroundColor: "#eaeaea",
    padding: 15,
    height: "420px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
  };
  const [messages, setMessages] = useState<IMessage[]>(
    messageContext.messageState.messages
  );
  //const [List, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log("Use effect ran");
    console.log(JSON.stringify(messages));
    setMessages(messageContext.messageState.messages);
    console.log(JSON.stringify(messages));
  }, [messageContext, messages]);

  const msg = messages.map((message: IMessage, i: number) =>
    renderMessage(message, i)
  );

  function renderMessage(message: IMessage, i: number) {
    const style: React.CSSProperties = {
      display: "block",
      margin: "5px 0",
    };

    const isMe = userContext.userState.user === message.user;
    const floatDirection = isMe ? "right" : "left";
    const nameColor = isMe ? "green" : "red";
    const margin = isMe ? " 0 0 0 40px" : "0 40px 0 0 ";

    const textStyle: React.CSSProperties = {
      float: floatDirection,
      backgroundColor: "#fff",
      padding: "6px 10px",
      borderRadius: "15px",
      margin: margin,
      textAlign: "left",
    };

    const nameStyle: React.CSSProperties = {
      color: nameColor,
      float: floatDirection,
    };

    return (
      <div key={i} style={style}>
        <span style={textStyle}>
          <span style={nameStyle}>{message.user.name}</span>
          <br />
          {message.message}
        </span>
      </div>
    );
  }
  return <div style={style}>{msg}</div>;
}
