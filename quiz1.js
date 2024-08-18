var questions = [
    {
        question: "1. What is the chemical symbol for gold?",
        choices: ["Go", "Au", "Ag", "Fe"],
        correctAnswer: 1
    },
    {
        question: "2. Which gas makes up the largest portion of the Earth's atmosphere?",
        choices: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correctAnswer: 1
    },
    {
        question: "3. Which planet is known as the 'Red Planet'?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "4. What is the process by which plants make their own food using sunlight?",
        choices: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"],
        correctAnswer: 0
    },
    {
        question: "5. Which element is the primary component of natural gas?",
        choices: ["Methane", "Oxygen", "Hydrogen", "Helium"],
        correctAnswer: 0
    },
    {
        question: "6. What is the smallest unit of matter that retains the properties of an element?",
        choices: ["Atom", "Molecule", "Cell", "Proton"],
        correctAnswer: 0
    },
    {
        question: "7. Which force keeps planets in orbit around the sun?",
        choices: ["Gravity", "Magnetism", "Friction", "Electrostatic force"],
        correctAnswer: 0
    },
    {
        question: "8. What is the chemical formula for water?",
        choices: ["H2O2", "CO2", "H2O", "O3"],
        correctAnswer: 2
    },
    {
        question: "9. What is the process of a liquid changing into a gas at the surface called?",
        choices: ["Freezing", "Condensation", "Evaporation", "Sublimation"],
        correctAnswer: 2
    },
    {
        question: "10. What is the hardest naturally occurring substance on Earth?",
        choices: ["Steel", "Diamond", "Quartz", "Glass"],
        correctAnswer: 1
    }
];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 900; // 15 minutes (15 minutes * 60 seconds)
var t;

$(document).ready(function () {
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    timedCount();
    $(this).find(".nextround").hide();

    $(this).find(".preButton").on("click", function () {
        if (!quizOver) {
            if (currentQuestion == 0) {
                return false;
            }

            if (currentQuestion == 1) {
                $(".preButton").attr('disabled', 'disabled');
            }

            currentQuestion--;
            if (currentQuestion < questions.length) {
                displayCurrentQuestion();
            }
        } else {
            if (viewingAns === 3) {
                return false;
            }
            currentQuestion = 0;
            viewingAns = 3;
            viewResults();
        }
    });

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            var val = $("input[type='radio']:checked").val();
            if (val === undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                $(document).find(".quizMessage").hide();
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = val;
                currentQuestion++;
                if (currentQuestion >= 1) {
                    $('.preButton').prop("disabled", false);
                }
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + correctAnswers * 2 + " out of " + questions.length * 2);
                    c = 905;
                    $(document).find(".preButton").text("View Answer");
                    $(document).find(".nextButton").text("Retry Quiz");
                    quizOver = true;
                    return false;
                }
            }
        } else {
            quizOver = false;
            $('#iTimeShow').html('Time Remaining:');
            iSelectedAnswer = [];
            $(document).find(".nextButton").text("Next Question");
            $(document).find(".preButton").text("Previous Question");
            $(".preButton").attr('disabled', 'disabled');
            resetQuiz();
            viewingAns = 1;
            displayCurrentQuestion();
            hideScore();
        }
    });
    $(document).find(".nextButton").on("click", function () {
        if (quizOver && viewingAns !== 1) {
            // Show the "next round" button when the quiz is over
            $(document).find(".nextround").show();
        }
    });

    // Add a click event to the "next round" button to redirect to another page
    $(document).find(".nextround").on("click", function () {
        window.location.href = "round2.html"; // Replace with the URL of the next page
    });

});

function timedCount() {
    if (c == 905) {
        return false;
    }
    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt(c / 60) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    $('#timer').html(result);

    if (c === 0) {
        displayScore();
        $('#iTimeShow').html('Quiz Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        c = 905;
        $(document).find(".preButton").text("View Answer");
        $(document).find(".nextButton").text("Go to Next Round");
        quizOver = true;
        return false;
    }

    c = c - 1;
    t = setTimeout(function () {
        timedCount();
    }, 1000);
}

// This displays the current question AND the choices
function displayCurrentQuestion() {
    if (c === 905) {
        c = 900;
        timedCount();
    }

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);
    $(choiceList).find("li").remove();
    var choice;

    for (var i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        if (iSelectedAnswer[currentQuestion] == i) {
            $('<li><input type="radio" class="radio-inline" checked="checked" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        } else {
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers * 2 + " out of: " + questions.length * 2);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

function viewResults() {
    if (currentQuestion === 10) {
        currentQuestion = 0;
        return false;
    }
    if (viewingAns === 1) {
        return false;
    }

    hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);
    $(choiceList).find("li").remove();
    var choice;

    for (var i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        if (iSelectedAnswer[currentQuestion] == i) {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        } else {
            if (questions[currentQuestion].correctAnswer == i) {
                $('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            } else {
                $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
            }
        }
    }

    currentQuestion++;

    setTimeout(function () {
        viewResults();
    }, 3000);
}

var round1Score = correctAnswers * 2;
localStorage.setItem('round1Score', round1Score);
