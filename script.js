// let btn = document.querySelector("button");
// const output = document.getElementById("output");

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// btn.addEventListener('click',() =>{
// recognition.start();
// });

// recognition.onresult = (event)=>{
//   const command = event.results[0][0].transcript.toLowerCase();
//   output.innerText = "You said "+command;
//   takeCommand(command);
// };

// function takeCommand(message){
//   if(message.includes("hello")){
//     speak("Hello Krish! How can I help you today");
//   }else if(message.includes("time")){
//     let time = new Date().toLocaleTimeString();
//     speak("The time is "+time);
//   }else if(message.includes("open youtube")){
//     speak("Opening Youtube");
//     window.open("https://www.youtube.com");
//   }
//   else if(message.includes("open google")){
//     speak("Opening Google");
//     window.open("https://www.google.com");
//   }
//   else{
//     speak("Sorry, I didn't understand that.");
//   }
// }

// // Text-to-speech
// function speak(text){
//   let utterance = new SpeechSynthesisUtterance(text);
//   utterance.rate = 1;
//   utterance.pitch = 1;
//   utterance.volume = 1;
//   utterance.lang = 'en-GB';
//   window.speechSynthesis.speak(utterance);
// }

const GEMINI_API_KEY = "AIzaSyAFIiro4vLwdAxJUlgdr3BAosFQh-jLoKs";

const speakBtn = document.getElementById("Speakbtn");
const userText = document.getElementById("userText");
const aiReply = document.getElementById("aiReply");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


speakBtn.addEventListener('click',() =>{
recognition.start();
});

recognition.onresult = async(event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  aiReply.innerText = "You said: "+command;

  if(message.includes("hello")){
    speak("Hello Krish! How can I help you today");
  }else if(message.includes("time")){
    let time = new Date().toLocaleTimeString();
    speak("The time is "+time);
  }else if(message.includes("open youtube")){
    speak("Opening Youtube");
    window.open("https://www.youtube.com");
  }
  else if(message.includes("open google")){
    speak("Opening Google");
    window.open("https://www.google.com");
  }
  else{
    aiReply.innerText = "Thinking....";
    const reply = await askGemini(command);
    aiReply.innerText ="Sasta ChatBox : "+reply;
    speak(reply);
  }
};

// Text-to-speech
function speak(text){
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = 'en-GB';
  window.speechSynthesis.speak(utterance);
}

async function askGemini(prompt) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyAFIiro4vLwdAxJUlgdr3BAosFQh-jLoKs}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn’t find anything.";
    return text;
  } catch (err) {
    console.error(err);
    return "Error connecting to sasta ChatBox.";
  }
}