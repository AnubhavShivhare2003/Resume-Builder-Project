import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const SignUp = ({ setCurrenPage }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
       
        let profileImageUrl = "";
        if (!fullName) {
            setError("Please enter full name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please Enter the password");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        setError("");
        //Signup Api Call
        try {
            
        } catch (error) {
            
        }
    };

    return (
        <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-black">Create an Account</h3>
            <p className="text-xs text-slate-700 mt-[5px] mb-6">
                Join us today by entering your details below.
            </p>
            <form onSubmit={handleSignUp}>

                <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    <Input
                        value={fullName}
                        onChange={({ target }) => setfullName(target.value)}
                        label="Full Name"
                        placeholder="John"
                        type="text"
                    />
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="email"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 characters"
                        type="password"
                    />
                </div>

                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>} 

                <button 
                    type="submit" 
                    className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                    SIGN UP
                </button>
                <p className="text-[13px] text-slate-800 mt-3">
                    Already have an account?{" "}
                    <button 
                        type="button"
                        className="font-medium text-primary underline cursor-pointer"
                        onClick={() => setCurrenPage("login")}
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;