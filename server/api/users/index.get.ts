import { query } from "~/server/lib/firestore";
import type { User } from "~/datatypes/User";

let dataProducts: User[] = [];

const unsubscribe = query("users", (docs: any) => {
  dataProducts = docs;
});

export default defineEventHandler(() => dataProducts);