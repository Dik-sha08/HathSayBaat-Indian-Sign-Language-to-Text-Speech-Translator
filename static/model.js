// ==========================================
// 1. ADVANCED CAMERA & AI LOGIC
// ==========================================
const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvasElement');
const context = canvas ? canvas.getContext('2d') : null;
const resultSpan = document.getElementById('predictionResult');
const startBtn = document.getElementById('startBtn');
const sentenceOutput = document.getElementById('sentenceOutput');
const clearBtn = document.getElementById('clearBtn');

let isStreaming = false;
let intervalId = null;

// --- SENTENCE VARIABLES ---
let sentence = [];
let lastPrediction = "";
let frameCounter = 0;
const FRAME_THRESHOLD = 8; // Number of stable frames required to accept a word

// Initialize Buttons
if (startBtn && video && canvas) {
  startBtn.addEventListener('click', () => {
    if (!isStreaming) startCamera();
    else stopCamera();
  });
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        sentence = [];
        if(sentenceOutput) sentenceOutput.innerText = "...";
    });
}

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      isStreaming = true;
      startBtn.textContent = "Stop Camera";
      startBtn.style.backgroundColor = "#e63946";
      startBtn.style.color = "white";
      // Run every 200ms (5 FPS) to check for stability
      intervalId = setInterval(sendFrame, 200);
    })
    .catch(err => {
      console.error("Camera Error:", err);
      alert("Could not access camera.");
    });
}

function stopCamera() {
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  isStreaming = false;
  clearInterval(intervalId);
  startBtn.textContent = "Start Camera";
  startBtn.style.backgroundColor = "";
  startBtn.style.color = "";
  if(resultSpan) resultSpan.innerText = "Waiting...";
}

function sendFrame() {
  if (!isStreaming) return;

  // Draw frame
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL('image/jpeg', 0.5);

  fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataURL }),
  })
  .then(r => r.json())
  .then(data => {
    if (data.prediction) {
      const currentWord = data.prediction;
      
      // Update the "Live" text immediately
      if(resultSpan) resultSpan.innerText = currentWord;

      // --- STABILITY & SENTENCE LOGIC ---
      // Ignore "Nothing", "Unknown", or "..."
      if (currentWord !== "Nothing" && currentWord !== "..." && currentWord !== "Unknown") {
          
          if (currentWord === lastPrediction) {
              frameCounter++;
              
              // If word is held stable for enough frames...
              if (frameCounter === FRAME_THRESHOLD) {
                  // Check if it's not a repeat of the *immediately* previous word in sentence
                  const lastSentenceWord = sentence.length > 0 ? sentence[sentence.length - 1] : "";
                  
                  if (lastSentenceWord !== currentWord) {
                      addToSentence(currentWord);
                  }
              }
          } else {
              // Word changed, reset counter
              lastPrediction = currentWord;
              frameCounter = 0;
          }
      } else {
          // If "Nothing" is detected, reset stability
          lastPrediction = "";
          frameCounter = 0;
      }
    }
  })
  .catch(e => console.log(e));
}

function addToSentence(word) {
    sentence.push(word);
    if(sentenceOutput) sentenceOutput.innerText = sentence.join(" ");
    speak(word); // Speak the new word out loud
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; 
        utterance.rate = 1;       
        window.speechSynthesis.speak(utterance);
    }
}

// ==========================================
// 2. DARK THEME LOGIC
// ==========================================
const themeIcon = document.querySelector("#dark-theme i");
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  if(themeIcon) themeIcon.classList.add("ri-moon-line");
} else {
  if(themeIcon) themeIcon.classList.add("ri-sun-line");
}

if (themeIcon && themeIcon.parentElement) {
  themeIcon.parentElement.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const logoImage = document.querySelector(".logo-image");

    if (document.body.classList.contains("dark")) {
      themeIcon.classList.remove("ri-sun-line");
      themeIcon.classList.add("ri-moon-line");
      if (logoImage) logoImage.src = "/static/assets/images/icons/icon-white.svg";
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.remove("ri-moon-line");
      themeIcon.classList.add("ri-sun-line");
      if (logoImage) logoImage.src = "/static/assets/images/icons/icon-black.svg";
      localStorage.setItem("theme", "light");
    }
  });
}