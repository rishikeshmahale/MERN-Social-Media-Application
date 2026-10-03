import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    // accessing userId from the Auth.js middleware
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get Current User Error : ${error.message}` });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.userId,
      },
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Suggested User Error : ${error.message}` });
  }
};


export const editProfile = async (req, res) => {
    try{

        const {name, userName, bio, profession, gender } = req.body;

        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(404).json({message : "User Not Found!"});
        }

        const sameUserWithUserName = await User.findOne({userName}).select("password");

        if(sameUserWithUserName && sameUserWithUserName._id != req.userId){
            return res.status(400).json({message : "Username Already Exist!"})
        }

        let profileImage;

        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path);
        }

        user.name = name;
        user.bio = bio;
        user.profession = profession;
        user.gender = gender;
        user.profileImage = profileImage;

        await user.save();

        return res.status(200).json(user);

    }catch(error){
     return res
      .status(500)
      .json({ message: `Edit Profile Error : ${error.message}` });   
    }
}


export const getProfile = async (req, res) => {
    try{

        const userName = req.params.userName;

        const user = await User.findOne({userName}).select("-password");

        if(!user){
            return res.status(404).json({message : "User does not exist!"});
        }

        return res.status(200).json(user);

    }catch(error){
        return res
      .status(500)
      .json({ message: `Get User Profile Error : ${error.message}` });   
    }
}
