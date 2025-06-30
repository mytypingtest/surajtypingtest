const typingBox = document.getElementById("typingBox");
const inputArea = document.getElementById("inputArea");
const startBtn = document.getElementById("startBtn");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const backspaceAllowed = document.getElementById("backspaceAllowed");
const userName = document.getElementById("userName");
const durationSelect = document.getElementById("duration");

let currentText = "";
let currentIndex = 0;
let words = [];
let currentWordIndex = 0;
let startTime = null;
let interval;
let testDuration = 60;
let mode = "practice";
let isStarted = false;

document.querySelectorAll('input[name="mode"]').forEach(radio => {
  radio.addEventListener('change', e => {
    mode = e.target.value;
  });
});

startBtn.addEventListener("click", startTest);

function startTest() {
  const name = userName.value.trim();
  if (name === "") {
    alert("Please enter your name!");
    return;
  }

  testDuration = parseInt(durationSelect.value);
  currentIndex = 0;
  currentWordIndex = 0;
  inputArea.value = "";
  resultBox.classList.add("hidden");
  inputArea.disabled = false;
  inputArea.focus();
  isStarted = true;

  if (mode === "practice") {
    currentText = getRandomParagraph();
  } else {
    currentText = prompt("Enter paragraph for exam mode:") || "Default exam paragraph will be used.";
  }

  prepareText(currentText);
  startTime = Date.now();

  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    if (elapsed >= testDuration) {
      finishTest();
    }
  }, 1000);
}

function prepareText(text) {
  typingBox.innerHTML = "";
  words = text.trim().split(" ");
  words.forEach((word, wIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.classList.add("word");
    if (wIndex === 0) wordSpan.classList.add("active");

    [...word].forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.classList.add("letter");
      wordSpan.appendChild(charSpan);
    });

    const space = document.createElement("span");
    space.textContent = " ";
    wordSpan.appendChild(space);

    typingBox.appendChild(wordSpan);
  });
}

inputArea.addEventListener("keydown", function (e) {
  if (!isStarted) return;

  if (!backspaceAllowed.checked && e.key === "Backspace") {
    e.preventDefault();
    return;
  }

  if (e.key === " ") {
    e.preventDefault();
    checkWord();
    inputArea.value = "";
    moveToNextWord();
    return;
  }
});

function checkWord() {
  const input = inputArea.value.trim();
  const wordSpan = typingBox.children[currentWordIndex];
  const letters = wordSpan.querySelectorAll(".letter");

  [...input].forEach((char, i) => {
    if (i < letters.length) {
      if (char.toLowerCase() === letters[i].textContent.toLowerCase()) {
        letters[i].classList.add("correct");
      } else {
        letters[i].classList.add("incorrect");
      }
    }
  });
}

function moveToNextWord() {
  const currentWord = typingBox.children[currentWordIndex];
  currentWord.classList.remove("active");

  currentWordIndex++;
  if (currentWordIndex < typingBox.children.length) {
    const nextWord = typingBox.children[currentWordIndex];
    nextWord.classList.add("active");

    // Scroll into view
    nextWord.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function finishTest() {
  clearInterval(interval);
  inputArea.disabled = true;
  isStarted = false;

  let totalWords = currentWordIndex;
  let correctWords = 0;
  let mistakes = 0;

  for (let i = 0; i < currentWordIndex; i++) {
    const wordSpan = typingBox.children[i];
    const letters = wordSpan.querySelectorAll(".letter");
    let isCorrect = true;

    letters.forEach(letter => {
      if (letter.classList.contains("incorrect")) {
        isCorrect = false;
        mistakes++;
      }
    });

    if (isCorrect) correctWords++;
  }

  const accuracy = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
  const speed = Math.round((correctWords / testDuration) * 60);

  resultBox.classList.remove("hidden");
  resultText.innerHTML = `
    👤 Name: <strong>${userName.value}</strong><br/>
    ⏱ Duration: ${testDuration / 60} min<br/>
    ✅ Correct Words: ${correctWords}<br/>
    ❌ Mistakes: ${mistakes}<br/>
    ⌨️ Speed: <strong>${speed} WPM</strong><br/>
    🎯 Accuracy: <strong>${accuracy}%</strong>
  `;
}

function getRandomParagraph() {
  const samples = [
    "Typing speed is a skill that improves with practice and focus.",
    "The quick brown fox jumps over the lazy dog.",
    "Practice daily to enhance your keyboard accuracy and typing speed.",
    "Digital literacy includes fast and accurate typing ability.",
    "Consistent practice makes you a better and faster typist."
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}
