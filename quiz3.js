var questions = [{
    question: "Guess the company from the logo:",
    image: "https://i.pinimg.com/originals/1e/be/8d/1ebe8d106ad9ebc3d608cbb354ca1b67.jpg",
    choices: ["BMW", "Volkswagen", "Benz", "Audi"],
    correctAnswer: 1
}, {
    question: "Guess the company from the logo:",
    image: "https://i.pinimg.com/236x/de/70/76/de707661af1dc6401d60e22a968b172f.jpg",
    choices: ["Honda", "Suzuki", "Yamaha", "Kawasaki"],
    correctAnswer: 2
}, {
    question: "Guess the company from the logo:",
    image: "https://media.designrush.com/inspiration_images/134802/conversions/_1511456315_653_apple-preview.jpg",
    choices: ["Microsoft", "Samsung", "Apple", "Sony"],
    correctAnswer: 2
}, {
    question: "Guess the company from the logo:",
    image: "https://pbs.twimg.com/profile_images/1080365925977665540/h9PChfwj_400x400.jpg",
    choices: ["Raymond", "Van Heusen", "Allen Solly", "Louis Philippe"],
    correctAnswer: 2
}, {
    question: "Guess the company from the logo:",
    image: "https://cdn.dribbble.com/users/1578582/screenshots/16712119/36l-ii-45.png",
    choices: ["Citizen", "Seiko", "Rolex", "Casio"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 480; // 8 minutes (8 minutes * 60 seconds)
var t;

$(document).ready(function () {
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');

    timedCount();
    $(this).find(".nextround").hide();

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
                    $('#timer').html("You scored: " + correctAnswers * 4 + " out of: " + questions.length * 4);
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
            $(document).find(".nextround").show();
        }
    });

    $(document).find(".nextround").on("click", function () {
        window.location.href = "round3.html"; // Replace with the URL of the next page
    });

    $(document).find(".nextButton").on("click", function () {
        if (quizOver && viewingAns !== 1) {
            // Show the "next round" button when the quiz is over
            $(document).find(".nextround").show();
        }
    });

    // Add a click event to the "next round" button to redirect to another page
    $(document).find(".nextround").on("click", function () {
        window.location.href = "result.html"; // Replace with the URL of the next page
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
        $('#timer').html("You scored: " + correctAnswers * 4 + " out of: " + questions.length * 4);
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

function displayCurrentQuestion() {
    if (c === 905) {
        c = 480;
        timedCount();
    }

    var question = questions[currentQuestion].question;
    var image = questions[currentQuestion].image;
    var questionClass = $(document).find(".quizContainer > .question");
    var imageContainer = $(document).find(".quizContainer > .imageContainer");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);
    $(imageContainer).html('<img src="' + image + '" />');
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
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers * 4 + " out of: " + questions.length * 4);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

function viewResults() {
    if (currentQuestion === 5) {
        currentQuestion = 0;
        return false;
    }
    if (viewingAns === 1) {
        return false;
    }

    hideScore();
    var question = questions[currentQuestion].question;
    var image = questions[currentQuestion].image;
    var questionClass = $(document).find(".quizContainer > .question");
    var imageContainer = $(document).find(".quizContainer > .imageContainer");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);
    $(imageContainer).html('<img src="' + image + '" />');
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
var round3Score = correctAnswers * 4;
localStorage.setItem('round3Score', round3Score);
