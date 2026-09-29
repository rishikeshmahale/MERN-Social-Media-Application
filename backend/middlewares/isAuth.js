import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try{

        const token = req.cookies.token;

        if(!token){
            return res.status(404).json({message : "Token Not found"})
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        // we will create a userId key in req object
        req.userId = verifyToken.userId;

        next();

    }catch(error){
        return res.status(500).json({message : `isAuth Error : ${error.message}`})
    }
}

export default isAuth;