import type { ActionTree, Commit } from "vuex/types/index.js";
import type { UsersState } from "~/store/User/state";
import type { RootState } from "~/store/index";
import {
  queryByCollection,
  addItem,
  editItem,
  deleteItem,
  queryById,
} from "~/server/lib/firestore";
const { logInUser, registerUser, signOutUser } = useFirebaseAuth();

const actions: ActionTree<UsersState, RootState> = {
  LOGIN: ({ commit }: { commit: Commit }, payload) => {
    const { email, password } = payload;
    const state = logInUser(email, password);
    return state;
  },
  LOGOUT: ({ commit }: { commit: Commit }) => {
    const user = {
      id: "",
      username: "",
      avatar: "",
      email: "",
      timestamp: 0,
    };
    const state = signOutUser();
    commit("SET_USER", user);
    return state;
  },
  REGISTER: ({ commit }: { commit: Commit }, payload) => {
    const state = registerUser(payload);
    return state;
  },
  ADD_USER: ({ commit }: { commit: Commit }, payload) => {
    const { id, ...doc } = payload;
    addItem("users", doc, id);
  },
  GET_USER: async ({ commit }: { commit: Commit }, payload) => {
    const userId = payload.id;
    const user = await queryById("users", userId);
    commit("SET_USER", user);
  },
};

export default actions;
