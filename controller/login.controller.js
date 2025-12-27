import { authentication } from "../model/login.service.js";
import { generateToken } from "../model/login.service.js";


export const get_login = async (req,res)=>{

    if(req.user){
        console.log("yes");
        res.redirect("/")
    }
    else{

    const {username, password} = req.body;
    const verify = await authentication({username, password});
    console.log(verify);

    if(!verify){
        // console.log("not");
        res.render("login",{error:"Unknown username or password",username,password})
    }
    else{

        const token = await generateToken(username);
        
        // res.setHeader("Set-cookie",[
        //     "username=true; HttpOnly; Max-Age=3600",
        //     "theme=dark; Max-Age=3600"
        // ]);

        const isProd = process.env.NODE_ENV === "production";
        res.cookie("username", token, {
            httpOnly: true,
            secure: isProd,        // false in dev, true in production
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
          });
        // res.render("index",{error:null,username:null,password:null})
        res.redirect("/");
    }
}
}