import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://13.61.35.238:8080/api/auth/register", {
                username,
                password,
                email
            });

            setSuccess("User created successfully!");
            setUsername("");
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            navigate("/login");
        } catch (err) {
            setError("User creation failed. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleCreateUser}
                className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h2 className="text-xl font-bold text-center">Create User</h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="email"
                    className="border p-2 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border p-2 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
