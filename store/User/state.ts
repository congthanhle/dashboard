export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  password: string;
}

export interface UsersState {
  users: User[];
  user: User;
}

const state: UsersState = {
  users: [],
  user: {
    id: "",
    username: "",
    avatar: "",
    email: "",
    password: "",
  },
};

export default state;
