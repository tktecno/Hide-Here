import jwt from "jsonwebtoken"


export const autheriser = (req, res, next) => {
  const username = req.cookies?.username;

  // console.log("hey this i ",username); // => undefined
  
  if (!username) {
    req.user = null;
    console.log("No username cookie found");
  } else {
    req.user = jwt.decode(username);
    // console.log("yes");
  }
  res.locals.user =  jwt.decode( username) || null;
  // console.log("decode : ", res.locals.user);


  next();
};
