import uploadOnCloudinary from "../config/cloudinary";
import Post from "../models/post.model";
import User from "../models/user.model";


export const uploadPost = async (req, res) => {
    try{

        const { caption, mediaType } = req.body;

        // checking if user has uploaded any file
        let media;

        if(req.file){
            media = await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message : "Media is Required!"});
        }

        const post = await Post.create({
            caption, 
            media, 
            mediaType,
            author : req.userId
        });

        // fetching the current logged in user and pushing the created post's ID in posts array 
        const user = await User.findById(req.userId);
        user.posts.push(user._id);

        const populatedPost = await Post.findById(post._id).populate("author", "name username profileImage");

        return res.status(201).json(populatedPost);

    }catch(error){
        return res.status(500).json({message : `Upload Post Error ${error.message}`});
    }
}