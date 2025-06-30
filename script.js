let words = [];
let currentWordIndex = 0;
let timer;
let timeLeft = 0;
let testStarted = false;
let allowBackspace = true;
let autoScroll = true;
let totalTypedWords = 0;
let correctWords = 0;
let wrongWords = 0;
let startTime;

const typingInput = document.getElementById("typingInput");
const displayText = document.getElementById("displayText");
const startBtn = document.getElementById("startBtn");
const durationSelect = document.getElementById("duration");
const allowBackspaceCheckbox = document.getElementById("allowBackspace");
const autoScrollCheckbox = document.getElementById("autoScroll");
const resultBox = document.getElementById("results");
const resultName = document.getElementById("resultName");
const resultWPM = document.getElementById("resultWPM");
const resultAccuracy = document.getElementById("resultAccuracy");
const resultTime = document.getElementById("resultTime");
const resultCorrect = document.getElementById("resultCorrect");
const resultWrong = document.getElementById("resultWrong");
const usernameInput = document.getElementById("username");
const examFile = document.getElementById("examFile");
const uploadSection = document.getElementById("uploadSection");

document.getElementById("practiceBtn").addEventListener("click", () => {
  uploadSection.style.display = "none";
  loadPracticeParagraph();
});

document.getElementById("examBtn").addEventListener("click", () => {
  uploadSection.style.display = "block";
  displayText.innerHTML = '';
});

examFile.addEventListener("change", handleFileUpload);

startBtn.addEventListener("click", () => {
  if (!usernameInput.value.trim()) {
    alert("Please enter your name!");
    return;
  }

  allowBackspace = allowBackspaceCheckbox.checked;
  autoScroll = autoScrollCheckbox.checked;
  timeLeft = parseInt(durationSelect.value);
  testStarted = true;
  currentWordIndex = 0;
  totalTypedWords = 0;
  correctWords = 0;
  wrongWords = 0;
  resultBox.style.display = "none";

  highlightCurrentWord();
  typingInput.disabled = false;
  typingInput.value = "";
  typingInput.focus();
  startTime = new Date();

  if (timer) clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
});

typingInput.addEventListener("input", handleTyping);

function handleTyping(e) {
  if (!testStarted) return;

  const typed = typingInput.value.trimEnd();

  if (!allowBackspace && e.inputType === "deleteContentBackward") {
    typingInput.value = typingInput.value.slice(0, -1);
    return;
  }

  if (typed.endsWith(" ")) {
    const typedWord = typed.trim();
    const actualWord = words[currentWordIndex] || "";
    totalTypedWords++;

    if (normalize(typedWord) === normalize(actualWord)) {
      correctWords++;
      markWord(currentWordIndex, "correct");
    } else {
      wrongWords++;
      markWord(currentWordIndex, "incorrect");
    }

    currentWordIndex++;
    typingInput.value = "";
    highlightCurrentWord();

    if (autoScroll) {
      scrollToWord(currentWordIndex);
    }
  }
}

function normalize(word) {
  return word.toLowerCase().replace(/[^a-zA-Z0-9\u0900-\u097F]/g, "");
}

function updateTimer() {
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(timer);
    typingInput.disabled = true;
    showResults();
  }
}

function loadPracticeParagraph() {
  const sampleParagraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests help improve your speed and accuracy.",
    "Practice daily to get better at keyboard typing.",
    "भारत एक महान देश है। हमें गर्व होना चाहिए कि हम भारतीय हैं।"
  ];
  const random = sampleParagraphs[Math.floor(Math.random() * sampleParagraphs.length)];
  prepareText(random);
}

function handleFileUpload() {
  const file = examFile.files[0];
  if (file && file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      prepareText(text);
    };
    reader.readAsText(file);
  } else {
    alert("Please upload a valid .txt file.");
  }
}

function prepareText(text) {
  const cleanText = text.trim().replace(/\s+/g, " ");
  words = cleanText.split(" ");
  displayText.innerHTML = words
    .map((word, index) => `<span class="word" id="word-${index}">${word}</span>`)
    .join(" ");
  highlightCurrentWord();
}

function highlightCurrentWord() {
  document.querySelectorAll(".word").forEach((el) => {
    el.classList.remove("current-word");
  });
  const current = document.getElementById(`word-${currentWordIndex}`);
  if (current) {
    current.classList.add("current-word");
  }
}

function markWord(index, status) {
  const wordEl = document.getElementById(`word-${index}`);
  if (wordEl) {
    wordEl.classList.remove("current-word");
    wordEl.classList.add(status);
  }
}

function scrollToWord(index) {
  const wordEl = document.getElementById(`word-${index}`);
  if (wordEl) {
    wordEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function showResults() {
  const timeTaken = Math.round((new Date() - startTime) / 1000);
  const wpm = Math.round((correctWords / timeTaken) * 60);
  const accuracy = Math.round((correctWords / totalTypedWords) * 100) || 0;

  resultBox.style.display = "block";
  resultName.textContent = usernameInput.value;
  resultWPM.textContent = wpm;
  resultAccuracy.textContent = accuracy + "%";
  resultTime.textContent = timeTaken + "s";
  resultCorrect.textContent = correctWords;
  resultWrong.textContent = wrongWords;
}
