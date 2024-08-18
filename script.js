function validateForm(event) {
    var name = document.regForm["stud-name"].value;
    var mail = document.regForm["stud-mail"].value;
    var status = true; // Initialize status as true

    // Name Validation
    if (name === "") {
        document.getElementById("nameloc").innerHTML = "!Please enter your name";
        status = false; // Set status to false
    } else {
        document.getElementById("nameloc").innerHTML = ""; // Clear any error message
    }

    // Mail Validation
    if (mail === "") {
        document.getElementById("mailloc").innerHTML = "!Please enter your mailId";
        status = false;
    } else {
        var vitMailPattern = /^[A-Za-z]+\.[A-Za-z]+\d{4}@vitstudent\.ac\.in$/;
        if (!vitMailPattern.test(mail)) {
            document.getElementById("mailloc").innerHTML = "!Mail is not in VIT format";
            status = false;
        } else {
            document.getElementById("mailloc").innerHTML = "";
        }
    }

    // submit button
    if (status) {
        event.preventDefault();
        // If status is true, redirect to another page
        window.location.href = 'round1.html'; // Change 'success.html' to the desired page
    }
    if (!status) {
        // If status is false, prevent the form from submitting
        event.preventDefault();
    }

}
