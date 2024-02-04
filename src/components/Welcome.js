import React from "react";

import Navbar from "./Navbar";

const Welcome = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-around items-center flex-col ">
       
        <div className="my-3">
          <Navbar/>
        </div>
        <div className="mb-10">
          <p className="text-2xl  font-semibold text-gray-800">Welcome, James</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
