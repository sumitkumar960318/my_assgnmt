import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import "../style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const hardcodedUsername = "user123";
    const hardcodedPassword = "password123";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      navigate("/personalinfo");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="font-[Abel] w-screen h-screen flex justify-center items-center">
      <div className="input-gap w-full flex flex-col gap-4">
        <h1 className="font-bold mx-[20px] text-[#1898A0] text-[2rem] "> Login Page</h1>
        <div className="mx-[1.25rem] flex flex-col gap-1">
          <label
            htmlFor="user_name"
            className="leading-[170%] text-[#020617] text-opacity-[70%] text-[0.875rem]"
          >
            User Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="user_name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="inputs bg-[#F8FAFC] py-[11px] px-[16px] border-[1px] border-[#020617] border-opacity-[6%] rounded-[12px] focus:outline-none focus:border-blue-300"
          />
        </div>

        <div className="mx-[1.25rem] flex flex-col gap-1">
          <label
            htmlFor="password"
            className="leading-[170%] text-[#020617] text-opacity-[70%] text-[0.875rem]"
          >
            Password <span className="text-red-500">*</span>
          </label>
         <div className="relative">
         <input
              type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full inputs bg-[#F8FAFC] py-[11px] px-[16px] border-[1px] border-[#020617] border-opacity-[6%] rounded-[12px] focus:outline-none focus:border-blue-300"
          />
          <div onClick={()=>setShowPassword(!showPassword)} className="absolute top-0 right-[20px] mt-[15px]">
            {showPassword ? <IoEyeOutline/> : <IoEyeOffOutline/>}
          </div>
         </div>
         
        </div>
        {error && <p className="text-red-500 mt-[-14px] text-center text-[14px]">{error}*</p>}
      <button className="mt-[20px] mx-[20px] text-[#ffffff] leading-[170%] bg-[#1898A0] px-[16px] py-[11px] w-[90%] rounded-[12px]" onClick={handleLogin}>Login</button>
      </div>
     
    </div>
  );
};

export default LoginPage;
