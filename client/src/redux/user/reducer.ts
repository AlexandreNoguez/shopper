import { generateRandomString } from "../../helpers/formatString";
import UserActionsTypes from "./actionTypes";

interface UserState {
  id: string;
  currentUser: string | null;
}

const initialState: UserState = {
  id: generateRandomString(),
  currentUser: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return {
        ...state,
        id: action.payload.id,
        currentUser: action.payload.userName,
      };
    case UserActionsTypes.LOGOUT:
      const newId = generateRandomString();
      localStorage.setItem("userId", newId.toString()); // Atualiza o localStorage
      return {
        ...state,
        currentUser: null,
        id: newId,
      };
    case UserActionsTypes.UPDATE:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
