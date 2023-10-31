import { query } from "~/server/lib/firestore";
import type { Product } from "~/datatypes/Product";

let dataProducts: Product[] = [];

const unsubscribe = query("products", (docs: any) => {
  dataProducts = docs;
});

export default defineEventHandler(() => dataProducts);