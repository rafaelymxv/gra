let happiness = 50;
let level = 1;

const actions = {
    milk: {
        text: "Nhac nhac! Mamadeira quentinha! 🍼",
        emoji: "👶🍼",
        points: 15
    },
    diaper: {
        text: "Fralda limpinha e cheirosa! ✨",
        emoji: "👶✨",
        points: 20
    },
    lullaby: {
        text: "Dorme neném... O bebê deu uma cochilada! 😴",
        emoji: "👶💤",
        points: 10
    },
    play: {
        text: "Guti guti! O bebê deu uma risada gostosa! 😄",
        emoji: "👶💖",
        points: 15
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const babyElement = document.getElementById('baby');
    const statusElement = document.getElementById('status');
    const happyScoreElement = document.getElementById('happy-score');
    const levelElement = document.getElementById('level');

    function careAction(actionType) {
        if (happiness >= 100) return;

        const action = actions[actionType];
        happiness += action.points;

        if (happiness > 100) happiness = 100;

        babyElement.textContent = action.emoji;
        statusElement.textContent = action.text;
        happyScoreElement.textContent = happiness;

        checkLevel();
    }

    function checkLevel() {
        if (happiness >= 100) {
            statusElement.textContent = "🎉 PARABÉNS! Você é um(a) super Mamãe/Dindo(a)!";
            babyElement.textContent = "👶👑";
            level++;
            levelElement.textContent = level;
        }
    }

    function resetGame() {
        happiness = 50;
        happyScoreElement.textContent = happiness;
        babyElement.textContent = "👶";
        statusElement.textContent = "O bebê está pronto para mais carinho!";
    }

    document.getElementById('btn-milk').addEventListener('click', () => careAction('milk'));
    document.getElementById('btn-diaper').addEventListener('click', () => careAction('diaper'));
    document.getElementById('btn-lullaby').addEventListener('click', () => careAction('lullaby'));
    document.getElementById('btn-play').addEventListener('click', () => careAction('play'));
    document.getElementById('btn-reset').addEventListener('click', resetGame);
});