import express from "express"
import routes from "./routes/index.js";
import { authentication } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { autheriser } from "./controller/autheriser.controller.js";
import z from "zod";
import session from "express-session";
import dashboard from "./routes/dashboard.route.js";


const app = express();


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("your-secret"));
app.use(session({
    secret:"hide here",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}));
app.use(autheriser);


app.get('/favicon.ico', (req, res) => res.status(204).end());




app.use(routes);
app.use(authentication);
app.use(dashboard)

app.listen(3000,(req, res)=>{
    console.log("Server working on ",3000);
})