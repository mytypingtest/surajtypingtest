
/* === Base Reset === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f2f4f8;
  color: #222;
  padding: 20px;
}

/* === Container === */
.container {
  max-width: 900px;
  margin: auto;
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
}

/* === Heading === */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.2rem;
  color: #0055aa;
}

/* === Setup Panel === */
.setup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
}

.setup input,
.setup select,
.setup button {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
}

.setup button {
  background-color: #0055aa;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.setup button:hover {
  background-color: #003f7f;
}

/* === Typing Area === */
.test-area {
  margin-top: 20px;
}

.text-display {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  min-height: 150px;
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* === Highlight Colors === */
.correct {
  color: green;
  font-weight: bold;
}

.incorrect {
  color: red;
  font-weight: bold;
}

/* === Input Area === */
#inputArea {
  width: 100%;
  height: 120px;
  font-size: 18px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  resize: none;
  margin-top: 20px;
}

#inputArea:disabled {
  background-color: #eee;
}

/* === Stats Display === */
.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  font-size: 1.1rem;
  font-weight: 500;
}

.stats p {
  margin: 5px 0;
}

/* === Result Box === */
.result-box {
  background: #e6ffe6;
  border: 2px solid #28a745;
  padding: 25px;
  border-radius: 12px;
  margin-top: 30px;
  text-align: left;
}

.result-box h2 {
  color: #28a745;
  margin-bottom: 15px;
}

/* === Responsive Design === */
@media (max-width: 600px) {
  .setup {
    flex-direction: column;
    align-items: center;
  }

  .stats {
    flex-direction: column;
    gap: 10px;
  }

  #inputArea {
    height: 100px;
  }
}
