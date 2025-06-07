import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCamera,
} from "react-icons/ai";
import blending from "../../public/blending.webp";
import useRegisterUser from "../hooks/useRegister";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [profilePic, setProfilePic] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const {
    mutate: registerUser,
    isSuccess: isRegistered,
    isError,
    error: errorMessage,
    isPending,
  } = useRegisterUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && file && !error) {
      registerUser({ name, email, password, file });
    }
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md flex-wrap">
        <div className="text-xl font-bold">Connect</div>
      </nav>

      <div className="w-full flex flex-col items-center justify-center px-4 py-9">
        <span className="text-2xl font-semibold font-sans">
          Create Your account
        </span>
      </div>

      <form onSubmit={handleSubmit} className="w-full rounded-lg space-y-4">
        <div className="px-4 sm:px-[10vw] md:px-[15vw]">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md p-3 bg-gray-100 mb-8 rounded-xl focus:outline-blue-600"
            placeholder="Enter your username "
            required
          />

          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md p-3 bg-gray-100 mb-8 rounded-xl focus:outline-blue-600"
            placeholder="Enter your email "
            required
          />

          <label className="block mb-1 font-medium">Password</label>
          <div className="relative w-full max-w-md">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-xl pr-10 mb-8"
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

          <label className="block mb-1 font-medium">Confirm Password</label>
          <div className="relative w-full max-w-md">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full p-3 bg-gray-100 rounded-xl mb-2 pr-10 ${
                error ? "outline outline-red-500" : ""
              }`}
              placeholder="Enter your password"
              required
            />
            <span
              className="absolute top-3.5 right-4 text-xl cursor-pointer text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible />
              ) : (
                <AiOutlineEye />
              )}
            </span>
            {error && <p className="text-red-500 text-sm mb-6">{error}</p>}
            <div className="w-full flex flex-col items-center justify-center">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-sky-500 mt-2 text-white rounded-xl hover:bg-sky-700 transition"
              >
                {isPending ? "Registering..." : "Register"}
              </button>

              <div className="text-center text-cyan-900 text-sm mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-700 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
