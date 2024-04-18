import { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth";
import User from "../models/user";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Authentication required.");
  }

  const foundUser = await User.findOne({ username: user.name });

  if (foundUser && (await foundUser.comparePassword(user.pass))) {
    req.user = foundUser;
    next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Invalid credentials.");
  }
};
