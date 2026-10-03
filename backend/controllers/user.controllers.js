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