export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  timestamp: number;
  address: string;
  phoneNumber: string,
  role: string,
}
export interface UsersState {
  users: User[];
  user: User;
}
let userData: User = {
  id: "",
  username: "",
  avatar: "",
  email: "",
  timestamp: 0,
  address: "",
  phoneNumber: "",
  role: "",
}
const state: UsersState = {
  users: [],
  user: userData
};

export default state;
