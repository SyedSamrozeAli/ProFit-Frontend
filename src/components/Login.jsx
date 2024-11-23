import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/ContextAuth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth(); // Destructure login function from useAuth

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        axios.post("http://profit-backend.test/api/admin/auth/login", data)
            .then((response) => {
                if (response.data.success) {
                    console.log("Login Successful: ", response);

                    const token = response.data.data.token;
                    localStorage.setItem("token", token); // Store token in localStorage
                    
                    // Update the authentication state in context
                    setIsAuthenticated("true");

                    setEmail("");
                    setPassword("");
                    const successToast = toast.success("Logged In Successfully");
                    toast.update(successToast, {
                        autoClose: 1500,
                    });

                    navigate("/admin"); // Redirect to dashboard
                }
            })
            .catch((error) => {
                console.log("error", error.response);
                if (error.response && error.response.data && error.response.data.message) {
                    const emailError = error.response.data.message.email
                        ? error.response.data.message.email[0]
                        : null;
                    const passError = error.response.data.message
                        ? error.response.data.message[0]
                        : null;

                    const errorMsg =
                        emailError || passError || "Invalid Credentials, Please Enter Correct Details";
                    toast.error(errorMsg);
                } else {
                    toast.error("Invalid Response, Please Try Again Later!");
                }
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-white">Email</label>
                    <input
                        placeholder="abc@gmail.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-gray-500 mt-1 block w-full px-2 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-black-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-white">Password</label>
                    <input
                        type="password"
                        placeholder="abc12345"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-gray-500 mt-1 block w-full px-2 py-2 border border-gray-300 outline-none rounded-md shadow-sm focus:ring-black-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-5">
                    <p className="text-white text-sm">Forgot Password?</p>
                </div>

                <div className="mb-5">
                    <button className="bg-red-600 text-md text-white py-2 mt-3 rounded-lg cursor-pointer w-full">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
