const timerElement = document.querySelector(".timer");
const startQuizElement = document.querySelector("#start-quiz");

var secondsLeft = 60;

function setTime(){
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0){
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}

startQuizElement.addEventListener("click", function(){
    setTime();
})

