import UserActionsTypes from "./actionTypes";

export const loginUser = (payload: { id: string; userName: string }) => ({
  type: UserActionsTypes.LOGIN,
  payload,
});

export const logoutUser = () => ({
  type: UserActionsTypes.LOGOUT,
});

export const updateUserId = (payload: string) => ({
  type: UserActionsTypes.UPDATE,
  payload,
});