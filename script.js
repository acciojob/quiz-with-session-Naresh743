//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
        { question: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
        { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"], answer: "Shakespeare" }
    ];
    
    const questionContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");
    
    function loadQuiz() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${q.question}</p>`;
            
            q.options.forEach(option => {
                const label = document.createElement("label");
                label.innerHTML = `<input type='radio' name='q${index}' value='${option}'> ${option}`;
                questionDiv.appendChild(label);
            });
            
            questionContainer.appendChild(questionDiv);
        });
        restoreProgress();
    }
    
    function saveProgress() {
        const progress = {};
        questions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name='q${index}']:checked`);
            if (selectedOption) progress[`q${index}`] = selectedOption.value;
        });
        sessionStorage.setItem("progress", JSON.stringify(progress));
    }
    
    function restoreProgress() {
        const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
        Object.keys(savedProgress).forEach(key => {
            const radioInput = document.querySelector(`input[name='${key}'][value='${savedProgress[key]}']`);
            if (radioInput) radioInput.checked = true;
        });
    }
    
    function calculateScore() {
        let score = 0;
        questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name='q${index}']:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });
        localStorage.setItem("score", score);
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    }
    
    questionContainer.addEventListener("change", saveProgress);
    submitButton.addEventListener("click", calculateScore);
    
    loadQuiz();
    
    // Display last score if available
    const lastScore = localStorage.getItem("score");
    if (lastScore !== null) {
        scoreDisplay.textContent = `Your last score was ${lastScore} out of 5.`;
    }
});