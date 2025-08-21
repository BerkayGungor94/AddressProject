import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            const token = response.data;
            localStorage.setItem("token", token);

            window.location.href = "/adresses";
        } catch (err) {
            setError("Login failed, check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 relative p-4">

            {/* Sağ üst köşe Sign Up */}
            <div className="absolute top-6 right-6">
                <Link
                    to="/auth/register"
                    className="bg-white text-blue-800 font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                >
                    Sign Up
                </Link>
            </div>

            {/* Form container */}
            <form
                onSubmit={handleLogin}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-sm"
            >
                <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
                    Welcome Back
                </h2>

                {/* Username */}
                <div className="flex items-center bg-white border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                    <div className="text-blue-600 mr-3">
                        <FaUser size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        className="outline-none w-full text-gray-800 text-lg placeholder-gray-400"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center bg-white border border-gray-300 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
                    <div className="text-blue-600 mr-3">
                        <FaLock size={22} />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="outline-none w-full text-gray-800 text-lg placeholder-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Hata */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Login Button */}
                <button className="bg-blue-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:bg-blue-800 transition-colors">
                    Login
                </button>

                {/* Forgot password */}
                <p className="text-sm text-center text-gray-700 mt-2">
                    Forgot your password?{" "}
                    <a href="#" className="text-blue-700 hover:underline">
                        Reset
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
