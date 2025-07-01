const paragraphs = [
  "Typing is a skill that improves with practice and patience.",
  "Suraj is building a typing website with powerful features.",
  "Make every word count when you practice typing daily.",
  "Speed and accuracy are essential for a good typing score.",
  "JavaScript powers dynamic behavior in modern web apps."
];

let timer;
let timeLeft = 0;
let charIndex = 0;
let words = [];
let currentWordIndex = 0;
let correct = 0;
let incorrect = 0;
let isExam = false;
let allowBackspace = true;

const displayText = document.getElementById("displayText");
const inputArea = document.getElementById("inputArea");
const results = document.getElementById("results");

document.getElementById("startBtn").addEventListener("click", startTest);

function startTest() {
  const name = document.getElementById("username").value.trim();
  if (!name) return alert("Please enter your name!");

  isExam = document.getElementById("modeSelect").value === "exam";
  allowBackspace = document.getElementById("allowBackspace").checked;
  const timeValue = parseInt(document.getElementById("timeSelect").value);
  timeLeft = timeValue * 60;
  charIndex = 0;
  correct = 0;
  incorrect = 0;
  currentWordIndex = 0;
  results.innerHTML = "";

  const para = isExam ? paragraphs[0] : paragraphs[Math.floor(Math.random() * paragraphs.length)];
  words = para.split(" ");
  renderWords();

  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  if (timer) clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function renderWords() {
  displayText.innerHTML = words
    .map((word, idx) => `<span class="word${idx === 0 ? ' current' : ''}" id="word-${idx}">${word}</span>`)
    .join(" ");
}

function updateTime() {
  if (--timeLeft <= 0) {
    clearInterval(timer);
    finishTest();
  }
}

function finishTest() {
  inputArea.disabled = true;
  const total = correct + incorrect;
  const wpm = Math.round((total / 5) / ((parseInt(document.getElementById("timeSelect").value)) / 1));
  results.innerHTML = `
    <p>Test Complete</p>
    <p><strong>WPM:</strong> ${wpm}</p>
    <p><strong>Correct:</strong> ${correct}</p>
    <p><strong>Incorrect:</strong> ${incorrect}</p>
  `;
}

inputArea.addEventListener("keydown", function (e) {
  if (!allowBackspace && e.key === "Backspace") {
    e.preventDefault();
    return;
  }
  if (e.key === " ") {
    checkWord();
    inputArea.value = "";
    updateHighlight();
    e.preventDefault();
  }
});

function checkWord() {
  const typed = inputArea.value.trim();
  const actual = words[currentWordIndex];
  if (typed.toLowerCase() === actual.toLowerCase()) {
    correct++;
    document.getElementById(`word-${currentWordIndex}`).classList.add("correct");
  } else {
    incorrect++;
    document.getElementById(`word-${currentWordIndex}`).classList.add("incorrect");
  }
  document.getElementById(`word-${currentWordIndex}`).classList.remove("current");
  currentWordIndex++;
  if (currentWordIndex >= words.length) {
    if (!isExam) {
      startTest();
    } else {
      finishTest();
    }
  }
}

function updateHighlight() {
  if (document.getElementById(`word-${currentWordIndex}`)) {
    document.getElementById(`word-${currentWordIndex}`).classList.add("current");
  }
}
let timerInterval;
function startTimer(duration) {
  clearInterval(timerInterval);
  let time = duration;
  const timerElement = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;

    if (--time < 0) {
      clearInterval(timerInterval);
      endTypingTest(); // Function jo test khatam kare
    }
  }, 1000);
}
