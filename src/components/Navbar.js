import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/resume.png"
import neom from "../assets/neom.png"
const Navbar = () => {
  return (
    <nav className="px-4">
      <div className="container mx-auto flex flex-col items-center justify-between">
      <div className=" w-4/5  flex justify-between items-center ">
         <Link to="/"><img src={neom} alt="neom" className="w-20" /></Link>
          <img src={logo} alt="logo" className="w-24" />
        
        </div>
       
        <div className="w-screen my-3  h-[1px] bg-zinc-300"></div>
        {/* Navigation Links */}
        <div className=" flex font-extralight ml-auto mb-5 text-amber-600 mr-[200px]  space-x-4 md:space-x-8">
          <Link to="/" className="  hover:text-amber-800    md:text-xl ">
            Home
          </Link>
          <Link to="/" className="hover:text-amber-800  md:text-xl ">
            New Job
          </Link>
          <Link to="/" className="hover:text-amber-800  md:text-xl ">
            New Course
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;