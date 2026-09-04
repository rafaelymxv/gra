let happiness = 100;
let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "Qual é a melhor posição para o bebê dormir?",
        options: ["De bruços", "De lado", "De barriga para cima", "Sentado"],
        correct: 2
    },
    {
        question: "Com que frequência um recém-nascido mama?",
        options: ["A cada 6 horas", "Livre demanda (quando quiser)", "Apenas 3 vezes ao dia", "A cada 1 hora sem falta"],
        correct: 1
    },
    {
        question: "O que é fundamental fazer após a mamada?",
        options: ["Trocar a fralda imediatamente", "Colocar para arrotar", "Dar um banho", "Deitar o bebê"],
        correct: 1
    },
    {
        question: "Como testar a temperatura da água do banho?",
        options: ["Com a mão inteira", "Com um termômetro culinário", "Com o cotovelo ou punho", "Não precisa testar"],
        correct: 2
    },
    {
        question: "Qual o benefício principal do leite materno?",
        options: ["Só engorda o bebê", "Evita cólicas", "Dá sono", "Nutrientes e anticorpos essenciais"],
        correct: 3
    },
    {
        question: "O que é o mecônio?",
        options: ["O primeiro arroto", "As primeiras fezes do bebê", "O choro inicial", "O primeiro soluço"],
        correct: 1
    },
    {
        question: "A partir de quando geralmente se introduz alimentos sólidos?",
        options: ["3 meses", "6 meses", "1 ano", "9 meses"],
        correct: 1
    },
    {
        question: "O que é importante para evitar assaduras?",
        options: ["Banho o dia todo", "Muita pomada", "Trocas frequentes de fralda", "Deixar sem fralda"],
        correct: 2
    },
    {
        question: "Como acalmar um bebê chorando?",
        options: ["Deixar chorar", "Sacudir forte", "Envolver em cueiro e balançar suave", "Colocar música alta"],
        correct: 2
    },
    {
        question: "Quem deve ser a rede de apoio da mãe?",
        options: ["Ninguém", "O pai, dindos e família próxima", "Apenas o médico", "Os vizinhos"],
        correct: 1
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const happyScoreElement = document.getElementById('happy-score');
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');
    const optionsGridElement = document.getElementById('options-grid');
    const endGameMessageElement = document.getElementById('end-game-message');
    const quizAreaElement = document.getElementById('quiz-area');
    const finalStatusElement = document.getElementById('final-status');
    const btnResetElement = document.getElementById('btn-reset');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length && happiness > 0) {
            const currentQuestion = questions[currentQuestionIndex];
            questionNumberElement.textContent = currentQuestionIndex + 1;
            questionTextElement.textContent = currentQuestion.question;
            optionsGridElement.innerHTML = ''; // Limpa opções antigas

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('btn-option');
                button.addEventListener('click', () => checkAnswer(index));
                optionsGridElement.appendChild(button);
            });
        } else {
            endGame();
        }
    }

    function checkAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = optionsGridElement.querySelectorAll('.btn-option');

        // Desabilita todos os botões após a resposta
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === currentQuestion.correct) {
            buttons[selectedIndex].classList.add('correct');
            score++;
        } else {
            buttons[selectedIndex].classList.add('wrong');
            buttons[currentQuestion.correct].classList.add('correct');
            happiness -= 15; // Perde felicidade se errar
            if (happiness < 0) happiness = 0;
            happyScoreElement.textContent = happiness;
        }

        // Aguarda um momento antes de carregar a próxima pergunta
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500); 
    }

    function endGame() {
        // Esconde a área do quiz e mostra a mensagem final
        //quizAreaElement.style.display = 'none';
        endGameMessageElement.classList.remove('end-game-hidden');
        endGameMessageElement.classList.add('end-game-visible');
        optionsGridElement.innerHTML = '';
        questionTextElement.textContent = 'Quiz Finalizado!';

        if (happiness <= 0) {
            finalStatusElement.textContent = `Poxa... O bebê ficou tristinho! (Pontuação: ${score}/10)`;
            document.getElementById('baby-img').style.filter = 'grayscale(100%)'; // Bebê fica cinza se perder
        } else if (score >= 8) {
            finalStatusElement.textContent = `Incrível! Você é uma super rede de apoio! (Pontuação: ${score}/10)`;
        } else {
            finalStatusElement.textContent = `Bom trabalho! Mas dá para aprender mais. (Pontuação: ${score}/10)`;
        }
    }

    function resetGame() {
        happiness = 100;
        currentQuestionIndex = 0;
        score = 0;
        happyScoreElement.textContent = happiness;
        endGameMessageElement.classList.remove('end-game-visible');
        endGameMessageElement.classList.add('end-game-hidden');
        document.getElementById('baby-img').style.filter = 'none';
        loadQuestion();
    }

    btnResetElement.addEventListener('click', resetGame);

    // Inicia o jogo
    loadQuestion();
});