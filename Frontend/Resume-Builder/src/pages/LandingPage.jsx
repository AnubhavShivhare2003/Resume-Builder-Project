import React, { useState } from "react";

import Img1 from "../assets/Img1.png"
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate=useNavigate();

  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login")

  const handleCTA=()=>{}
    return (
    <div className="w-full min-h-full bg-white pb-96">
        <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Resume Builder</div>
            <button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={()=>setOpenAuthModal(true)}
            >
                Login/Sign Up
                </button>
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

      <section className="">
        <h2 className="">
            Features That Make You Shine
        </h2>
        <div className="">
            <div className="">
                <h3 className="">Easy Cutting</h3>
                <p className="">
                    Update your resume sections with live preview and instant 
                    formatting.
                </p>
            </div>

            <div className="">
                <h3 className="">
                    Beautiful Templates
                </h3>
                <p className="">
                    Choose from mordern, professional templates that are easy to 
                    customeize.
                </p>
            </div>

            <div className="">
                <h3 className="">One-click Export</h3>
                <p className="">
                    Download your resume instantly as a high-quality pdf with one 
                    click.
                </p>
            </div>
        </div>
      </section>
        </div>
        </div>
    )
  
};

export default LandingPage;

