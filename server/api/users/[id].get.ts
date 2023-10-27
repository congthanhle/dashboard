import { queryById } from "~/server/lib/firestore";

export default defineEventHandler((req) => {  
    const id = (req.context.params as Record<string, string>).id;  
    const user = queryById('users', id);
    return user;
});  