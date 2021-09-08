import React from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import { ChatMessage } from "./ChatMessage";
import { ChatWindow } from "./ChatWindow";

export function Chat() {
  const styles: React.CSSProperties = {
    height: 500,
    width: 500,
    textAlign: "center",
    margin: "20px auto",
    position: "relative",
  };
  return (
    <Paper style={styles} zDepth={2}>
      <ChatWindow />
      <Divider />
      <ChatMessage />
    </Paper>
  );
}
