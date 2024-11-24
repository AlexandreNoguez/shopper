interface User {
  id: number | null;
  userName: string | null;
  isLogged: boolean;
}

type UserAction = {
  type: string;
  payload: User;
};

type DispatchType = (args: UserAction) => UserAction;
