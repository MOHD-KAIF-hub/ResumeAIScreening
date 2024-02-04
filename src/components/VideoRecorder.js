import React, { useState } from "react";
import { CAMERA_STATUS, useRecordWebcam } from "react-record-webcam";
import { BsRecord2 } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const OPTIONS = {
  filename: "test-filename",
  filetype: "video/webm",
  width: 1920,
  height: 1080,
};

const VideoRecorder = () => {
  const {Data} = useLocation().state;
  const questions=[Data.job.question1,Data.job.question2,Data.job.question3]
  const recordWebcam = useRecordWebcam(OPTIONS);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isEnd, setisEnd] = useState(false);
  const [isUpload, setisUpload] = useState(false);
  const [upload,setUpload]=useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedQuestions, setRevealedQuestions] = useState([questions[0]]);
  const navigate = useNavigate();

  const handleGetBlob = () => {
    const videoElement = recordWebcam.previewRef.current;
    if (videoElement) {
      const srcUrl = videoElement.getAttribute("src");
      setRecordedBlob(srcUrl);
    }
  };
  const clearRecordedBlob = () => {
    setRecordedBlob(null);
  };
  const sendVideoAndContinue = async (Blob) => {
    setisUpload(false);
    console.log(Blob);
    const uploadedFileInput = document.getElementById("uploadedFileInput");
    const uploadedFile = uploadedFileInput?.files[0];
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("answer_recording", uploadedFile);
      formData.append("question", revealedQuestions[currentQuestionIndex]);
      formData.append("question_no", currentQuestionIndex + 1);
       

      formData.append("neom_division", JSON.stringify(Data.job.neomDivision));
      formData.append("job_title", JSON.stringify(Data.job.jobTitle));
      formData.append("match_score", JSON.stringify(Data.match_score));
     
      try {
        const response = await fetch("http://34.224.93.99:5000/pre-screen/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Video successfully uploaded:", responseData);
          // Additional logic after successful upload
        } else {
          console.error("Error uploading video:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else if (Blob) {
      console.log(Blob);
      await video(Blob);
      clearRecordedBlob();
    } else {
      console.error("No recorded video blob or Uploaded File is available.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setRevealedQuestions((prevQuestions) => [
        ...prevQuestions,
        questions[currentQuestionIndex + 1],
      ]);
    }
  };
  const handleEndTest = () => {
    setisEnd(true);
  };
  const handleUpload = () => {
    setisUpload(true);
  };
  const video = async (blob) => {
    const mediablob = await fetch(blob).then((response) => response.blob());

    const myfile = new File([mediablob], "demo.webm", { type: "video/webm" });
    sendVideoToAPI(myfile);
  };
  const sendVideoToAPI = async (myfile) => {
    if (myfile) {
      try {
        const formData = new FormData();
        formData.append("answer_recording", myfile);
        formData.append("question", revealedQuestions[currentQuestionIndex]);
        formData.append("question_no", currentQuestionIndex + 1);
        formData.append("neom_division", JSON.stringify(Data.job.neomDivision));
        formData.append("job_title", JSON.stringify(Data.job.jobTitle));
        formData.append("match_score", JSON.stringify(Data.match_score));
        console.log(formData);

        const response = await fetch("http://34.224.93.99:5000/pre-screen/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const responseData = await response.json(); // Adjust this based on your API response format
          console.log("Video successfully sent to API:", responseData);
        } else {
          console.error("Error sending video to API:", response.statusText);
        }
      } catch (error) {
        console.error("Error sending video to API:", error);
      }
    } else {
      console.warn("No recorded video blob available.");
    }
  };
  const handleGohome=()=>{
        navigate('/');
  }
  if (isEnd) {
    return (
      <div className=" flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl font-bold text-zinc-700 mt-16 text-center">
      Your application has been submitted successfully.
      </h1>
      <button onClick={handleGohome} className="mt-10 mb-10 bg-blue-300 p-2 rounded-xl py-2 px-5 w-3/4 md:w-1/3 hover:opacity-70 lg:text-lg font-semibold text-gray-800"> Back to Home</button>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center">
   <div className="w-full">
      <Navbar/>
    </div>
      <div className="w-3/5">
        <h1 className="text-2xl font-bold text-center mt-5 mb-6 text-zinc-700 ">
          Thanks for choosing to apply for the job of <span>{Data.job.jobTitle}</span>
          {/* <span>{job.title}</span> a{" "}
          <span>{job.culture}</span> */}
        </h1>
        <div
          className={` flex-col justify-center ${
            recordWebcam.status !== "CLOSED" ? " hidden " : " flex "
          }`}
        >
          <ul className="list-disc">
            <p className="text-xl font-semibold mb-2 text-zinc-700">
              {" "}
              Test Instructions:
            </p>
            <div className="ml-8 text-lg text-zinc-600">
              <li className="">
                As part of the pre-screening process you need to answer a few
                questions by recording a video.
              </li>
              <li>
                This video will help us to evaluate your profile better and also
                find out more matching jobs for you.
              </li>
              <li>Please be comfortable before answering the questions.</li>
              <li>
                Please click on ‘Start Test’ below whenever you are ready.
              </li>
            </div>
          </ul>
        </div>
        {(recordWebcam.status === "RECORDING" ||
          recordWebcam.status === "PREVIEW") && (
          <div className="w-4/5 mt-10 flex">
            <ul>
              <p className="text-xl font-semibold mb-2 text-zinc-700">
                Questions :
              </p>
              <div className="ml-8 list-decimal text-lg text-zinc-600 gap-6 ">
                {revealedQuestions.map((question, index) => (
                  <li
                    key={index}
                    style={{
                      opacity: currentQuestionIndex === index ? 1 : 0.5,
                    }}
                    className={`${
                      recordWebcam.status !== "INIT" ? " my-2 " : "hidden"
                    }`}
                  >
                    {question}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        )}
        <div></div>
        <div
          className={`${
            recordWebcam.status === CAMERA_STATUS.OPEN ||
            recordWebcam.status === CAMERA_STATUS.RECORDING
              ? " w-full flex flex-col justify-center items-center mt-10"
              : " hidden "
          }`}
        >
          <video
            className="rounded-2xl"
            ref={recordWebcam.webcamRef}
            autoPlay
            muted
          />
          {recordWebcam.status === "RECORDING" && (
            <BsRecord2 className="text-red-500 mt-2 text-2xl" />
          )}
        </div>
        {!isUpload ? (
          <div
            className={`${
              recordWebcam.status === CAMERA_STATUS.PREVIEW
                ? " w-full flex justify-center items-center mt-10"
                : " hidden "
            }`}
          >
            <video
              className="rounded-2xl"
              ref={recordWebcam.previewRef}
              controls
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center mt-10">
            <input
              className="w-1/4"
              type="file"
              id="uploadedFileInput"
              accept="video/*"
              onChange={(e) => setUpload(e.target.files[0])}
            />
            {upload&&<p className="text-xs text-red-400">{upload.name}</p>}
            
            
          </div>
        )}
        <div className="flex gap-5 justify-center items-center my-10">
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
            disabled={
              recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={() => {
              recordWebcam.open();
            }}
          >
            {recordWebcam.status === "INIT" ? (
              <p>Please wait...</p>
            ) : (
              <p>Start Test</p>
            )}
          </button>
          <button
            className={`bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded disabled:hidden `}
            disabled={
              recordWebcam.status === CAMERA_STATUS.CLOSED ||
              recordWebcam.status === CAMERA_STATUS.INIT ||
              recordWebcam.status === CAMERA_STATUS.RECORDING ||
              recordWebcam.status === CAMERA_STATUS.PREVIEW
            }
            onClick={recordWebcam.start}
          >
            {currentQuestionIndex < questions.length && currentQuestionIndex > 0
              ? " Next Question "
              : " Answer Questions "}
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
            onClick={async () => {
              await recordWebcam.stop();
              await handleGetBlob();
            }}
          >
            Finish
          </button>
          {!isUpload && (
            <button
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={() => {
                recordWebcam.retake();
                clearRecordedBlob();
              }}
            >
              Retake
            </button>
          )}
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
            disabled={
              recordWebcam.status !== CAMERA_STATUS.PREVIEW ||
              currentQuestionIndex === questions.length - 1
            }
            onClick={async () => {
              await sendVideoAndContinue(recordedBlob);
              handleNextQuestion();
              recordWebcam.retake();
            }}
          >
            Submit & Continue
          </button>
          {!isUpload && (
            <button
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={() => {
                clearRecordedBlob();
                handleUpload();
              }}
            >
              Upload
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded disabled:hidden"
            disabled={
              recordWebcam.status !== CAMERA_STATUS.PREVIEW ||
              currentQuestionIndex !== questions.length - 1 ||
              recordWebcam.status === CAMERA_STATUS.INIT
            }
            onClick={() => {
              handleGetBlob();
              sendVideoAndContinue(recordedBlob);
              handleNextQuestion();
              handleEndTest();
            }}
          >
            End Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
