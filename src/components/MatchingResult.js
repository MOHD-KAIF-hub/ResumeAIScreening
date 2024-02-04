import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import  "./MatchingResult.css";
import { LuLoader2 } from "react-icons/lu";


const MatchingResult = ({Matching,status,Setstatus}) => {
  const findValue =(Key)=>{
    if(Key==="experience_match_score")
    return "Experience";
  else if(Key==="skills_match_score")
  return "Skills";
else if(Key==="certifications_match_score")
return "Certifications";
else if(Key==="education_match_score")
return "Education";
  }
  console.log(Matching);

  if(Object.keys(Matching).length===1)
  {
    return (
        <div className={`Main ${status ? 'show' : ''} flex flex-col rounded-2xl p-4 z-1000 absolute left-[20%] top-[30%] w-[60%] md:w-[40%] md:left-[30%]`}>
    {/* Header */}
    <div className='mt-4 flex w-full justify-between '>
      <h1 className='text-xl font-semibold text-gray-800 '>Analyzing match score....</h1>
      <div className="animate-spin loader text-3xl text-orange-400 ">
                  <LuLoader2 />
        </div>
      <div onClick={() => Setstatus(!status)} className="w-12 h-6 flex items-center justify-center cursor-pointer">
        <FaTimes className="text-gray-800  bg-blue-300 hover:opacity-70 rounded-2xl p-1 w-6 h-6" />
      </div>
    </div>
    
    </div>
    )
  }

  return (
    <div className={`Main ${status ? 'show' : ''} flex flex-col rounded-2xl p-4 z-1000 absolute left-[20%] top-[30%] w-[60%] md:w-[40%] md:left-[30%]`}>
    {/* Header */}
    
      <div className='flex w-full justify-between mb-3'>
      <h1 className='text-xl font-semibold text-gray-800 '>Match Score</h1>
      <div onClick={() => Setstatus(!status)} className="w-12 h-6 flex items-center justify-center cursor-pointer">
        <FaTimes className="text-gray-800  bg-blue-300 hover:opacity-70 rounded-2xl p-1 w-6 h-6" />
      </div>
      </div>
     
  
  
    {/* Analysis Results */}
 
    {Object.entries(Matching)&&Object.entries(Matching).filter(([Key])=>{
      return Key==="experience_match_score"||Key==="skills_match_score"||Key==="certifications_match_score"||Key==="education_match_score";
    }).map(([Key, results], index) => (
  <div className="flex justify-center gap-3 mx-2" key={index}>
    <p className='mt-3 text-sm font-semibold text-gray-800 min-w-[100px]'>{findValue(Key)}</p>
    <div className="flex w-full">
      <div className="w-12 h-12 flex items-center justify-center">
        {results> 0 ? (
          <FaCheck className="text-white bg-green-400 rounded-2xl p-1 w-6 h-6" />
        ) : (
          <FaTimes className="text-white bg-red-400 rounded-2xl p-1 w-6 h-6" />
        )}
      </div>
      <div className='flex flex-col w-full'>
        <span className="text-sm font-semibold text-gray-800  inline-block mx-1">
          {results}% 
        </span>
        <div className="flex w-full h-3 mb-4 rounded-md border relative overflow-hidden">
          <div
            style={{ width: `${results > 0 ? results: 7}%` }}
            className={`div-overlay flex flex-col justify-center ${results > 0 ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500 ease-in-out rounded-l overflow-hidden`}
          ></div>
          <div
            className='absolute z-10 rounded-l bg-white h-12 right-0'
            style={{
              width: `calc(105% - ${results > 0 ? results: 7}%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  </div>
))}

  
    {/* Detailed Analysis Button */}
  
     
    <div className="flex justify-center ">
              <button onClick={()=>Setstatus(!status)}
                type="button"
                className="mt-5 mb-5 bg-blue-300 p-2 rounded-xl py-2 px-5 w-1/2 md:w-1/3 hover:opacity-70 lg:text-lg font-semibold text-gray-800"
              >
                Close
              </button>
            </div>
  </div>
  
  )
}

export default MatchingResult