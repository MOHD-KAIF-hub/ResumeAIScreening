import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoCloudUploadSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

const ResumeAnalysis = ({
  resumeData,
  loading,
  ResumeName,
  showResumeData,
}) => {
  if (!resumeData) {
    return "Loading";
  }
  return (
    <div
      className={`flex-col items-center justify-center mt-16 w-full overflow-hidden ${
        showResumeData ? " flex " : " hidden "
      }`}
    >
      <div className=" w-11/12 md:w-1/2 xl:w-1/3 flex flex-col justify-center items-center bg-white rounded-3xl my-3">
        <div className="mt-5 flex gap-2 flex-col justify-center items-center">
          <span className="text-4xl ">
            <IoCloudUploadSharp />
          </span>
          <p className="text-xs text-gray-600">
            {ResumeName.length > 0 ? ResumeName : "No Files Uploaded"}
          </p>
        </div>
        <div className="w-4/5 my-7">
          <p className="text-xl font-semibold">Analysis Result</p>
          <div className="flex flex-col gap-8 mt-5">
            <div className="flex gap-28 items-center">
              <span className="font-semibold w-6 lg:w-1/6 text-gray-700">Summary</span>
              {loading ? (
                <div className="w-1/2 flex justify-end items-center">
                  <div className="animate-spin loader text-3xl text-orange-400 ">
                    <LuLoader2 />
                  </div>
                </div>
              ) : resumeData.summary?.length > 0 ? (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-green-700">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                </div>
              ) : (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-red-500">
                    <RxCrossCircled />
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-28 items-center">
              <span className="font-semibold w-6 lg:w-1/6 text-gray-700">Experience</span>
              {loading ? (
                <div className="w-1/2 flex justify-end items-center">
                  <div className="animate-spin loader text-3xl text-orange-400 ">
                    <LuLoader2 />
                  </div>
                </div>
              ) : resumeData.experience?.length > 0 ? (
                <div className="w-1/2 flex gap-5 justify-end items-center">
                  <span className="text-3xl text-green-700">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                </div>
              ) : (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-red-500">
                    <RxCrossCircled />
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-28 items-center">
              <span className="font-semibold w-6 lg:w-1/6 text-gray-700">Skills</span>
              {loading ? (
                <div className="w-1/2 flex justify-end items-center">
                  <div className="animate-spin loader text-3xl text-orange-400 ">
                    <LuLoader2 />
                  </div>
                </div>
              ) : resumeData.skills?.length > 0 ? (
                <div className="w-1/2 flex gap-5 justify-end items-center">
                  <span className="text-3xl text-green-700">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                </div>
              ) : (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-red-500">
                    <RxCrossCircled />
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-28 items-center">
              <span className="font-semibold w-6 lg:w-1/6 text-gray-700">
                Certifications
              </span>
              {loading ? (
                <div className="w-1/2 flex justify-end items-center">
                  <div className="animate-spin loader text-3xl text-orange-400 ">
                    <LuLoader2 />
                  </div>
                </div>
              ) : resumeData.certifications?.length > 0 ? (
                <div className="w-1/2 flex gap-5 justify-end items-center">
                  <span className="text-3xl text-green-700">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                </div>
              ) : (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-red-500">
                    <RxCrossCircled />
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-28 items-center">
              <span className="font-semibold w-6 lg:w-1/6 text-gray-700">Education</span>
              {loading ? (
                <div className="w-1/2 flex justify-end items-center">
                  <div className="animate-spin loader text-3xl text-orange-400 ">
                    <LuLoader2 />
                  </div>
                </div>
              ) : resumeData.education?.length > 0 ? (
                <div className="w-1/2 flex gap-5 justify-end items-center">
                  <span className="text-3xl text-green-700">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                </div>
              ) : (
                <div className="w-1/2 flex justify-end items-center">
                  <span className="text-3xl text-red-500">
                    <RxCrossCircled />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/relatedjobs"
        className={`mt-4 mb-10 bg-blue-300 text-gray-800 hover:opacity-80 p-2 rounded-xl py-2 px-5 ${
          loading ? " hidden " : " "
        }`}
      >
        Find Jobs
      </Link>
    </div>
  );
};

export default ResumeAnalysis;
