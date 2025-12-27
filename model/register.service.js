import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";       // ensure .js
import { usersTable } from "../db/schema.js"; // ensure .js
import bcrypt from "bcrypt";
import { emailVerify } from "../db/schema.js";

export const emailAlreadyExist = async (email) => {
    const rows = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return rows.length > 0;   // boolean
};

export const encryptpassword = async (password) => {
    return await bcrypt.hash(password, 5);
};

export const createRegister = async (data)=>{
    console.log(data);
    await db.insert(usersTable).values(data);
}

export const verifyEmail = async ({email,userid})=>{
    await db.insert(emailVerify).values({user_id:userid, email});
}