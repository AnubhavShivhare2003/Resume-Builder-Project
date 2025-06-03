import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";


const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
     const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    //Handle Login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        setError("");
        
        //Login Api Call 
        try {
            const response=await axiosInstance.post(API_PATHS.Auth.LOGIN,{
                email,
                password
            })
            const {token}=response.data;
            if(token){
                localStorage.setItem("token",token);
                updateUser(response.data);
                navigate("/dashboard")
            }
        } catch (error) {
            if(error.response && error.response.data.message){
                setError(error.response.data.message)
            }
            else{
                setError("Something went wrong, Please try again.")
            }
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
            <p className="text-sm text-gray-600 mt-2 mb-8">
                Please enter your details
            </p>
            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email Address"
                    placeholder="john@gmail.com"
                    type="email"
                />

                <Input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="Min 8 Characters"
                    type="password"
                />
                
                {error && (
                    <p className="text-red-500 text-sm font-medium">{error}</p>
                )}
               
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                    {isLoading ? "Logging in..." : "LOGIN"}
                </button>
               
                <p className="text-sm text-gray-700 mt-4 text-center">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="font-medium text-purple-600 hover:text-purple-700 underline cursor-pointer ml-1"
                        onClick={() => setCurrentPage("signup")}
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
