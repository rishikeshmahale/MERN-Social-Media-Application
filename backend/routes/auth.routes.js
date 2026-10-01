import express from "express";
import { resetPassword, sendOpt, signIn, signout, signUp, verifyOtp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signout);

authRouter.post("/sendOtp", sendOpt);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);



export default authRouter;



