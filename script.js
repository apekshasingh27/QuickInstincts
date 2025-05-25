let correctAnswer,correctType;
const optionButtons = document.querySelectorAll(".option");
const card = document.getElementById('card');
let streak = 0;

const questionTypes = [
  {
    type: "number",
    prompt: "What is the number behind this card?",
    pool: () => getRandomInt(10, 100).toString()
  },
  {
    type: "animal",
    prompt: "What is the animal behind this card?",
    pool: () => getRandomFromArray(["Cat", "Dog", "Elephant", "Tiger", "Lion"])
  },
  {
    type: "fruit",
    prompt: "What is the fruit behind this card?",
    pool: () => getRandomFromArray(["Apple", "Banana", "Mango", "Grapes", "Peach"])
  },
  {
    type: "color",
    prompt: "What is the color behind this card?",
    pool: () => getRandomFromArray(["Red", "Blue", "Green", "Yellow", "Purple"])
  }
];

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function generateQuestion() {
  // Randomly choose a question type
  const q = getRandomFromArray(questionTypes);
  currentType = q.type;
  correctAnswer = q.pool();

  // Generate fake options
  let options = [correctAnswer];
  while (options.length < 3) {
    const fake = q.pool();
    if (!options.includes(fake)) options.push(fake);
  }

  // Shuffle and display
  shuffleArray(options);
  optionButtons.forEach((btn, i) => {
    btn.textContent = options[i];
    btn.disabled = false;
  });

  // Set prompt
  document.getElementById("hidden-number-front").querySelector("h2").textContent = q.prompt;
  document.getElementById("hidden-number").textContent = "?";
  document.getElementById("hint").textContent = "";
  card.classList.remove('is-flipped');
}


// ✨ Utility: Random int in range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✨ Utility: Shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function checkAnswer(button) {
  const selected = parseInt(button.textContent);

  if (selected === correctAnswer) {
    streak++;
  } else {
    streak = 0; // reset streak on wrong answer
  }

  // Update streak display
  document.getElementById("streak").textContent = `Current Streak: ${streak}`;

  // Show number and flip card
  document.getElementById("hidden-number").textContent = correctAnswer;
  document.getElementById("card").classList.add("is-flipped");

  // Disable all option buttons
  optionButtons.forEach((btn) => (btn.disabled = true));
}function checkAnswer(button) {
  const selected = button.textContent;
  document.getElementById("hidden-number").textContent = correctAnswer;
  document.getElementById("card").classList.add("is-flipped");

  if (selected === correctAnswer) {
    streak++;
  } else {
    streak = 0;
  }

  document.getElementById("streak").textContent = `Current Streak: ${streak}`;
  optionButtons.forEach(btn => btn.disabled = true);
}



// 💡 Hint logic
function showHint() {
  const hint = document.getElementById("hint");

  if (isPrime(correctAnswer)) {
    hint.textContent = "Hint: It's a prime number.";
  } else {
    hint.textContent = "Hint: It's not a prime number.";
  }
}

// 📦 Call generateQuestion when page loads
window.onload = generateQuestion;

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
