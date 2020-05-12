// instantiate speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// instantiate socket.io
const socket = io();

// set some properties of speech recognition to costumize the experience
recognition.lang = "en-US";
recognition.interimResults = false;

// listen for what the user said once the button has been clicked
document.querySelector("button").addEventListener("click", () => {
  recognition.start();
});

// transcript what was said into text
recognition.addEventListener("result", (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  console.log("Confidence: " + e.results[0][0].confidence);

  socket.emit("chat message", text);
});
