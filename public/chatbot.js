
// Create a style element for the chatbot CSS
const styleElement = document.createElement('style');

// Define your CSS rules as a string
const cssRules = `
  #chatbot {

    width: 450px;
    height: 650px;
    position: fixed;
    bottom: 10px;
    right: 20px;
    z-index:1000;
  }
  @media (max-width:768px)
  {
    #chatbot{
    width:300px;
    right:5px;
    }
`;

// Set the CSS text of the style element to your CSS rules
styleElement.textContent = cssRules;

// Append the style element to the head of the document
document.head.appendChild(styleElement);


// Create a link element for the CSS file
const cssLink = document.createElement('link');
cssLink.href = 'https://my-chatbot1.netlify.app/static/css/main.f8b81f4c.css';

cssLink.rel = 'stylesheet';

// Create a script element for the JavaScript file
const scriptElement = document.createElement("script");
scriptElement.defer = true;
scriptElement.src = "https://my-chatbot1.netlify.app/static/js/main.a751d599.js";

// Append the link and script elements to the head of the document
document.head.appendChild(cssLink);
document.head.appendChild(scriptElement);


(function(obj){
    // Your code here
    const chatbotContainer = document.createElement('div');
chatbotContainer.id = 'chatbot';
document.body.appendChild(chatbotContainer);
})(window);

