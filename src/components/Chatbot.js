
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark, faCircleArrowRight,faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import chatlogo from "../assets/chatlogo.png"
import { useLocation } from 'react-router-dom';


import { v4 as uuidv4 } from 'uuid';


const Chatbot = () => {
  const location = useLocation();
  const [userInput1, setUserInput1] = useState('');
  const [iconstatus,seticonstatus]=useState(true);
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
      sender: 'Chatbot',
    },
  ]);

  const questions = [
    "How can I help you?",
    "What services do you provide?",
    "How do I contact support?",
    "Any Questions from Talent Academy Ai"
  ];

  const handleUserInput = async (userInputText) => {
    if (userInputText === "") return;

    const userMessage = {
      text: userInputText,
      sender: 'User',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Uncomment the following section to make the API call
    try {
      let res = await fetch('http://34.224.93.99:5000/support/', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          query: userInputText
        })
      });

      const data = await res.json();
  

      const botResponse = {
        text: `${data.response}`,
        sender: 'Chatbot',
      };
      setMessages((prevMessages) => ([...prevMessages, botResponse]));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuestionClick = (question) => {
    handleUserInput(question);
  };
const handleClick=()=>seticonstatus(!iconstatus)
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserInput(userInput1);
    setUserInput1('');

  };

  const reload = () => {
    setMessages([
      {
        id: uuidv4(),
        text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
        sender: 'Chatbot',
      },
    ]);
  };
 
  const isExcludedPath=location.pathname.startsWith('/apply') 
  if (isExcludedPath) {
    return null; 
  }
 
  return (
    <>
     <div className={`fixed ${iconstatus?'invisible':''}   z-[100]  right-0 top-10  flex flex-col w-[460px] gap-5 ml-auto rounded-xl mr-7 `}>

     <div className={`flex flex-col bg-white gap-4 rounded-xl ${!iconstatus ? 'transition-all transform translate-y-0 duration-500 ease-in-out opacity-1' : 'opacity-0 transform translate-y-full'}`}>
     
     <div className=" rounded-[0.8rem] border border-solid border-gray-300 h-[500px] flex flex-col shadow-lg ">
     {/* Refresh Part */}
     <div className="refresh w-[98%] mx-auto mt-2 h-[8%] border-b border-solid border-gray-300 flex ">
       <div className='profile flex gap-[10px] items-center p-1'>
       <div className='p-[2px] border border-solid border-gray-300 rounded-[50px] bg-purple-200  mb-[5px]'>
         <img src={chatlogo} alt='profile' className='w-[30px] h-[30px] bg-white rounded-full '/> 
        </div>
         <span className='font-semibold'>Talent Academy</span>
       </div>
       <div className='icon_div flex mt-auto mr-[10px] ml-auto mb-auto gap-[15px]'>
           <FontAwesomeIcon  className='icon cursor-pointer' icon={faXmark} onClick={handleClick} />
           <FontAwesomeIcon  className='icon cursor-pointer' icon={faArrowsRotate} onClick={reload} />
        </div>       
   
   </div>
       {/* Message Body Part */}
   <div className="Body h-[66%] m-[8px] overflow-auto">


{messages.map((message) => (
 <div className={` z-100 ${message.sender === 'User' ? 'justify-end flex' : ''}`} key={message.id}>
   <div className={`message  m-[5px] p-[10px] min-w-[50px] max-w-[80%] text-left min-h-[40px] text-base inline-block rounded-lg bg-gray-200`} style={{backgroundColor:message.sender === 'User' ? 'bg-blue-400' : ''}}>
     <p key={message.id}>{message.text}</p>
   </div>
 </div>
))}



 
   </div>

   <div className='h-[15%] '>

<div className='flex gap-1 overflow-y-auto'>
 {questions.map((question, index) => (
       <div
 key={index}
 className="m-[5px] px-[8px] text-left h-[30px] text-base inline-block rounded-md bg-gray-200 hover:underline cursor-pointer whitespace-nowrap"
 onClick={() => handleQuestionClick(question)}
>
 {question}
</div>

       
       ))}

            {/* Input field Area */}
       </div>

       <div className="text_field w-[98%] mx-auto mb-6  flex z-100">
   <input
   type="text"
 value={userInput1}
 onChange={(e) => setUserInput1(e.target.value)}
  onKeyPress={(e) => {
   if (e.key === 'Enter') {
     handleSubmit(e);
   }
   }}
className='w-full outline-none resize-none overflow-hidden min-h-10 rounded-xl p-2 border border-solid border-gray-300'
/>



<FontAwesomeIcon className="arrow ml-[-32px] cursor-pointer font-normal mt-2 text-2xl" icon={faCircleArrowRight} onClick={handleSubmit} />



</div>
</div>

       

     </div>
   </div>
</div>

{iconstatus ? (
  <div className={`fixed  bottom-5 w-[60px] h-[60px]  m-5  right-0 z-[100] ! rounded-full cursor-pointer flex items-center bg-[#FF7F50]`} onClick={()=>seticonstatus(!iconstatus)}>
    <img src={chatlogo} alt="chatlogo" className='checkmark m-auto w-[80%] rounded-full font-[60px] '  />
  </div>
) : (
  <div className={`fixed  w-[60px] h-[60px] m-5 bottom-5 right-0 z-[100] ! rounded-full cursor-pointer flex items-center  bg-blue-300`} onClick={()=>seticonstatus(!iconstatus)}>
    <FontAwesomeIcon className='Xmark m-auto w-[60%] h-[60%] text-white' icon={faXmark} />
  </div>
)}
  
    </>
    

    
  );
};

export default Chatbot;

