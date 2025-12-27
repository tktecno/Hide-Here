import { Router } from "express";
import { get_login } from "../controller/login.controller.js";

const authRoute = Router();

export const login = (req,res)=>{
    if(req.user){
        res.redirect("/");
    }
    else{

        res.render("login",{username:null, password:null});
    }
}
export const register = (req,res)=>{
    if(req.user){
        res.redirect("/");
    }
    else{
        res.render("register",{success: null, error:null,email:null, password:null, age:null, username:null,zodErrors:null});
    }
}
 authRoute.post("/login_submit",get_login);


 authRoute.get("/logout",(req,res)=>{
    res.clearCookie("username");
    res.redirect("/");
 })




 export const authentication = authRoute;


