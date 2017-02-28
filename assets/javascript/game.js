var dictionary = ["GERMANY", "AMERICA", "BRITAIN", "FRANCE", "ITALY"];
var blanks = " ";
var guesses = [];
var guessesRemaining = 12;
var guess;
var answer = [];
var isCompleted;
var score = 0;
var song = "";
var prevSong = "";

var word = setNewWord();
setAnswerArray();

document.onkeyup = function(event) {
    var valid = validateGuess(event.which);
    if (!valid) {
        console.log("Invalid key typed" + event.key);
        return;
    }
    guess = event.key.toUpperCase();
    console.log("Valid key typed" + guess);

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
                    play();
                    reset();

                }
                console.log("yay letter exist");
            }


        }
    } else {
        document.querySelector("#result").innerHTML = "Oh u lost!! Better try this time";
        console.log("lost !");
        reset();


    }




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


function play() {
    if (prevSong != "") {
        prevSong.pause();

    }
    song = new Audio("assets/songs/" + word + ".mp3");
    song.currentTime = 0;
    song.play();
    song.volume = 0.2;
    prevSong = song;
    document.querySelector("#flag").src = "assets/images/" + word + ".png";
}


document.onkeydown = function(event) {
    if (prevSong != "" && prevSong.volume > 0 && prevSong.volume < 1) {
        if (event.keyCode == 40) {
            prevSong.volume = prevSong.volume - 0.05;
        } else if (event.keyCode == 38) {
            prevSong.volume = prevSong.volume + 0.05;

        }
    }

}
