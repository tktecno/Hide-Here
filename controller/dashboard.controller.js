
import { createlist, deleteitem, verify } from "../model/dashboard.service.js";
import { addSchema } from "./validation.controller.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { userdata } from "../db/schema.js";



export const addrequest = async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }

  // Use zod-validated data (safer)
  const parsed = addSchema.safeParse(req.body);

  if (!parsed.success) {
    const { title, usertext } = req.body;
    return res.render("index", { title, usertext, errors: parsed.error.format() });
  }

  const { title, selected_code, usertext } = parsed.data;
  //   console.log(req.body);
  //   console.log(parsed.data);
  console.log(selected_code);

  const { id } = req.user;

  const h = await createlist(title, selected_code, usertext, id);
  // console.log(h);

  return res.redirect("/");
};


export const getdashboard = (req, res) => {
  res.redirect("/");
}

export const getdelete = async (req, res)=>{
  if(!req.user){
    return res.redirect("/");
  }
  // console.log(req.params.id);
  const { id } = req.user;
  
  const v = await verify(req.params.id,id);


  if(v.length)
  {
    await deleteitem(req.params.id);
    console.log(true);
  }
  else{
    console.log(false);
  }

  // console.log(v);


  res.redirect("/");

}

let temptype="all";

export const getfilter = async (req,res)=>{
  const type = req.params.type.toLowerCase();
  const categories = ["all", "text", "link", "snippet", "qourts", "password"];


  if (!categories.includes(type)) {
    temptype = "all";
    res.redirect("/");
  }

  temptype = type;
  res.redirect("/");
}

export const gettype = ()=>{
  return temptype;
}