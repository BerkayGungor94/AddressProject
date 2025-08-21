import React, { useState } from "react";
import axios from "axios";

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

            // Token kaydet
            const token = response.data;
            localStorage.setItem("token", token);

            alert("Login successful!");
            window.location.href = "/"; // giriş sonrası anasayfaya yönlendirme
        } catch (err) {
            setError("Login failed, check your credentials.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h2 className="text-xl font-bold text-center">Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
