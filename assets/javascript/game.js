var dictionary = ["GERMANY", "UNITED STATES OF AMERICA", "BRITAIN", "FRANCE", "ITALY", "INDIA"];
var blanks = " ";
var guessArr = [];
var guessesRemaining = 12;
var guess;
var answer = [];
var isCompleted;
var score = 0;
var loses = 0;
var song = "";
var prevSong = "";

var computerGuess = setNewWord();
setAnswerArray();

document.onkeyup = function(event) {
    var valid = validateGuess(event.which);
    if (!valid) {
        /*        console.log("Invalid key typed" + event.key);
         */
        return;
    }
    guess = event.key.toUpperCase();
    /*    console.log("Valid key typed" + guess);
     */
    if (guessesRemaining > 0) {

        if (guessArr.indexOf(guess) == -1) {

            if (computerGuess.search(guess) > -1) {
                fillTheBlank();
                success = ifWon();
                if (success) {
                    updateAndSetScore();
                    reset();
                }
                console.log("yay letter exist");
            } else {
                guessArr.push(guess);

            }

            if (answer.indexOf(guess) == -1) {
                document.querySelector("#guessesRemaining").innerHTML = --guessesRemaining;
                document.querySelector("#guesses").innerHTML = guessArr;

                if (guessesRemaining % 2 == 0) {
                    document.querySelector("#man").src = "assets/images/man/" + "hang_" + (guessesRemaining) + ".gif"; //--guessesRemaining;

                }

            }

        }
    }

    if (guessesRemaining == 0) {
        document.querySelector("#loses").innerHTML = ++loses;
        document.querySelector("#result").innerHTML = "Oh u lost !!";
        setTimeout(30000);
        alert("U lost");
        reset();
    }

}

function updateAndSetScore() {
    document.querySelector("#wins").innerHTML = ++score;
    document.querySelector("#result").innerHTML = "yaay u won !!";
    document.querySelector("#man").src = ""; //--guessesRemaining;

    playMusic();
    setFlag();
}

function setFlag() {

    document.querySelector("#flag").src = "assets/images/" + computerGuess + ".png";
    document.querySelector("#country").innerHTML = computerGuess;
    document.querySelector("#help").innerHTML = "Press &uarr\;, &darr\; keys to increase / decrease sound";
    document.querySelector(".aside").style.backgroundColor = "white";

}

function validateGuess(charCode) {
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
        return true;
    } else
        return false;

}

function reset() {
    guessesRemaining = 12;
    isCompleted = false;
    guessArr = [];
    computerGuess = setNewWord();
    setAnswerArray();
    document.querySelector("#guessesRemaining").innerHTML = guessesRemaining;
    document.querySelector("#result").innerHTML = "  ";
    document.querySelector("#guesses").innerHTML = "  ";
    document.querySelector("#man").src = "assets/images/man/" + "hang_" + (guessesRemaining) + ".gif"; //--guessesRemaining;




}


function setNewWord() {
    var random = Math.floor((Math.random() * dictionary.length));
    return dictionary[random];
}

function setAnswerArray() {
    answer = [];
    for (var i = 0; i < computerGuess.length; i++) {
        console.log(computerGuess.charAt(i));
        if (computerGuess.charAt(i) != ' ') {
            answer.push("_");
        } else {
            answer.push(' ');
        }


    }
    formatBlank();
}

function fillTheBlank() {
    for (var i = 0; i < computerGuess.length; i++) {
        if (computerGuess.charAt(i) == guess) {
            answer[i] = guess;
        }
    }
    formatBlank();

}

function formatBlank() {
    var blanks = " ";
    for (var i = 0; i < answer.length; i++) {
        console.log("formatBlank", answer[i], "jhikjo");

        if (answer[i] == " ") {
            blanks = blanks + " " + "&nbsp";
        } else {
            blanks = blanks + " " + answer[i];

        }
    }
    console.log("blanks", blanks);
    document.querySelector("#currentWord").innerHTML = blanks;


}

function ifWon() {
    if (answer.indexOf("_") == -1) {
        return true;
    }
}


function playMusic() {
    if (prevSong != "") {
        prevSong.pause();

    }
    song = new Audio("assets/songs/" + computerGuess + ".mp3");
    song.currentTime = 0;
    song.play();
    song.volume = 0.2;
    prevSong = song;
}


document.onkeydown = function(event) {
    if (prevSong != "" && prevSong.volume > 0.02 && prevSong.volume < 1) {
        if (event.keyCode == 40) {
            prevSong.volume = prevSong.volume - 0.02;
        } else if (event.keyCode == 38) {
            prevSong.volume = prevSong.volume + 0.02;

        }
    }

}
