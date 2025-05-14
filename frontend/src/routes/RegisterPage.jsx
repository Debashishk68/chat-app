import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCamera,
} from "react-icons/ai";
import blending from '../../public/blending.webp'
import useRegisterUser from "../hooks/useRegister";
import { IoPersonCircleOutline } from "react-icons/io5";
import {Link} from "react-router-dom"

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
  } = useRegisterUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && file) {
      registerUser({ name, email, password, file });
    }
    console.log({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side: Registration Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Create an account
          </h2>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center justify-center mb-6">
            <label
              htmlFor="profilePic"
              className="cursor-pointer flex flex-col items-center group"
            >
              <div className="relative w-28 h-28">
                {profilePic ? (
                  <img
                    src={profilePic || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <IoPersonCircleOutline className="w-full h-full rounded-full text-zinc-500 object-cover border-4 border-gray-300 shadow-lg transition-transform duration-300 group-hover:scale-110" />
                )}

                {/* Overlay with "Upload Profile" text */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full text-white text-sm font-semibold">
                  <AiOutlineCamera className="text-white w-8 h-8 mb-1" />
                  <span>Upload Profile</span>
                </div>
              </div>
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {/* Upload Image text below */}
            <p className="mt-2 text-sm text-gray-600">
              Upload an image for your profile
            </p>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field with Eye Icon */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pr-10 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Confirm Password Field with Eye Icon */}
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={`w-full p-3 pr-10 border rounded-md outline-none focus:ring-2 ${
                  error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-gray-400"
                }`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-4 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition duration-300"
              disabled={error !== ""}
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-black">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
          <img
            src={blending}
            alt="Register"
            className="w-[100%] h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
