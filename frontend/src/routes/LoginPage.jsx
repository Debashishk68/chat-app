import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const { mutate: login, isError, isPending, isSuccess,error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
    if (isError) {
      toast.error("Login failed." + (error?.message || "Please try again later."));
    }
  }, [isSuccess, isError]);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md flex-wrap">
        <div className="text-xl font-bold">Connect</div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <Link to="/">
            <button className="text-sm sm:text-base">Download</button>
          </Link>
          <Link to="/register">
            <button className="px-4 py-2 bg-gray-200 rounded-xl text-sm sm:text-base">
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-medium mb-8">
          Log in to Connect
        </h2>
      </div>

      <form onSubmit={handleLogin} className="w-full rounded-lg space-y-4">
        <div className="px-4 sm:px-[10vw] md:px-[15vw]">
          <label className="block mb-1 font-medium">Username or email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md p-3 bg-gray-100 mb-8 rounded-xl focus:outline-blue-600"
            placeholder="Enter your username or email"
            required
          />

          <label className="block mb-1 font-medium">Password</label>
          <div className="relative w-full max-w-md">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl pr-10"
              placeholder="Enter your password"
              required
            />
            <span
              className="absolute top-3.5 right-4 text-xl cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <button
            type="submit"
            className="w-fit px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-700 transition"
          >
            {isPending ? "Logging in..." : "Log In"}
          </button>

          <div className="text-center text-cyan-900 text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-700 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
