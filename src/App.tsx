import React, {  useReducer, useState } from "react";
import "./App.css";
import { Chat } from "./components/Chat/Chat";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { MuiThemeProvider, lightBaseTheme } from "material-ui/styles";
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from "./contexts/User";
import { Dialog, RaisedButton, TextField } from "material-ui";
import { messageReducer, initialMessageState, MessageContextProvider } from "./contexts/Message";

type AppState = {
  modalOpen: boolean;
  userInput: string;
};

function App() {
  const lightMuiTheme = getMuiTheme(lightBaseTheme);
  const [appState, setAppState] = useState<AppState>({
    modalOpen: true,
    userInput: "",
  });

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const userContextValues = {
    userState,
    userDispatch,
  };

  const modalActions = [
    <RaisedButton
      label="Choose"
      primary={true}
      onClick={() => onChooseName()}
    />,
  ];

  const modalStyle: React.CSSProperties = {
    width: "600px",
  };

  const [messageState, messageDispatch] = useReducer(
    messageReducer,
    initialMessageState
  );
  const messageContextValues = {
    messageState,
    messageDispatch,
  };

  const chat = appState.modalOpen ? "" : <MessageContextProvider value={messageContextValues}><Chat /> </MessageContextProvider>;

  function onChooseName() {
    setAppState({ modalOpen: false, userInput: appState.userInput });
    userDispatch({
      type: "add",
      payload : {
        name :appState.userInput,
      }
    });
  }

  function updateInputValue(value: string) {
    setAppState({
      modalOpen: appState.modalOpen,
      userInput: `${value}`,
    });
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onChooseName();
    }
  };
  return (
    <UserContextProvider value={userContextValues}>
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div className="App">
          {chat}
          <Dialog
            title="Choose your name"
            actions={modalActions}
            modal={true}
            open={appState.modalOpen}
            contentStyle={modalStyle}
          >
            <TextField
              autoFocus
              hintText="Write your name here..."
              value={appState.userInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateInputValue(event.target.value)
              }
              onKeyPress={handleKeyPress}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    </UserContextProvider>
  );
}

export default App;
