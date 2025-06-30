
const paragraphs = [
  "Welcome to Suraj Typing Test. This is a sample typing paragraph to test your speed, accuracy and confidence. Type carefully and see your results live.",
  "Typing helps improve your focus and concentration. Practicing regularly can boost your typing speed as well as accuracy significantly.",
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet and is commonly used in typing practice.",
  "Improve your typing by using all your fingers. Try not to look at the keyboard and build muscle memory through regular sessions.",
  "Speed is important, but accuracy is the key to success in any typing test. Aim to type clearly, correctly and consistently."
];

let timer;
let timeLeft = 0;
let totalTime = 0;
let originalText = "";
let userText = '';
let isTestRunning = false;

const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timeLeftDisplay = document.getElementById("timeLeft");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const resultBox = document.getElementById("result");

function startTest() {
  const username = document.getElementById("username").value.trim();
  const mode = document.getElementById("mode").value;
  totalTime = parseInt(document.getElementById("duration").value);

  if (username === "") {
    alert("Please enter your name.");
    return;
  }

  document.getElementById("testArea").style.display = "block";
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  resultBox.style.display = "none";

  timeLeft = totalTime;
  isTestRunning = true;
  userText = "";

  originalText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  displayText(originalText);

  timeLeftDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = "100%";

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    updateStats();

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest(username, mode);
    }
  }, 1000);
}

inputArea.addEventListener("input", () => {
  if (!isTestRunning) return;
  userText = inputArea.value;
  displayText(originalText, userText);
  updateStats();
});

function displayText(text, input = "") {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    if (i < input.length) {
      result += text[i] === input[i]
        ? `<span class="correct">${text[i]}</span>`
        : `<span class="incorrect">${text[i]}</span>`;
    } else {
      result += text[i];
    }
  }

  textDisplay.innerHTML = result;
}

function updateStats() {
  const words = userText.trim().split(/\s+/).filter(w => w !== "");
  const wordsCount = words.length;

  const correctChars = originalText
    .split("")
    .filter((char, i) => userText[i] === char).length;

  const accuracy = userText.length > 0
    ? ((correctChars / userText.length) * 100).toFixed(1)
    : 100;

  const timeSpent = totalTime - timeLeft;
  const minutes = timeSpent / 60;
  const wpm = minutes > 0 ? Math.round(wordsCount / minutes) : 0;

  accuracyDisplay.textContent = `${accuracy}%`;
  wpmDisplay.textContent = wpm;
}

function endTest(username, mode) {
  isTestRunning = false;
  inputArea.disabled = true;

  const wordsTyped = userText.trim().split(/\s+/).filter(w => w !== "").length;
  const correctChars = originalText
    .split("")
    .filter((char, i) => userText[i] === char).length;

  const accuracy = userText.length > 0
    ? ((correctChars / userText.length) * 100).toFixed(1)
    : 100;

  const minutes = totalTime / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

  document.getElementById("resName").textContent = username;
  document.getElementById("resMode").textContent = mode;
  document.getElementById("resDuration").textContent = totalTime;
  document.getElementById("resWPM").textContent = wpm;
  document.getElementById("resAccuracy").textContent = accuracy;

  resultBox.style.display = "block";
}
