import { createContext } from "react";
import IMessage from "../interfaces/IMessage";

export interface IMessageState {
  messages: IMessage[];
}

export const initialMessageState: IMessageState = {
  messages: [],
};

export interface IMessageActions {
  type: "add";
  payload: IMessage;
}

export const messageReducer = (
  state: IMessageState,
  action: IMessageActions
) => {
  let item = action.payload;
  let items = [...state.messages];

  switch (action.type) {
    case "add":
      items.push(item);
      state.messages = items;
      return { ...state };
    default:
      return state;
  }
};

export interface IMessageContextProps {
  messageState: IMessageState;
  messageDispatch: React.Dispatch<IMessageActions>;
}

const MessageContext = createContext<IMessageContextProps>({
  messageState: initialMessageState,
  messageDispatch: () => {},
});

export const MessageContextConsumer = MessageContext.Consumer;
export const MessageContextProvider = MessageContext.Provider;
export default MessageContext;
