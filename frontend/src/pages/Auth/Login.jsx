import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth)
  const { search } = useLocation()

  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <section className="flex items-center justify-center mt-10 bg-slate-950 pt-12 pb-6 h-[100vh] bg-[url('../src/Images/Header/workplace-business-modern-male-accessories-laptop-black-background.jpg')] bg-cover bg-center w-full">
      <div className="bg-black bg-opacity-80 border border-spacing-64 px-8 pt-4 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl text-center font-semibold mb-4 text-white">Login</h1>
        <form onSubmit={submitHandler} className="space-y-3">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-1 px-2 border-b-2 text-justify w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-1 px-2 border-b-2 w-full bg-transparent text-white focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required/>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-lime-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-white hover:text-lime-600 transition duration-300"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <Link to={redirect ? `/sign-up?redirect=${redirect}` : "/sign-up"} className="text-lime-600 hover:underline">
              Sign-Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
