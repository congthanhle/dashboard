import {
  queryByCollection,
  addItem,
  editItem,
  queryById,
  uploadFileImage,
  deleteItem
} from "~/server/lib/firestore";

export default function () {
  const addProduct = (payload: any) => {
    const { id, ...doc } = payload;
    addItem("products", doc, id);
  };
  const getProduct = async (payload: any) => {
    const productId = payload.id;
    const product = await queryById("products", productId);
    return product;
  };
  const fetchProducts = async () => {
    const products = await queryByCollection("products");
    return products
  };
  const editProduct = async (payload: any) => {
    const path = "products";
    const state = await uploadFileImage(payload.avatarFile, path, payload.id)
      .then((downloadURL) => {
        const imageUrl = downloadURL;
        const { id, image, ...info } = payload;
        const editState = editItem("products", id, { imageUrl, ...info });
        return editState;
      })
      .catch((error) => {
        return error
      });
    return state
  }
  const deleteProduct = (id: string) => {
    deleteItem("products", id);
  }
  return {
    addProduct,
    fetchProducts,
    getProduct,
    editProduct,
    deleteProduct
  };
}
