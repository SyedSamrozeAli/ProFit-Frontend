import React from "react";
import Logo from "/images/image.png";
import Login from "../components/Login.jsx";

function LoginPage() {
  return (
    <div
      className="relative w-full h-screen bg-center bg-cover "
      style={{ backgroundImage: "url('../public/images/3d-gym-equipment.jpg')" }}
    >
        <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-lg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-md flex justify-center">
                    <img src={Logo}  alt="ProFit log" className="h-20 mb-5" />
                </div>
                <div className="bg-black bg-opacity-20 p-8 rounded-xl shadow-lg w-full max-w-md backdrop-blur-lg">
                <p className="w-full flex flex-wrap justify-center align-center text-white pb-7 text-md">Admin Portal</p>
                    <Login />
                </div>
            </div>
    </div>
  );
}

export default LoginPage;
