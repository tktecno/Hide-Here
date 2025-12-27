import { emailAlreadyExist, encryptpassword, createRegister, verifyEmail } from "../model/register.service.js";
import { generateToken } from "../model/login.service.js"
import { registerSchema } from "./validation.controller.js";

export const register_submit = async (req, res) => {

    console.log("yes ");
    if (req.user) {
        return res.redirect("/");
    }
    const parsed = registerSchema.safeParse(req.body);
    

    if (!parsed.success) {
        // 2. Format Zod errors for easy usage in the view
        const formatted = parsed.error.format();

        // Keep what user typed so the form is not cleared
        const { email = "", password = "", age = "", username = "" } = req.body;

        // 3. Render template with errors
        return res.render("register", {
            error: "",
            zodErrors: formatted,  // ⚠️ changed key name so it doesn't clash with string errors
            email,
            password,
            age,
            username,
        });
    }
    const { email, password, age, username } = parsed.data;
    console.log(parsed.data);

    if (await emailAlreadyExist(email)) {
        return res.render("register", { error: "Email already exists!", email, password, age, username, zodErrors:null });
    }

    const hashed = await encryptpassword(password);
    console.log("Hashed password:", typeof hashed);

    const id = await createRegister({ email, password: hashed, age, username }).returning({ id: usersTable.id });

    await verifyEmail({email, userid:id});

    const token = await generateToken(email);
    
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("username", token, {
        httpOnly: true,
        secure: isProd,        // false in dev, true in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });
    // return res.render("register", { success: true, error:null,email:null, password:null, age:null, username:null });
    return res.redirect("/");
};
