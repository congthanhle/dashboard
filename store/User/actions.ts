import type { ActionTree, Commit } from "vuex/types/index.js";
import type { UsersState } from "~/store/User/state";
import type { RootState } from "~/store/index";
const { registerUser } = useFirebaseAuth();

// import {
//   queryByCollection,
//   addItem,
//   editItem,
//   deleteItem,
// } from "~/server/lib/firestore";

const actions: ActionTree<UsersState, RootState> = {
  LOGIN: ({ commit }: { commit: Commit }, payload) => {
    const { email, password } = payload;
    const state = registerUser(email, password);
    return state;
  },
  FETCH_PRODUCTS: ({ commit }: { commit: Commit }) => {
    // const products = queryByCollection('products')
    // commit("SET_PRODUCTS", products);
  },
  ADD_PRODUCT: ({ commit }: { commit: Commit }, item) => {
    // const addState = addItem("products", item);
    // return addState;
  },
  EDIT_PRODUCT: ({ commit }: { commit: Commit }, item) => {
    // const editState = editItem("products", item.id, item);
    // return editState;
  },
  DELETE_PRODUCT: ({ commit }: { commit: Commit }, id) => {
    // const deleteState = deleteItem("products", id);
    // return deleteState;
  },
};

export default actions;
