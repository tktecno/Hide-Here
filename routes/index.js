import { Router } from "express";
import { login } from "./auth.routes.js";
import { register } from "./auth.routes.js";
import about from "../controller/about.controller.js";
import blog from "../controller/blog.controller.js";
import { register_submit } from "../controller/register.controller.js";
import jwt from "jsonwebtoken";
import { showlist } from "../model/dashboard.service.js";

const routes = Router();

routes.get("/", async (req, res) => {

    let cookie = false;
    if (req.cookies.username) {
        cookie = true;
        let items = await showlist(req.user.id) || [];

        items.map((curr)=>{
            if(!curr.data.startsWith("http://") && !curr.data.startsWith("https://") && curr.code==="link"){
                curr.data = "https://" + curr.data;
            }
        })
        
        res.render("index", { cookie, title: null, usertext: null, items });
    }
    else {
        res.render("index", { cookie, title: null, usertext: null });
    }
        
})
routes.get("/login", login);
routes.get("/register", register);
routes.get("/about", about);
routes.get("/blog", blog);
routes.post("/register_submit", register_submit)





export default routes;