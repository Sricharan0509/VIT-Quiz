// Parse query parameters to get the scores from each round
var round1Score = parseInt(localStorage.getItem('round1Score')) || 0;
var round2Score = parseInt(localStorage.getItem('round2Score')) || 0;
var round3Score = parseInt(localStorage.getItem('round3Score')) || 0;

// Calculate the cumulative score (average of the three rounds)
var cumulativeScore = (round1Score + round2Score + round3Score) / 3;

// Determine admission status
let admissionStatus = "";
if (cumulativeScore > 9.5) {
    admissionStatus = "Congratulations! You have admitted to Vellore Campus.";
} else if (cumulativeScore >= 7.5 && cumulativeScore <= 9.4) {
    admissionStatus = "Congratulations! You have admitted to Chennai Campus.";
} else if (cumulativeScore >= 6.5 && cumulativeScore <= 7.4) {
    admissionStatus = "Congratulations! You have admitted to Amravati Campus.";
} else {
    admissionStatus = "Sorry! You have not Admitted";
}

// Display relevant information on the "result.html" page
document.getElementById('cumulativeScore').innerText = "Cumulative Score: " + cumulativeScore.toFixed(2);
document.getElementById('admissionStatus').innerText = "Admission Status: " + admissionStatus;
