import React, { useEffect, useState } from "react";

const UploadResume = ({
  onUpload,
  setResumeName,
  setShowResumeData,
  file,
  setFile,
}) => {
  const [error, setError] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFile(selectedFile.name)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Invalid file format. Please upload a PDF file.");
      // Clear the error after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && isValidFile(droppedFile.name)) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Invalid file format. Please upload a PDF file.");
      // Clear the error after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setShowResumeData(false);
    setError(null);
  };

  const handleUpload = () => {
    if (file) {
      // Call the parent component function to handle the file
      onUpload(file);
    }
  };

  useEffect(() => {
    setResumeName(file ? file.name : "");
  }, [file, setResumeName]);

  const isValidFile = (fileName) => {
    const allowedExtensions = /(\.pdf)$/i;
    return allowedExtensions.test(fileName);
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full overflow-hidden">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 p-4 mt-2 flex flex-col w-11/12 md:w-1/2 xl:w-1/3 justify-center items-center relative bg-white rounded-3xl"
      >
        {error && <p className="text-red-500">{error}</p>}
        <p className="my-3 text-xl font-semibold text-gray-700">
          Drag & drop your resume here
        </p>
        <p className="text-lg text-gray-700">OR</p>
        <label
          htmlFor="resume"
          className={`mt-3 w-full flex flex-col items-center ${
            file ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <span className="bg-orange-300 text-gray-700 font-semibold py-1 px-3 cursor-pointer rounded-3xl w-1/4 text-center hover:opacity-80">
            Browse
          </span>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {file ? (
          <div className="text-xs mt-6 flex items-center text-gray-600">
            <span>
              {file.name} ({(file.size / 1000000).toFixed(2)} MB)
            </span>
            <span
              className="ml-2 text-red-500 cursor-pointer hover:opacity-60"
              onClick={handleRemoveFile}
            >
              &#10006;
            </span>
          </div>
        ) : (
          <div>
            <p className="mt-5 text-sm text-center font-semibold">
              Max Size : 50MB
            </p>
            <p className="text-xs text-center my-2">
              Supported file format : PDF
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-300 text-gray-800 p-2 rounded-xl py-2 px-5 hover:opacity-80"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default UploadResume;
