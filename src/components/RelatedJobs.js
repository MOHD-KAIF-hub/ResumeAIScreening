import React from "react";
import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const RelatedJobs = ({ jobs, jobloading }) => {
  const navigate = useNavigate();

  const handleJobDetails = (job) => {
    navigate(`/jobdetails/${job.job_id}`, { state: { job } });
  };
  return (
    <div className={`w-full justify-center items-center flex flex-col gap-5`}>
      <div className="w-full">
      <Navbar/>
      </div>
      <div className="w-11/12 flex flex-col  items-center  mt-2 rounded-3xl">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Related Jobs</h2>
        {jobloading ? (
          <div className=" w-full lg:w-1/2 flex justify-center items-center flex-col gap-3">
            <span className="text-gray-600">
            Please wait...Workforce of the future is finding matching jobs for your profile
            </span>
            <div className="animate-spin loader text-3xl text-orange-400 ">
              <LuLoader2 />
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="font-semibold mb-5 text-sm lg:text-base text-gray-700">
              Here are the jobs that matches your resume
            </h3>
            <div className="grid grid-cols-1 w-full md:w-3/4 gap-2">
              {jobs.map((job) => (
                <div key={job.job_id} className="bg-white p-4 mb-4 rounded-xl ">
                  <div className="flex gap-8 lg:gap-14 items-center ">
                    <button
                      onClick={() => {
                        handleJobDetails(job);
                      }}
                      className="flex flex-col gap-1 w-full"
                    >
                      <span className="text-pink-600 text-xs uppercase flex">
                        {job.neom_division}
                      </span>
                      <div className="flex flex-col">
                        <p className="font-semibold flex text-gray-700">{job.job_title}</p>
                        <p className="text-sm text-gray-600 flex">
                          ({job.job_type})
                        </p>
                      </div>
                    </button>
                    <div className="rounded-full p-2 bg-yellow-400 h-8 w-8 flex justify-center items-center text-gray-700">
                      {job.match_score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedJobs;
