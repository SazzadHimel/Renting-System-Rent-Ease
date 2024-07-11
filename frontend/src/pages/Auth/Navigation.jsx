import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineProfile, AiOutlineShoppingCart, AiOutlineUserAdd, AiOutlineUnorderedList, AiOutlineCreditCard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHeart} from "react-icons/fa";
import "./Navigation.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

function Navigation() {
    const { userInfo } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }
    const closeSidebar = () => {
        setShowSidebar(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div
            style={{ zIndex: 999 }}
            className={`navigation-container ${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden py-2 flex-col justify-between px-2 text-white bg-blue-950 h-[100vh] fixed xl:top-0 xl:flex-row xl:h-auto xl:w-full xl:justify-around`}
        >
            <div className="flex items-center justify-between xl:justify-start xl:items-center space-x-2 xl:space-x-4 xl:space-y-0 xl:flex-row xl:py-2 xl:px-4 xl:bg-blue-950">
                <div className="flex items-center space-x-2 xl:space-x-4">
                    <img src="/src/Images/Logo/Logo.jpg" alt="Logo" className="xl:w-14 xl:h-14 w-10 h-10 object-contain" />
                    <h1 className="xl:block text-white text-2xl font-bold">RENT EASE</h1>
                </div>
                <div className="flex px-10 items-center space-x-2 xl:space-x-4">
                    <Link to="/" className="flex items-center transition-transform hover:translate-x-2 xl:hover:translate-x-0 xl:hover:translate-y-2">
                        <AiOutlineHome className="mr-2 xl:mr-0 xl:mt-0" size={18} />
                        <span className="hidden xl:inline-block text-white">HOME</span>
                    </Link>
                    <Link to="/category" className="flex items-center transition-transform hover:translate-x-2 xl:hover:translate-x-0 xl:hover:translate-y-2">
                        <AiOutlineUnorderedList className="mr-2 xl:mr-0 xl:mt-0" size={18} />
                        <span className="hidden xl:inline-block text-white">CATEGORY</span>
                    </Link>
                </div>
                <div className="flex items-center border-b-2 border-white">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="search-input bg-transparent border-none text-white px-2 py-1 focus:outline-none"
                    />
                    <AiOutlineSearch size={18} className="text-white ml-3" />
                </div>
            </div>


            <div className="flex">
                <button
                    onClick={toggleDropdown}
                    className="flex xl:flex-row px-2 items-center justify-center xl:h-full text-white focus:outline-none"
                >
                    {userInfo ? (
                        
                        <>
                            {!userInfo.isMerchant && !userInfo.isAdmin && (
                                <ul className="flex">
                                    <li className="px-2">
                                        <Link
                                            to="/wishlist"
                                            className="flex items-center relative transition-transform transform hover:translate-y-2"
                                        >
                                            <FaHeart className="mr-2 mt-1" size={18} />
                                            <span className="absolute top-0 right-0 rounded-full bg-lime-600 w-4 h-4 text-white text-[12px] leading-tight text-center">0</span>
                                        </Link>
                                    </li>
                                    <li className="px-2">
                                        <Link
                                            to="/cart"
                                            className="flex items-center relative transition-transform transform hover:translate-y-2"
                                        >
                                            <AiOutlineShoppingCart className="mr-2 mt-1" size={18} />
                                            <span className="absolute top-0 right-0 rounded-full bg-lime-600 w-4 h-4 text-white text-[12px] leading-tight text-center">0</span>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                            {/* <img
                                src={`C:/${userInfo.profilePicture}`}
                                alt="Profile"
                                className="w-8 h-8 rounded-full mr-2"
                            /> */}
                            <span className="text-white">{userInfo.username}</span>
                        </>
                    ) : (
                        <></>
                    )}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180 transition-transform duration-300" : "transition-transform duration-300"}`}
                            fill="none"
                            viewBox="0 0 26 26"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    
                    )}
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute items-center justify-center right-30 mt-8 py-2 w-48 bg-blue-950 rounded-md opacity-90 ${!userInfo.isAdmin ? "top-11" : "top-11"}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" className="block  px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Dashboard
                                    </Link>
                                    <Link to="/admin/productlist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Renting List
                                    </Link>
                                    <Link to="/admin/categorylist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Categories
                                    </Link>
                                    <Link to="/admin/userlist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Users Info
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full px-4 py-2 text-left text-white hover:bg-white hover:text-blue-950">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {userInfo.isMerchant && (
                            <>
                                <li>
                                    <Link to="/proprietorprofile" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Profile
                                    </Link>
                                    <Link to="/merchant/productlist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Renting List
                                    </Link>
                                    <Link to="/merchant/categorylist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Categories
                                    </Link>
                                    <Link to="/merchant/orderlist" className="block px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Rents
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full px-4 py-2 text-left text-white hover:bg-white hover:text-blue-950">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        {!userInfo.isMerchant && !userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/profile" className="block text-center px-4 py-2 text-white hover:bg-white hover:text-blue-950">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={logoutHandler}
                                        className="block  px-4 py-2 w-full  text-white hover:bg-white hover:text-blue-950">
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                        
                    </ul>
                )}
                {!userInfo && (
                    <ul className="flex xl:flex-row xl:items-center justify-center">
                        <li className="flex items-center justify-center flex-col xl:flex-row">
                            <Link to="/sign-up" className="flex items-center transition-transform hover:translate-x-2 xl:hover:translate-x-0 xl:hover:translate-y-2">
                                <AiOutlineUserAdd className="mr-2 mt-[2rem] xl:mt-0" size={18} />
                                <span className="hidden mr-3 nav-item-name mt-[2rem] xl:mt-0 xl:block">SIGN UP</span>
                            </Link>
                            <Link to="/login" className="flex items-center transition-transform hover:translate-x-2 xl:hover:translate-x-0 xl:hover:translate-y-2">
                                <AiOutlineLogin className="mr-2 mt-[2rem] xl:mt-0" size={18} />
                                <span className="hidden mr-3 nav-item-name mt-[2rem] xl:mt-0 xl:block">LOGIN</span>
                            </Link>
                        </li>
                    </ul>                
                )}
            </div>
        </div>
    );
}

export default Navigation;
