import {
  queryByCollection,
  addItem,
  editItem,
  queryById,
  uploadFileImage,
  deleteItem,
} from "~/server/lib/firestore";



export default function () {
  const addUser = (payload: any) => {
    const { id, ...doc } = payload;
    addItem("users", doc, id);
  }
  const getUser =  async (payload: any) => {
    const userId = payload.id;
    const user = await queryById("users", userId);
    document.cookie = "user=" + JSON.stringify(user);
    return user;
  }
  const fetchUsers = async () => {
    const users = await queryByCollection("users");
  }
  const editUser = async(payload: any) => {
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
  }
  const deleteUser =  (id: string) => {
    deleteUser(id);
  }

  return {
    addUser,
    getUser,
    editUser,
    fetchUsers
  };
}
