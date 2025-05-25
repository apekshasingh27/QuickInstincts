const imageData = {
  animals: ["cat", "dog", "duck", "hamster", "horse"],
  fruits: ["apple", "banana", "grapes", "mango", "peach"]
};

const colorData = ["red", "blue", "green", "yellow"];
const numberData = [10, 20, 30, 40];

// Utility to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentQuestion;
let streak = 0;
const optionButtons = Array.from(document.querySelectorAll(".option"));

function getRandomImageQuestion(type) {
  const pool = imageData[type];
  const correct = pool[Math.floor(Math.random() * pool.length)];

  // Pick 3 wrong answers
  const wrongs = pool.filter(item => item !== correct);
  shuffleArray(wrongs);
  
  const options = [correct, ...wrongs.slice(0, Math.min(3, wrongs.length))];
  while (options.length < 4) {
    const candidate = pool[Math.floor(Math.random() * pool.length)];
    if (!options.includes(candidate)) options.push(candidate);
  }


  shuffleArray(options);

  return {
    type: type,
    prompt: `What is the ${type.slice(0, -1)} behind this card?`,
    options: options,
    answer: correct,
    display: `images/${type}/${correct}.jpg`
  };
}

function getRandomColorQuestion() {
  const correct = colorData[Math.floor(Math.random() * colorData.length)];
  const wrongs = colorData.filter(c => c !== correct);
  shuffleArray(wrongs);
  const options = [correct, ...wrongs.slice(0, Math.min(3, wrongs.length))];
  while (options.length < 4) {
    const candidate = colorData[Math.floor(Math.random() * colorData.length)];
    if (!options.includes(candidate)) options.push(candidate);
  }

  shuffleArray(options);

  return {
    type: "color",
    prompt: "What is the color behind this card?",
    options: options,
    answer: correct,
    display: correct
  };
}

function getRandomNumberQuestion() {
  const correct = numberData[Math.floor(Math.random() * numberData.length)];
  const wrongs = numberData.filter(n => n !== correct);
  shuffleArray(wrongs);
  const options = [correct, ...wrongs.slice(0, Math.min(3, wrongs.length))];

  while (options.length < 4) {
    const candidate = numberData[Math.floor(Math.random() * numberData.length)];
    if (!options.includes(candidate)) options.push(candidate);
  }
  shuffleArray(options);

  return {
    type: "number",
    prompt: "What number is behind this card?",
    options: options,
    answer: correct,
    display: correct
  };
}

function generateRandomQuestion() {
  const types = ["animals", "fruits", "color", "number"];
  const type = types[Math.floor(Math.random() * types.length)];

  switch (type) {
    case "animals":
    case "fruits":
      return getRandomImageQuestion(type);
    case "color":
      return getRandomColorQuestion();
    case "number":
      return getRandomNumberQuestion();
  }
}

function loadQuestion() {
  document.getElementById("card").classList.remove("is-flipped");
  document.getElementById("hidden-number").innerHTML = "";
  document.querySelector(".card-back").style.backgroundColor = "#fff";

  currentQuestion = generateRandomQuestion();
  document.getElementById("prompt").textContent = currentQuestion.prompt;

  optionButtons.forEach((btn, i) => {
    btn.textContent = currentQuestion.options[i];
    btn.disabled = false;
  });
}

function checkAnswer(button) {
  const selected = button.textContent;
  const displayElement = document.getElementById("hidden-number");

  if (currentQuestion.type === "animals" || currentQuestion.type === "fruits") {
    const img = document.createElement("img");
    img.src = currentQuestion.display;
    img.alt = currentQuestion.answer;
    img.style.maxWidth = "100px";
    displayElement.innerHTML = "";
    displayElement.appendChild(img);
  } else if (currentQuestion.type === "color") {
    displayElement.innerHTML = currentQuestion.answer;
    document.querySelector(".card-back").style.backgroundColor = currentQuestion.display;
  } else {
    displayElement.textContent = currentQuestion.display;
  }

  document.getElementById("card").classList.add("is-flipped");

  if (selected == currentQuestion.answer) {
    streak++;
  } else {
    streak = 0;
  }

  document.getElementById("streak").textContent = `Current Streak: ${streak}`;
  optionButtons.forEach(btn => btn.disabled = true);
}


document.getElementById("next-btn").addEventListener("click", loadQuestion);
document.getElementById("hint-btn").addEventListener("click", () => {
  alert(`Hint: The answer starts with "${currentQuestion.answer.toString()[0]}"`);
});

// Start with a question
loadQuestion();

//if (!window.listenersAttached) {
//  optionButtons.forEach(button => {
//    button.addEventListener("click", () => checkAnswer(button));
//  });
//  window.listenersAttached = true;
//}

