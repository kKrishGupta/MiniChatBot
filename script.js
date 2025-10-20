let btn = document.querySelector("button");
const output = document.getElementById("output");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

btn.addEventListener('click',() =>{
recognition.start();
});

recognition.onresult = (event)=>{
  const command = event.results[0][0].transcript.toLowerCase();
  output.innerText = "You said "+command;
  takeCommand(command);
};

function takeCommand(message){
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
    speak("Sorry, I didn't understand that.");
  }
}

// Text-to-speech
function speak(text){
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = 'en-GB';
  window.speechSynthesis.speak(utterance);
}