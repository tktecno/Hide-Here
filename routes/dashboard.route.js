import { Router } from "express";
import { addrequest, getdashboard, getdelete, getfilter } from "../controller/dashboard.controller.js";

const dashboard = Router();

dashboard.post("/add",addrequest);
dashboard.get("/add",getdashboard);
dashboard.get("/delete/:id",getdelete);
dashboard.get("/:type",getfilter);

export default dashboard;


