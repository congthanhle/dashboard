import type { ActionTree, Commit } from "vuex/types/index.js";
import type { UsersState, User } from "~/store/User/state";
import type { RootState } from "~/store/index";
import {
  queryByCollection,
  addItem,
  editItem,
  queryById,
  uploadFileImage,
} from "~/server/lib/firestore";
import { refStorage, storage } from "~/server/lib/firebase";

const { logInUser, registerUser, signOutUser, deleteUser } = useFirebaseAuth();
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
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    document.cookie = "user=" + JSON.stringify(user);
    commit("SET_USER", user);
    return user;
  },
  FETCH_USERS: async ({ commit }: { commit: Commit }) => {
    const users = await queryByCollection("users");
    commit("SET_USERS", users);
  },
  EDIT_USER: async({ commit }: { commit: Commit }, payload) => {
    const path = "users/avatar";
    const state = await uploadFileImage(payload.avatarFile, path, payload.id)
      .then((downloadURL) => {
        const avatar = downloadURL;
        const { id, avatarFile, ...info } = payload;
        const editState = editItem("users", id, { avatar, ...info });
        return editState;
      })
      .catch((error) => {
        return error
      });
    return state
  },
  DELETE_USER: ({ commit }: { commit: Commit }, id) => {
    deleteUser(id);
  },
};

export default actions;
