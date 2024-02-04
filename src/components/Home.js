import React from "react";
import UploadResume from "./UploadResume";
import ResumeAnalysis from "./ResumeAnalysis";
import Welcome from "./Welcome";
const Home = ({
  file,
  setFile,
  onUpload,
  setResumeName,
  setShowResumeData,
  resumeData,
  loading,
  ResumeName,
  showResumeData,
}) => {
  return (
    <>
      <div className="flex flex-col w-full overflow-hidden">
      <Welcome />
        <div className="w-full">
          <div className="text-center font-semibold text-gray-700">
            <p>Let's find suitable jobs for you</p>
          </div>
        </div>
        <div className="w-full">
          <UploadResume
            setFile={setFile}
            file={file}
            onUpload={onUpload}
            setResumeName={setResumeName}
            setShowResumeData={setShowResumeData}
          />
          <ResumeAnalysis
            resumeData={resumeData}
            loading={loading}
            ResumeName={ResumeName}
            showResumeData={showResumeData}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
