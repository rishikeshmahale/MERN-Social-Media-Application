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


export const like = async (req, res) => {
    try{

        const loopId = req.params.loopId;

        const loop = await Loop.findById(loopId);

        if(!loop){
            return res.status(404).json({message : "Loop Not Found!"});
        }

        const alreadyLiked = loop.likes.some((id) => id.toString() == req.userId.toString());

        if(alreadyLiked){
            loop.likes = post.likes.filter((id) => id.toString() != req.userId.toString());
        }else{
            loop.likes.push(req.userId);
        }

        await loop.save();
        loop.populate("author", "name userName profileImage");

        return res.status(200).json(loop);

    }catch(error){
          return res.status(500).json({message : `Like Loop Error ${error.message}`});
    }
}

export const comment = async (req, res) => {
    try{

        const { message } = req.body;
        const loopId = req.params.loopId;

        const loop = await post.findById(loopId);

        if(!loop){
            return res.status(404).json({message : "Loop not found!"})
        }

        loop.comments.push({
            author : req.userId,
            message 
        });

        await loop.save();

        loop.populate("author", "name userName profileImage");
        loop.populate("comments.author");

        return res.status(200).json(loop)

    }catch(error){
        return res.status(500).json({message : `Comment Loop Error ${error.message}`});
    }
}


export const getAllLoops = async (req, res) => {
    try{

        const loops = await Loop.find({author : req.userId}).populate("author", "name userName profileImage");

        if(!loops){
            return res.status(404).json({message : "No Loops yet!"})
        }

        return res.status(200).json(loops);

    }catch(error){
        return res.status(500).json({message : `Get All Loops Error ${error.message}`});
    }
}
