import { eq, and } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { userdata } from "../db/schema.js";
import { gettype } from "../controller/dashboard.controller.js";

/**
 * Create a new userdata row
 */
export const createlist = async (title, selected_code, usertext, id) => {
    console.log("createlist input:", { title, selected_code, usertext, id });

    // defensive checks
    if (title == null || selected_code == null || usertext == null) {
        throw new Error("Missing required values for createlist()");
    }
    if (id === undefined || id === null) {
        throw new Error("createlist: missing user id");
    }
    const userId = Number(id);
    if (Number.isNaN(userId)) {
        throw new Error("createlist: id must be numeric");
    }

    // Ensure code/title are strings
    const codeStr = String(selected_code);
    const titleStr = String(title);

    return await db.insert(userdata).values({
        code: codeStr,
        title: titleStr,
        data: String(usertext),
        user_id: userId,
    });
};

/**
 * Show list(s) for a user, optionally filtered by type
 */
export const showlist = async (id) => { 
    const type = gettype();

    if (type !== "all") { 
        console.log(type); 
        return await db.select().from(userdata).where(and(eq(userdata.code, String(type)), eq(userdata.user_id, Number(id)))); 
    } 

    // const y = await db;
    return await db.select().from(userdata).where(eq(userdata.user_id,id));
}


export const verify = async (id1, id2) => {
    if (id1 === undefined || id1 === null) {
        throw new Error("verify: missing id1");
    }
    if (id2 === undefined || id2 === null) {
        throw new Error("verify: missing id2");
    }

    const rowId = Number(id1);
    const userId = Number(id2);
    if (Number.isNaN(rowId) || Number.isNaN(userId)) {
        throw new Error("verify: ids must be numeric");
    }

    return await db
        .select()
        .from(userdata)
        .where(and(eq(userdata.id, rowId), eq(userdata.user_id, userId)));
};

/**
 * Delete an item by id
 */
export const deleteitem = async (id) => {
    if (id === undefined || id === null) {
        throw new Error("deleteitem: missing id");
    }
    const rowId = Number(id);
    if (Number.isNaN(rowId)) {
        throw new Error("deleteitem: id must be numeric");
    }

    return await db.delete(userdata).where(eq(userdata.id, rowId));
};
