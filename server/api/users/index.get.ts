import { queryByCollection, query } from "~/server/lib/firestore";
import type { User } from "~/store/User/state";

let dataProducts: User[] = [];

const unsubscribe = query("users", (docs: any) => {
  dataProducts = docs;
});

export default defineEventHandler(() => dataProducts);