import React, { useState } from "react";
import Img1 from "../assets/Img1.png"
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login"
import SignUp from "../pages/Auth/SignUp"
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
const LandingPage = () => {
    const {user}= useContext(UserContext)
  
    const navigate=useNavigate();

  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login")

  const handleCTA = () => {
     if(!user){
        setOpenAuthModal(true)
     }
     else{
        navigate("/dashboard")
     }
  };

  const handleModalClose = () => {
    setOpenAuthModal(false);
    setCurrentPage("login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Resume Builder</div>
            {user ? <ProfileInfoCard/>:<button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={()=>setOpenAuthModal(true)}
            >
                Login/Sign Up
                </button>}
        </header>
      {/*Hero Content*/}
      <div className="flex flex-col md:flex-row items-center ">
        <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
                Build Your{" "}
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                    Resume Efforlessly
                </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
                Craft a standout resume in minutes with our smart and intutive
                resume builder
            </p>
            <button
            className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={handleCTA}
            >
                Get Started
            </button>
        </div>
        <div className="w-full md:w-1/2">
            <img src={Img1}
            alt="Hero Image"
            className="w-full rounded-lg"
            />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-12">
            Features That Make You Shine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition ">
                <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
                <p className="text-gray-600">
                    Update your resume sections with live preview and instant 
                    formatting.
                </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-3">
                    Beautiful Templates
                </h3>
                <p className="text-gray-600">
                    Choose from mordern, professional templates that are easy to 
                    customeize.
                </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-3">One-click Export</h3>
                <p className="text-gray-600">
                    Download your resume instantly as a high-quality pdf with one 
                    click.
                </p>
            </div>
        </div>
      </section>

      </div>
      <footer className="text-sm bg-gray-50 text-gray-600 text-center p-5 mt-auto">
        Made With ❤️... Happy Coding
      </footer>
        

        <Modal
        isOpen={openAuthModal}
        onClose={handleModalClose}
        hideHeader
        >
            <div className="">
                {currentPage==="login"&&<Login setCurrentPage={setCurrentPage}/>}
                {currentPage==="signup"&&(
                    <SignUp setCurrentPage={setCurrentPage}/>
                )}
            </div>
        </Modal>
        </div>
    )
  
};

export default LandingPage;

