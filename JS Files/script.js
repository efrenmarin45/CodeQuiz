const timerElement = document.querySelector(".timer");
const startQuizElement = document.querySelector("#start-quiz");

var secondsLeft = 90;
var score = 0;
var currentQuestionIndex = 0;
var time = questions.length * 13;


//Sets up timer
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}


//Sets up beginning of quiz
startQuizElement.addEventListener("click", function() {
  var startScreenEl = document.getElementsByClassName("start-screen");
  startScreenEl[0].setAttribute("class", "hide");

  var questionsEl = document.getElementById("questions");
  questionsEl.removeAttribute("class");

  var timerEl = document.getElementById("timerTitle");
  timerEl.removeAttribute("class");

  setTime();
  getQuestion();

});


//Cycles through the questions
function getQuestion() {
    console.log("questions:" + JSON.stringify(questions))
    console.log("index: " + currentQuestionIndex)
  var currentQuestion = questions[currentQuestionIndex];
    console.log("currentQuestions: " + currentQuestion)
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  var choicesEl = document.getElementById("choices");
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = choice;
    choiceNode.onclick = choiceClick;
    choicesEl.appendChild(choiceNode);
  });
}


//Penalizes user for wrong answer
function choiceClick(){
    console.log("clicked on choice")
    if(this.value !== questions[currentQuestionIndex].answer){
      secondsLeft -=10;
      var wrongEl = document.getElementById("answer-result")
      wrongEl.innerText("Sorry! That's the wrong answer! Penalty: -10 seconds.")
      if(secondsLeft <= 0){
        secondsLeft = 0
      }
    }
    else{
    //display to user saying answer is correct
    }
    currentQuestionIndex++;
    if(currentQuestionIndex === questions.length){
      endQuiz();
    }
    else{
      getQuestion();
    }
}


//Ends the Quiz
function endQuiz() {
  clearInterval(timerInterval);
  var gameover = document.getElementById("end-screen");
  gameover.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;

  questionsEl.setAttribute("class", "hide");
}
