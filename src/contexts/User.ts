import { createContext } from 'react';
import IUser from "../interfaces/IUser";


export interface IUserState {
  user : IUser;
}
export const initialUserState: IUserState = {
    user : {
      name:""
    }
};

export interface IUserActions {
    type: 'add';
    payload: IUser;
}



export const userReducer = (state: IUserState, action: IUserActions) => {
    let item = action.payload;

    switch (action.type) {
        case 'add':
            state.user.name = item.name;
            return state;
        default:
            return state;
    }
};

export interface IUserContextProps {
    userState: IUserState;
    userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
    userState : initialUserState,
    userDispatch : () =>{}
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;
export default UserContext;