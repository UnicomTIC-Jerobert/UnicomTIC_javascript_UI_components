document.addEventListener('DOMContentLoaded', () => {
    // Load Notes
    fetch('notes.json')
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notes-container');
            data.notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note';
                noteElement.innerHTML = `<h2>${note.title}</h2><p>${note.content}</p>`;
                notesContainer.appendChild(noteElement);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));

    // Load Quiz
    fetch('quiz.json')
        .then(response => response.json())
        .then(data => {
            const quizForm = document.getElementById('quiz-form');
            data.questions.forEach((question, index) => {
                const questionElement = document.createElement('div');
                questionElement.className = 'question';
                questionElement.innerHTML = `<h2>${question.question}</h2>`;
                
                question.options.forEach(option => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'option';
                    optionElement.innerHTML = `
                        <input type="radio" name="question${index}" value="${option}">
                        <label>${option}</label>
                    `;
                    questionElement.appendChild(optionElement);
                });
                
                quizForm.appendChild(questionElement);
            });
        })
        .catch(error => console.error('Error fetching quiz:', error));

    // Handle Submit
    document.getElementById('submit-btn').addEventListener('click', () => {
        fetch('quiz.json')
            .then(response => response.json())
            .then(data => {
                const form = document.getElementById('quiz-form');
                const formData = new FormData(form);
                let score = 0;

                data.questions.forEach((question, index) => {
                    const userAnswer = formData.get(`question${index}`);
                    if (userAnswer === question.answer) {
                        score++;
                    }
                });

                const result = document.getElementById('result');
                result.innerHTML = `Your score is: ${score} out of ${data.questions.length}`;
            })
            .catch(error => console.error('Error fetching quiz:', error));
    });
});