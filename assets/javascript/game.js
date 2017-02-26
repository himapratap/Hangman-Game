var dictionary = ["HELLO", "BYE"];
var blanks = " ";
var guesses = [];
var guessesRemaining = 12;
var guess;
var answer = [];
var isCompleted;
var score = 0;

var word = setNewWord();
setAnswerArray();

document.onkeyup = function(event) {
    guess = event.key.toUpperCase();
    validateGuess();
    if (guessesRemaining >= 1) {
        if (guesses.indexOf(guess) == -1) {
            guesses.push(guess);
            document.querySelector("#guessesRemaining").innerHTML = --guessesRemaining;

            document.querySelector("#guesses").innerHTML = guesses.toString();
            if (word.search(guess) > -1) {
                fillTheBlank();
                isCompleted = ifWon();
                if (isCompleted) {
                    score++;
                    document.querySelector("#wins").innerHTML = score;
                    document.querySelector("#result").innerHTML = "yaay u won !!";

                    reset();

                }
                console.log("yay letter exist");
            }


        }
    } else {
        document.querySelector("#result").innerHTML = "Oh u lost!! Better try this time";
        reset();


    }




}


function validateGuess() {

}

function reset() {
    guessesRemaining = 12;
    isCompleted = false;
    guesses = [];
    word = setNewWord();
    setAnswerArray();
    document.querySelector("#wins").innerHTML = score;
    document.querySelector("#guessesRemaining").innerHTML = guessesRemaining;
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#guesses").innerHTML = "";



}


function setNewWord() {
    var random = Math.floor((Math.random() * dictionary.length));
    return dictionary[random];
}

function setAnswerArray() {
    answer = [];
    for (var i = 0; i < word.length; i++) {
        answer.push("_");
    }
    formatBlank();
}

function fillTheBlank() {
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == guess) {
            answer[i] = guess;
        }
    }
    formatBlank();

}

function formatBlank() {
    var blanks = " ";
    for (var i = 0; i < answer.length; i++) {
        blanks = blanks + " " + answer[i];
    }
    document.querySelector("#currentWord").innerHTML = blanks;


}

function ifWon() {
    if (answer.indexOf("_") == -1) {
        return true;
    }
}
