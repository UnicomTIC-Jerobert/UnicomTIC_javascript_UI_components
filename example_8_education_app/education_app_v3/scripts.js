document.addEventListener("DOMContentLoaded", () => {
  // Load notes content
  fetch("content1.html")
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
  fetch("content1.json")
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
      submitButton.id = "submit-btn";
      submitButton.textContent = "Submit";
      quizContainer.appendChild(submitButton);

      const modal = document.createElement("div");
      modal.id = "result-modal";
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <p id="result-text"></p>
                </div>
            `;
      document.body.appendChild(modal);

      const resultText = document.getElementById("result-text");
      const modalElement = document.getElementById("result-modal");
      const closeModalButton = document.querySelector(".close-btn");

      closeModalButton.addEventListener("click", () => {
        modalElement.style.display = "none";
      });

      submitButton.addEventListener("click", () => {
        let score = 0;
        let totalQuestions = data.quiz.length;

        data.quiz.forEach((question, qIndex) => {
          const selectedOption = document.querySelector(
            `input[name="question${qIndex}"]:checked`
          );
          if (selectedOption && selectedOption.value === question.answer) {
            score++;
          }
        });

        let percentage = (score / totalQuestions) * 100;
        if (percentage > 80) {
          resultText.textContent = "Well done, you understood well!";
          resultText.style.color = "#00e676";
        } else if (percentage > 50) {
          resultText.textContent = "Try to understand more";
          resultText.style.color = "#ffeb3b";
        } else {
          resultText.textContent = "Need to focus more";
          resultText.style.color = "#f44336";
        }

        resultText.style.fontSize = "24px";
        modalElement.style.display = "block";
      });
    })
    .catch((error) => console.error("Error fetching quiz:", error));
});
