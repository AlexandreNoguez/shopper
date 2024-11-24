import UserActionsTypes from "./actionTypes";

interface UserState {
  id: number;
  currentUser: string | null;
}

const initialState: UserState = {
  id: 1,
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
      const id = state.id + 1;
      return {
        ...state,
        currentUser: null,
        id: id,
      };
    default:
      return state;
  }
};

export default userReducer;
