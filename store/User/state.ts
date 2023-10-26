export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  timestamp: number;
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
    timestamp: 0
  },
};

export default state;
