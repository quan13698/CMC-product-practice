const User = require("../Models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { user_name, password } = req.body;
  //Missing id or password
  if (!user_name || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password! Please try again!",
    });
  }
  try {
    //id already used
    const user = await User.findOne({ user_name });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Username have already used",
      });
    }
    // register successfully
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ user_name, password: hashPassword });
    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.TOKEN_SECRET
    );
    return res.status(200).json({
      success: true,
      message: "Register successfully!!",
      data: { newUser, accessToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error!",
    });
  }
};
const login = async (req, res) => {
  const { user_name, password } = req.body;
  //Missing username or password
  if (!user_name || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password! Please try again!",
    });
  }
  try {
    // Incorrect username or password
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password! Please try again!",
      });
    }
    // Username found
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password! Please try again!",
      });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRET
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Server error!",
    });
  }
};
//Get all users
const getAllusers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    size: users.length,
    users,
  });
};
//Get individual user
const getIndividualUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: `Cannot find user with ID: ${userId}`,
    });
  }
  res.status(200).json({
    success: true,
    message: "Successfully!",
    data: user,
  });
};
//Delete User
const deleteUser = async (req,res) => {
    const userId = req.params.id;
    const uPassword = req.password;
    const user = await User.findOneAndDelete({_id: userId, uPassword});
    if(!user){
        return res.status(400).json({
            success: false,
            message: `Cannot find user with ID: ${userId}`
        })
    }
    res.json({
        success: true,
        user,
        message: "Deleted user successfully!",
    })
}
module.exports = {
  register,
  login,
  getIndividualUser,
  getAllusers,
  deleteUser
};
