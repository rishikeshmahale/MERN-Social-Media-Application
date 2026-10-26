import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


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
        user.posts.push(post._id);

        const populatedPost = await Post.findById(post._id).populate("author", "name userName profileImage");

        return res.status(201).json(populatedPost);

    }catch(error){
        return res.status(500).json({message : `Upload Post Error ${error.message}`});
    }
}


export const getAllPosts = async (req, res) => {
    try{

        const posts = await Post.find({}).populate("author", "name userName profileImage").sort({createdAt : -1});

        if(!posts){
            return res.status(404).json({message : "No Posts yet!"})
        }

        return res.status(200).json(posts);

    }catch(error){
        return res.status(500).json({message : `Get All Post Error ${error.message}`});
    }
}


export const like = async (req, res) => {
    try{

        const postId = req.params.postId;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message : "Post Not Found!"});
        }

        const alreadyLiked = post.likes.some((id) => id.toString() == req.userId.toString());

        if(alreadyLiked){
            post.likes = post.likes.filter((id) => id.toString() != req.userId.toString());
        }else{
            post.likes.push(req.userId);
        }

        await post.save();
        await post.populate("author", "name userName profileImage");

        return res.status(200).json(post);

    }catch(error){
          return res.status(500).json({message : `Like Post Error ${error.message}`});
    }
}


export const comment = async (req, res) => {
    try{

        const { message } = req.body;
        const postId = req.params.postId;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message : "Post not found!"})
        }

        post.comments.push({
            author : req.userId,
            message 
        });

        await post.save();

        await post.populate("author", "name userName profileImage");
        await post.populate("comments.author");

        return res.status(200).json(post)

    }catch(error){
        return res.status(500).json({message : `Comment Post Error ${error.message}`});
    }
}


export const saved = async (req, res) => {
    try{
        
        const postId = req.params.postId;

        const post = await Post.findById(postId);

        const user = await User.findById(req.userId);

        if(!post){
            return res.status(404).json({message : "Post you're trying to saved not found!"});
        }

        const alreadySaved = user.saved.some((id) => id.toString() == postId.toString());

        if(alreadySaved){
            user.saved = user.saved.filter((id) => id.toString() != postId.toString())
        }else{
            user.saved.push(postId);
        }

        await user.save();

        await user.populate("saved");

        return res.status(200).json(user);

    }catch(error){
        return res.status(500).json({message : `Saved Post Error ${error.message}`});
    }
}

