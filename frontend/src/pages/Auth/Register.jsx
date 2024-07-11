import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMerchant, setIsMerchant] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
    } else {
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("isMerchant", isMerchant);
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            const res = await register(formData).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("User successfully registered");
            navigate(redirect);

        } catch (error) {
            console.error(error);
            toast.error(error.data.message);
        }
    }
};

  return (
    <section className="flex items-center justify-center mt-10 bg-slate-950 pt-12 pb-6 h-[100vh] bg-[url('../src/Images/Header/workplace-business-modern-male-accessories-laptop-black-background.jpg')] bg-cover bg-center w-full">
      <div className="bg-black bg-opacity-80 border border-spacing-64 px-8 pt-4 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl text-center font-semibold mb-4 text-white">Sign Up</h1>
        <form onSubmit={submitHandler} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 px-2 border-b-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 px-2 text-justify border-b-2  w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 px-2 border-b-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 px-2 border-b-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isMerchant"
              className="mr-2"
              checked={isMerchant}
              onChange={(e) => setIsMerchant(e.target.checked)}
            />
            <label htmlFor="isMerchant" className="text-sm font-medium text-white">
              Register as Merchant
            </label>
          </div>

          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium text-white">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              className="mt-1 p-2 px-2 w-full bg-transparent text-white focus:outline-none"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-lime-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-white hover:text-lime-600 transition duration-300"
          >
            {isLoading ? "Sign uping..." : "Sign UP"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="text-center">
          <p className="text-white">
            Already have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-lime-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
