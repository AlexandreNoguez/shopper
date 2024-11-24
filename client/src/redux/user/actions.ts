import UserActionsTypes from "./actionTypes";

export const loginUser = (payload: string) => ({
  type: UserActionsTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: UserActionsTypes.LOGOUT,
});
