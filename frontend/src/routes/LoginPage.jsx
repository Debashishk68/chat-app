import { useEffect, useState } from 'react';
import gradiant from '../../public/gradiant img.webp'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCamera,
} from "react-icons/ai";
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
const LoginPage=() =>{
  const { mutate:login,isError,isPending,isSuccess } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  useEffect(() => {
    try {
       if (isSuccess) {
        window.location.href = "/dashboard";
        
       } else if (isError) {  
        alert("Invalid credentials, please try again.");
       }
    } catch (error) {
       alert("An error occurred during login. Please try again later.");
    }
  
  }, [isSuccess]);
  
  const handleLogin = (e) => {
    e.preventDefault();
    login({email,password});
  }

    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white w-full max-w-4xl h-[80vh] flex rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side: Login Form */}
          <div className="w-1/2 flex flex-col justify-center p-10">
            <span className="text-3xl mb-2">👋</span>
            <h2 className="text-2xl font-bold mb-6">Welcome back</h2>
            <form className="w-full" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-4 border rounded-md outline-none focus:ring-2 focus:ring-gray-400"
              />
            <div className="relative mb-4">
            <input
                type={showPassword?"text":"password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-400"
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
             
              <div className="text-right text-sm mb-4">
                <a href="#" className="text-gray-500 hover:underline">Forgot your password?</a>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900">
                Log in
              </button>
            </form>
            <Link to="/register" className="mt-6 text-sm">
              First time here? Create an account
            </Link>
          </div>
  
          {/* Right Side: Image */}
          <div className="w-1/2 bg-gray-100 flex items-center justify-center">
            <img
              src={gradiant}
              alt="Login"
              className="w-[100%] object-cover"
            />
          </div>
        </div>
      </div>
    );
  }
  export default LoginPage;