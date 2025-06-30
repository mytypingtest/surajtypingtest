
const englishParagraphs = [
  "Typing is a vital skill for everyone in this digital era.",
  "Practice makes perfect. Keep typing to improve speed.",
  "The quick brown fox jumps over the lazy dog.",
  "Focus and accuracy are the keys to typing success.",
];

const hindiParagraphs = [
  "भारत एक विशाल और सुंदर देश है जिसमें विभिन्न संस्कृतियाँ हैं।",
  "टाइपिंग अभ्यास से ही गति और सटीकता में सुधार होता है।",
  "कंप्यूटर ज्ञान आज के युग में अनिवार्य हो गया है।",
  "हर दिन थोड़ा अभ्यास करने से परिणाम बेहतर मिलते हैं।",
];

let currentParagraph = "";
let timer;
let timeLeft = 0;
let currentCharIndex = 0;
let totalTyped = 0;
let mistakes = 0;
let allowBackspace = true;

const paragraphDisplay = document.getElementById("paragraphDisplay");
const inputArea = document.getElementById("inputArea");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");

function getParagraph(language, mode) {
  if (mode === "exam") {
    return language === "english"
      ? "This is the fixed exam paragraph in English."
      : "यह हिंदी परीक्षा के लिए निश्चित अनुच्छेद है।";
  } else {
    const source = language === "english" ? englishParagraphs : hindiParagraphs;
    return source[Math.floor(Math.random() * source.length)];
  }
}

function displayParagraph(text) {
  paragraphDisplay.innerHTML = "";
  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;
    if (index === 0) span.classList.add("active");
    paragraphDisplay.appendChild(span);
  });
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timer);
    inputArea.disabled = true;
    showResult();
    return;
  }
  timeLeft--;
  timerDisplay.innerText = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
}

function startTest() {
  // Reset all states
  clearInterval(timer);
  resultDisplay.style.display = "none";
  inputArea.disabled = false;
  inputArea.value = "";
  totalTyped = 0;
  mistakes = 0;
  currentCharIndex = 0;

  const username = document.getElementById("username").value || "Guest";
  const time = parseInt(document.getElementById("timeSelect").value);
  const mode = document.getElementById("modeSelect").value;
  const language = document.getElementById("languageSelect").value;
  allowBackspace = document.getElementById("backspaceSelect").value === "enable";

  document.getElementById("userDisplay").innerText = `User: ${username}`;
  timeLeft = time;
  timerDisplay.innerText = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

  currentParagraph = getParagraph(language, mode);
  displayParagraph(currentParagraph);
  inputArea.focus();

  timer = setInterval(updateTimer, 1000);
}

inputArea.addEventListener("keydown", function (e) {
  const spans = paragraphDisplay.querySelectorAll("span");

  // Prevent backspace if disabled
  if (!allowBackspace && e.key === "Backspace") {
    e.preventDefault();
    return;
  }

  // Ignore non-character keys
  if (e.key.length !== 1 && e.key !== "Backspace") return;

  // Backspace handling
  if (e.key === "Backspace") {
    if (currentCharIndex > 0) {
      currentCharIndex--;
      spans[currentCharIndex].classList.remove("correct", "incorrect");
      spans[currentCharIndex].classList.add("active");
      spans[currentCharIndex + 1]?.classList.remove("active");
    }
    return;
  }

  // Actual typing logic
  const expectedChar = spans[currentCharIndex].innerText;
  const typedChar = e.key;

  if (typedChar.toLowerCase() === expectedChar.toLowerCase()) {
    spans[currentCharIndex].classList.add("correct");
  } else {
    spans[currentCharIndex].classList.add("incorrect");
    mistakes++;
  }

  spans[currentCharIndex].classList.remove("active");
  currentCharIndex++;
  if (spans[currentCharIndex]) {
    spans[currentCharIndex].classList.add("active");
  }

  totalTyped++;

  // If paragraph finished early, optionally load next
  if (currentCharIndex >= spans.length && timeLeft > 0) {
    const lang = document.getElementById("languageSelect").value;
    const mode = document.getElementById("modeSelect").value;
    currentParagraph = getParagraph(lang, mode);
    displayParagraph(currentParagraph);
    currentCharIndex = 0;
  }
});

function showResult() {
  const wpm = Math.round((totalTyped / 5) / (timeLeft / 60));
  const accuracy = Math.round(((totalTyped - mistakes) / totalTyped) * 100);

  resultDisplay.style.display = "block";
  resultDisplay.innerHTML = `
    <strong>Result:</strong><br/>
    Total Typed: ${totalTyped}<br/>
    Mistakes: ${mistakes}<br/>
    Accuracy: ${isNaN(accuracy) ? 0 : accuracy}%<br/>
    WPM: ${isNaN(wpm) ? 0 : wpm}
  `;
}
