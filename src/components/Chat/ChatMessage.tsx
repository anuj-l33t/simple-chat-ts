import React, { useState, KeyboardEvent, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import IMessage from "../../interfaces/IMessage";
import UserContext from "../../contexts/User";
import MessageContext from "../../contexts/Message";

export function ChatMessage() {
  const [inputValue, setInputValue] = useState("");

  const messageContext = useContext(MessageContext);
  const currentUser = useContext(UserContext);

  const sendMessage = () => {
    console.log(`Sent message: ${inputValue}`);
    const message: IMessage = {
      user: currentUser.userState.user,
      message: inputValue,
    };

    messageContext.messageDispatch({ payload: message, type: "add" });
    //messageDispatch({ type: "add", payload: message });
    //console.log(JSON.stringify(messageContext.messageState.messages));
    setInputValue("");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const styles: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "100%",
  };
  const fieldStyle: React.CSSProperties = {
    width: "70%",
  };
  const btnStyles: React.CSSProperties = {
    marginLeft: 25,
  };

  return (
    <div style={styles}>
      <TextField
        placeholder="Write message here.."
        fullWidth={true}
        style={fieldStyle}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <Button style={btnStyles} onClick={sendMessage}>
        {" "}
        Send{" "}
      </Button>
    </div>
  );
}
