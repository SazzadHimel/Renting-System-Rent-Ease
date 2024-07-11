import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserByID, getUserByID, updateUserByID } from "../controllers/userController.js";
import { authenticate, authorizeAdmin, authorizeUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; 


const router = express.Router();

router.route("/").post(upload.single('profilePicture'), createUser).get(authenticate, authorizeUser, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, upload.single('profilePicture'), updateCurrentUserProfile);

router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserByID)
    .get(authenticate, authorizeUser, getUserByID)
    .put(authenticate, authorizeAdmin, updateUserByID);

export default router;
