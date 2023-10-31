import {
  queryByCollection,
  addItem,
  editItem,
  queryById,
  uploadFileImage,
  deleteItem
} from "~/server/lib/firestore";

export default function () {
  const addProduct = async (payload: any) => {
    const path = "products";
    const timestamp = new Date().getTime();
    const state = await uploadFileImage(payload.imageFile, path, payload.id)
      .then((downloadURL) => {
        const imageUrl = downloadURL;
        const {imageFile, ...info } = payload;
        const addState = addItem("products", {imageUrl, timestamp, ...info});
        return addState;
      })
      .catch((error) => {
        return error
      });
    return state
  };
  const getProduct = async (id: string) => {
    const product = await queryById("products", id);
    return product;
  };
  const fetchProducts = async () => {
    const products = await queryByCollection("products");
    return products
  };
  const editProduct = async (payload: any) => {
    const path = "products";
    const state = await uploadFileImage(payload.imageFile, path, payload.id)
      .then((downloadURL) => {
        const imageUrl = downloadURL;
        const {id, imageFile, ...info } = payload;
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
