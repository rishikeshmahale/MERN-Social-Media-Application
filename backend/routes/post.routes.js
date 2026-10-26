import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { uploadPost, getAllPosts, like, saved, comment } from "../controllers/post.controllers.js";

const postRouter = express.Router();

import { upload } from "../middlewares/multer.js";

postRouter.post("/upload", isAuth, upload.single("media"), uploadPost);
postRouter.get("/getAll", isAuth, getAllPosts);
postRouter.get("/like/:postId", isAuth, like);
postRouter.get("/saved/:postId", isAuth, saved);
postRouter.post("/comment/:postId", isAuth, comment);


export default postRouter;

