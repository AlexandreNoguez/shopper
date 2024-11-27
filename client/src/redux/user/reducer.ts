import UserActionsTypes from "./actionTypes";

interface UserState {
  id: number;
  currentUser: string | null;
}

// Recupera o `id` do localStorage ou usa `1` como valor padrão
const savedId = localStorage.getItem("userId");
const initialState: UserState = {
  id: savedId ? parseInt(savedId, 10) : 1,
  currentUser: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case UserActionsTypes.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionsTypes.LOGOUT:
      const newId = state.id + 1;
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
