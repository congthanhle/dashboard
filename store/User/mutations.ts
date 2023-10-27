import type { MutationTree } from "vuex/types/index.js";
import type { UsersState, User } from "~/store/User/state";

const mutations: MutationTree<UsersState> = {
  SET_USER: (state: UsersState, payload) => {
    state.user = payload;
  },
  SET_USERS: (state: UsersState, payload) => {
    state.users = payload;
    
  },
};
export default mutations;
