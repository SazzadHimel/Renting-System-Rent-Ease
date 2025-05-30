import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password, isMerchant } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill all the inputs.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    let profilePicture;
    if (req.file) {
        profilePicture = req.file.path;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isMerchant,
        profilePicture: req.file ? req.file.path : null,
    });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            isMerchant: newUser.isMerchant,
            profilePicture: newUser.profilePicture,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message || "Invalid user data");
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            createToken(res, existingUser._id)
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                isMerchant: existingUser.isMerchant,
                profilePicture: existingUser.profilePicture,
            });
            return
        }
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged Out Successfully!" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users);
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
        })
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.profilePicture = req.file ? req.file.path : user.profilePicture;

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
    }

    if (req.file) {
        user.profilePicture = req.file.path;
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isMerchant: updatedUser.isMerchant,
        profilePicture: updatedUser.profilePicture,
    });
});

const deleteUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.isAdmin) {
        return res.status(400).json({ message: 'Forbidden to delete admin' });
    }

    try {
        await user.deleteOne();
        res.json({ message: "User removed" });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

const getUserByID = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select("-password");

    if (user){
        res.json(user);
    } else{
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserByID = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id);

    if (user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.profilePicture = req.body.profilePicture || user.profilePicture
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isMerchant: updatedUser.isMerchant,
            profilePicture: updatedUser.profilePicture,
        });
    } else{
        res.status(404);
        throw new Error("User not found");
    }
});

export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserByID, getUserByID, updateUserByID };