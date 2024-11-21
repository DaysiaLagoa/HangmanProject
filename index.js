import prompt from "picoprompt";
import wordBank from "./word-bank.js";
import { hangmanStages, welcomeMessage } from "./assets/ascii-art.js";

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
};

const initializeDisplay = (word) => {
    return "_".repeat(word.length).split("");
};

const updateDisplay = (display, word, letter) => {
    word.split("").forEach((char, index) => {
        if (char.toLowerCase() === letter.toLowerCase()) {
            display[index] = char;
        }
    });
};

const checkGuess = (word, letter) => {
    return word.toLowerCase().includes(letter.toLowerCase());
};

const isGameOver = (display, guesses) => {
    return !display.includes("_") || guesses <= 0;
};

const playHangman = () => {
    const word = getRandomWord();
    let display = initializeDisplay(word);
    let guessesLeft = 6;
    let guessedLetters = [];
    let wins = 0;
    let losses = 0;

    console.log(welcomeMessage);

    const playRound = () => {
        console.log(hangmanStages[6 - guessesLeft]);
        console.log(`\nCurrent word: ${display.join(" ")}\n`);
        console.log(`Guessed letters: ${guessedLetters.join(", ")}`);
        console.log(`Guesses left: ${guessesLeft}\n`);

        const guess = prompt("Please guess a letter: ");

        if (guessedLetters.includes(guess.toLowerCase())) {
            console.log("You already guessed that letter. Try again.");
            return playRound();
        }

        guessedLetters.push(guess.toLowerCase());

        if (checkGuess(word, guess)) {
            updateDisplay(display, word, guess);
        } else {
            guessesLeft--;
            console.log("Incorrect guess. Try again.");
        }

        if (!isGameOver(display, guessesLeft)) {
            playRound();
        } else {
            if (guessesLeft > 0) {
                console.log(`\nCongratulations! You guessed the word: ${word}`);
                wins++;
            } else {
                console.log(hangmanStages[6]);
                console.log(`\nGame over. The word was: ${word}`);
                losses++;
            }

            console.log(`\nWins: ${wins} | Losses: ${losses}`);
            const playAgain = prompt("Would you like to play again? (yes/no): ").toLowerCase();
            if (playAgain === 'yes') {
                playHangman();
            } else {
                console.log("Thanks for playing!");
            }
        }
    };

    playRound();
};

playHangman();