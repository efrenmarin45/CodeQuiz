const timerElement = document.querySelector(".timer");
const startQuizElement = document.querySelector("#start-quiz");

var secondsLeft = 60;
var score = 0;
var currentQuestionIndex = 0;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft === 0) {
      endQuiz();
    }
  }, 1000);
}

startQuizElement.addEventListener("click", function() {
  var startScreenEl = document.getElementsByClassName("start-screen");
  startScreenEl[0].setAttribute("class", "hide");

  var questionsEl = document.getElementById("questions");
  questionsEl.removeAttribute("class");

  setTime();
  getQuestion();
});
function getQuestion() {
    console.log("questions:" +JSON.stringify(questions))
    console.log("index: " +currentQuestionIndex)
  var currentQuestion = questions[currentQuestionIndex];
    console.log("currentQuestions: " +currentQuestion)
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  var choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice; //1. strings
    choiceNode.onclick = choiceClick;
    choicesEl.appendChild(choiceNode);
    //<button class="choice" value="strings">Strings</button>
  });
}
function choiceClick(){
    console.log("clicked on choice")
    if(this.value !== questions[currentQuestionIndex].answer){
      time -=15;
      //display wrong
      if(time < o){
        time=0;
      }
      //update timer on the scree;
    }
    else{
    //display user saying correct
    }
    currentQuestionIndex++;
    if(currentQuestionIndex === questions.lenght){
      endQuiz();
    }
    else{
      getQuestion();
    }
}

function endQuiz() {
  //TODO Reference the 'Game Over' screen when timer runs out
  clearInterval(timerInterval);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;

  questionsEl.setAttribute("class", "hide");
}
