import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"login" | "otp">("login");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // localStorage'da tempToken ve accessToken tutacağız
    const [tempToken, setTempToken] = useState<string | null>(
        localStorage.getItem("tempToken")
    );

    // --- Login ---
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://13.61.35.238:8080/api/auth/login", {
                username,
                password,
            });

            if (res.data.twoFactorRequired) {
                // 2FA gerekli → tempToken döndü
                localStorage.setItem("tempToken", res.data.tempToken);
                setTempToken(res.data.tempToken);

                // OTP kodunu backend'e mail attır
                await axios.post("http://13.61.35.238:8080/api/auth/send-otp", {
                    tempToken: res.data.tempToken,
                });

                setStep("otp");
            } else {
                // 2FA yok → access token geldi
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        } catch (err: any) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || "Login failed.");
        }
    };

    // --- Verify OTP ---
    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://13.61.35.238:8080/api/auth/verify-otp", {
                tempToken: tempToken,
                code: otp,
            });

            // Access token kaydet
            localStorage.removeItem("tempToken");
            localStorage.setItem("token", res.data.token);

            navigate("/");
        } catch (err: any) {
            console.error(err.response?.data || err.message);
            setError(err.response?.data?.message || "OTP doğrulanamadı.");
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

            {/* --- Login Step --- */}
            {step === "login" && (
                <form
                    onSubmit={handleLogin}
                    className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-sm"
                >
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
                        Welcome Back
                    </h2>

                    <div className="flex items-center bg-white border border-gray-300 rounded-xl p-3">
                        <div className="text-blue-600 mr-3">
                            <FaUser size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="outline-none w-full text-gray-800 text-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center bg-white border border-gray-300 rounded-xl p-3">
                        <div className="text-blue-600 mr-3">
                            <FaLock size={22} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="outline-none w-full text-gray-800 text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button className="bg-blue-700 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:bg-blue-800">
                        Login
                    </button>
                </form>
            )}

            {/* --- OTP Step --- */}
            {step === "otp" && (
                <form
                    onSubmit={handleVerifyOTP}
                    className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-sm"
                >
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Enter OTP Code
                    </h2>

                    <input
                        type="text"
                        placeholder="Enter the OTP code"
                        className="outline-none w-full border border-gray-300 rounded-xl p-3 text-lg"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button className="bg-purple-600 text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:bg-purple-700">
                        Verify Code
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
