document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get("content");

  if (contentId) {
    // Load notes content
    fetch(`content${contentId}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        const notesContainer = document.getElementById("notes");
        notesContainer.innerHTML = data;
      })
      .catch((error) => console.error("Error fetching notes:", error));

    // Load quiz questions
    fetch(`content${contentId}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const quizContainer = document.getElementById("quiz");

        data.quiz.forEach((question, qIndex) => {
          const questionElement = document.createElement("div");
          questionElement.className = "question";
          questionElement.innerHTML = `<h3>${question.question}</h3>`;

          question.options.forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
                          <input type="radio" name="question${qIndex}" value="${option}">
                          <label>${option}</label>
                      `;
            questionElement.appendChild(optionElement);
          });

          quizContainer.appendChild(questionElement);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.className = "submit-btn";
        submitButton.addEventListener("click", () => checkAnswers(data.quiz));
        quizContainer.appendChild(submitButton);
      })
      .catch((error) => console.error("Error fetching quiz:", error));
  }
});

function checkAnswers(quiz) {
  const quizContainer = document.getElementById("quiz");
  const questions = quizContainer.querySelectorAll(".question");
  let score = 0;

  questions.forEach((questionElement, qIndex) => {
    const selectedOption = questionElement.querySelector(
      'input[type="radio"]:checked'
    );
    const correctAnswer = quiz[qIndex].answer;

    if (selectedOption) {
      const selectedValue = selectedOption.value;
      const icon = document.createElement("span");
      icon.className =
        selectedValue === correctAnswer ? "correct-icon" : "incorrect-icon";

      if (selectedValue === correctAnswer) {
        score++;
        questionElement.classList.add("correct");
        questionElement.classList.remove("incorrect");
      } else {
        questionElement.classList.add("incorrect");
        questionElement.classList.remove("correct");
      }
      questionElement.appendChild(icon);
    }
  });

  displayResults(score, quiz.length);
}

function displayResults(score, total) {
  const modal = document.getElementById("result-modal");
  const scoreElement = document.getElementById("score");
  const messageElement = document.getElementById("message");
  const percentage = (score / total) * 100;

  scoreElement.textContent = `${score} out of ${total}`;

  if (percentage > 80) {
    messageElement.innerHTML =
      '<span class="message-icon">🎉</span> Well done, you understood well!';
    messageElement.className = "message success";
  } else if (percentage > 50) {
    messageElement.innerHTML =
      '<span class="message-icon">👍</span> Try to understand more.';
    messageElement.className = "message warning";
  } else {
    messageElement.innerHTML =
      '<span class="message-icon">⚠️</span> Need to focus more.';
    messageElement.className = "message danger";
  }

  modal.style.display = "block";
}
