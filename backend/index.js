import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.get("/", (req, res) => {
    res.status(200).json({
        message : "Hello from Home page"
    })
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening o PORT : ${PORT}`);
});
