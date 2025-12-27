import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { usersTable } from "../db/schema.js";
import bcrytp from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export const authentication = async ({username,password})=>{

    const user = await db.select().from(usersTable).where(eq(usersTable.email,username))

    if(user.length){

        const userpass = await bcrytp.compare(password,user[0].password);
        // console.log(userpass);
        return (user.length>0)&&userpass;
    }
    else {
        return false;
    }

    // console.log(user[0].password," ", password);
}

export const generateToken = async(input)=>{

    const [data]= await db
    .select()
    .from(usersTable)
    .where(
        eq(usersTable.email,input)
    );

    const { id,username, age, email } = data;

    console.log(jwt.sign({ username, age, email },process.env.SECRATE_TOKKEN,{expiresIn:"1d",}));


    return jwt.sign({id, username, age, email },process.env.SECRATE_TOKKEN,{expiresIn:"1d",
});

}