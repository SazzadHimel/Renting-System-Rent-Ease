import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import defaultProfilePicture from '../../Images/Header/workplace-business-modern-male-accessories-laptop-black-background.jpg';

const MerchantProfile = () => {
const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [profilePicture, setProfilePicture] = useState("");
const [isMerchant, setIsMerchant] = useState(false);

const { userInfo } = useSelector((state) => state.auth);

const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

useEffect(() => {
setUserName(userInfo.username);
setEmail(userInfo.email);
setProfilePicture(userInfo.profilePicture);
setIsMerchant(userInfo.isMerchant);
}, [userInfo]);

useEffect(() => {
console.log("Profile Picture URL:", profilePicture);
}, [profilePicture]);

const dispatch = useDispatch();

const submitHandler = async (e) => {
e.preventDefault();
if (password !== confirmPassword) {
    toast.error("Passwords do not match");
} else {
    try {
    const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
        profilePicture,
    }).unwrap();
    dispatch(setCredentials({ ...res }));
    toast.success("Profile updated successfully");
    } catch (err) {
    toast.error(err?.data?.message || err.error);
    }
}
};

const handleProfilePictureChange = (e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onloadend = () => {
    setProfilePicture(reader.result);
};
if (file) {
    reader.readAsDataURL(file);
}
};

return (
    <div className="container pt-40 px-40 pb-20 bg-gray-800 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4">
            <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative">
                <img
                    src={profilePicture || defaultProfilePicture}
                    alt="Profile"
                    className="w-64 h-64 object-cover rounded-full mx-auto border-2 border-white"
                />
                <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleProfilePictureChange}
                />
                </div>
                <button
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="mt-4 bg-lime-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-white hover:text-lime-600 transition duration-300"
                >
                Update Profile Picture
                </button>
                <div className="pt-10">
                <span className="block mb-2 font-semibold text-3xl">This is {isMerchant ? "Proprietor Profile" : "User Profile"}</span>
                </div>
            </div>

            <div className="md:w-2/3 mt-4 md:mt-0 px-20">
                <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                        type="text"
                        placeholder="Enter name"
                        className="form-input px-4 py-2 rounded-lg w-full text-black"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Email Address</label>
                        <input
                        type="email"
                        placeholder="Enter email"
                        className="form-input px-4 py-2 rounded-lg w-full text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                        type="password"
                        placeholder="Enter password"
                        className="form-input px-4 py-2 rounded-lg w-full text-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Confirm Password</label>
                        <input
                        type="password"
                        placeholder="Confirm password"
                        className="form-input px-4 py-2 rounded-lg w-full text-black"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex justify-between py-4">
                        <button
                        type="submit"
                        className="w-full bg-lime-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-lime-600 transition duration-300"
                        >
                        Update Profile Information
                        </button>
                    </div>
                    {loadingUpdateProfile && <Loader />}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MerchantProfile;
