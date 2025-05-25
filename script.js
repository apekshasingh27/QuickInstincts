let correctAnswer;
const optionButtons = document.querySelectorAll(".option");
const card = document.getElementById('card');
let streak = 0;


function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}


function generateQuestion() {
  correctAnswer = getRandomInt(10, 100);  // pick any range

  //fake but different options
  let wrong1, wrong2;
  do {
    wrong1 = correctAnswer + getRandomInt(-10, 10);
  } while (wrong1 === correctAnswer || wrong1 <= 0);

  do {
    wrong2 = correctAnswer + getRandomInt(-10, 10);
  } while (wrong2 === correctAnswer || wrong2 === wrong1 || wrong2 <= 0);

  // 3. shuffle all options
  let options = [correctAnswer, wrong1, wrong2];
  shuffleArray(options);

  // 4. Set the buttons
  optionButtons.forEach((btn, index) => {
    btn.textContent = options[index];
    btn.disabled = false;
  });

   card.classList.remove('is-flipped');
   document.getElementById("hidden-number").textContent = "?";
   document.getElementById("hint").textContent = "";
  // clear hidden number and hint
//document.getElementById('hidden-number-back').style.display = 'none';
//document.getElementById('hidden-number-front').style.display = 'block';
document.getElementById("streak").textContent = `Current Streak: ${streak}`;

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
