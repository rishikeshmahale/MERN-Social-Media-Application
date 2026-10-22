import uploadOnCloudinary from "../config/cloudinary";
import Loop from "../models/loop.model";
import User from "../models/user.model";



export const uploadLoop = async (req, res) => {
    try{

        const { caption } = req.body;

        let media;

        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message : "Media is required"});
        }

        const loop = await Loop.create({
            caption,
            media,
            author : req.userId
        });

        const user = await User.findById(req.userId);

        user.loops.push(loop._id);

        await user.save();

        const populatedLoop = await Loop.findById(loop._id).populate("author", "name userName profileImage");

        return res.status(201).json(populatedLoop);

    }catch(error){
        return res.status(500).json({message : `Upload Loop Error ${error.message}`});
    }
}



