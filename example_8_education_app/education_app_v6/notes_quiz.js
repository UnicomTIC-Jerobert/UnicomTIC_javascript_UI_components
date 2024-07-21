document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get("content") || "1";
  const contentFile = `content${contentId}.html`;
  const questionFile = `content${contentId}.json`;

  // Load content
  fetch(contentFile)
    .then((response) => response.text())
    .then((data) => (document.getElementById("content").innerHTML = data));

  // Load questions
  fetch(questionFile)
    .then((response) => response.json())
    .then((data) => {
      const quizForm = document.getElementById("quizForm");
      data.questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `
                  <p>${question.question}</p>
                  ${question.options
                    .map(
                      (option, i) => `
                      <label>
                          <input type="radio" name="question${index}" value="${option}">
                          ${option}
                      </label>
                  `
                    )
                    .join("<br>")}
              `;
        quizForm.insertBefore(questionDiv, quizForm.lastChild);
      });
    });
});

function submitQuiz() {
  const quizForm = document.getElementById("quizForm");
  const formData = new FormData(quizForm);
  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get("content") || "1";
  const questionFile = `content${contentId}.json`;

  fetch(questionFile)
    .then((response) => response.json())
    .then((data) => {
      let score = 0;
      data.questions.forEach((question, index) => {
        const userAnswer = formData.get(`question${index}`);
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;
        const questionDiv = quizForm.children[index];
        questionDiv.style.border = isCorrect
          ? "2px solid green"
          : "2px solid red";
        questionDiv.style.backgroundColor = isCorrect
          ? "rgba(0, 128, 0, 0.1)"
          : "rgba(255, 0, 0, 0.1)";
        questionDiv.insertAdjacentHTML(
          "beforeend",
          `
                  <span>${isCorrect ? "✔️" : "❌"}</span>
              `
        );
      });

      const resultText = document.getElementById("resultText");
      const percentage = (score / data.questions.length) * 100;
      let message = "";
      if (percentage > 80) message = "Well done, you understood well!";
      else if (percentage > 50) message = "Try to understand more.";
      else message = "Need to focus more.";
      resultText.innerHTML = `Your score: ${score} out of ${data.questions.length}<br>${message}`;
      document.getElementById("resultModal").style.display = "block";

      // Store the result in local storage
      const scores = JSON.parse(localStorage.getItem("scores")) || [];
      const content = `content${contentId}`; // Example content name
      const existingScore = scores.find((s) => s.content === content);

      if (existingScore) {
        existingScore.score = score;
        existingScore.attempts += 1;
        existingScore.lastAttempt = new Date().toISOString();
      } else {
        scores.push({
          content,
          score,
          attempts: 1,
          lastAttempt: new Date().toISOString(),
        });
      }

      localStorage.setItem("scores", JSON.stringify(scores));
    });
}

function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}

function retakeQuiz() {
  closeModal();
  const quizForm = document.getElementById("quizForm");
  quizForm.reset();
  [...quizForm.querySelectorAll("div")].forEach((div) => {
    div.style.border = "none";
    div.style.backgroundColor = "transparent";
    div.querySelectorAll("span").forEach((span) => span.remove());
  });
}
