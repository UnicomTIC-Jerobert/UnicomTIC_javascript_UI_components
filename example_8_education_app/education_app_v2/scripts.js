document.addEventListener("DOMContentLoaded", () => {
  fetch("notes_quiz.json")
    .then((response) => response.json())
    .then((data) => {
      const contentContainer = document.getElementById("content-container");
      data.content.forEach((section, index) => {
        const sectionElement = document.createElement("div");
        sectionElement.className = "content-section";
        sectionElement.innerHTML = `<h2>${section.title}</h2><p>${section.note}</p>`;

        section.quiz.forEach((question, qIndex) => {
          const questionElement = document.createElement("div");
          questionElement.className = "question";
          questionElement.innerHTML = `<h3>${question.question}</h3>`;

          question.options.forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.innerHTML = `
                            <input type="radio" name="question${index}${qIndex}" value="${option}">
                            <label>${option}</label>
                        `;
            questionElement.appendChild(optionElement);
          });

          sectionElement.appendChild(questionElement);
        });

        contentContainer.appendChild(sectionElement);
      });
    })
    .catch((error) => console.error("Error fetching content:", error));

  document.getElementById("submit-btn").addEventListener("click", () => {
    fetch("notes_quiz.json")
      .then((response) => response.json())
      .then((data) => {
        const form = document.querySelector("body");
        const formData = new FormData(form);
        let score = 0;
        let totalQuestions = 0;

        data.content.forEach((section, index) => {
          section.quiz.forEach((question, qIndex) => {
            const userAnswer = formData.get(`question${index}${qIndex}`);
            if (userAnswer === question.answer) {
              score++;
            }
            totalQuestions++;
          });
        });

        const result = document.getElementById("result");
        result.innerHTML = `Your score is: ${score} out of ${totalQuestions}`;

        if (score === totalQuestions) {
          const completedMessage = document.createElement("div");
          completedMessage.className = "completed";
          completedMessage.textContent =
            "Congratulations! You have completed this task.";
          result.appendChild(completedMessage);
        }
      })
      .catch((error) => console.error("Error fetching quiz:", error));
  });
});
