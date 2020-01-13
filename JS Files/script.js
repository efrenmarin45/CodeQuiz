var timerElement = document.querySelector(".timer");
var startQuizElement = document.querySelector("#start-quiz");
var retryQuiz = document.getElementById("retryQuiz");
var answerResponse = document.getElementById("answer-result");
var hideTimer = document.getElementById("timerButton");
var playerName = document.getElementById("username");
var submitBtn = document.getElementById("submit");

var secondsLeft = 1;
var score = 0;
var currentQuestionIndex = 0;
var currentQuestion = "";
var time = questions.length * 20;
var timerInterval = 0;
var questionsEl = "";
var hideTimer = "";
var quizScore = 0;

//Sets up timer
function setTime(){
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
function getQuestion(){
  var currentQuestion = questions[currentQuestionIndex];
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

  // setTimeout(function(){
  //   currentQuestion.setAttribute("class", "hide");
  // }, 1000);
}


//Penalizes user for wrong answer
function choiceClick(){
    if(this.value !== questions[currentQuestionIndex].answer){
      secondsLeft -=10;
      //Provide response for wrong answer
      answerResponse.removeAttribute("class");
      answerResponse.innerText = ("Wrong!")
      if(secondsLeft <= 0){
        secondsLeft = 0
      }
    }
    //Provide response for right answer
    else{
      answerResponse.removeAttribute("class");
      answerResponse.innerText = ("Correct!");
    }

    setTimeout(function(){
      answerResponse.setAttribute("class", "hide");
    }, 750);

    if (this.value == questions[currentQuestionIndex].answer){
      quizScore = quizScore + 5;
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
function endQuiz(){
  clearInterval(timerInterval);
  var gameover = document.getElementById("end-screen");
  gameover.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = score;

  var hideQuestions = document.getElementById("questions");
  hideQuestions.setAttribute("class", "hide");

  var hideTitle = document.getElementById("title");
  hideTitle.setAttribute("class", "hide");

  var timerButtonEl = document.getElementById("timerButton");
  timerButtonEl.setAttribute("class", "hide");

  var finalScore = document.getElementById("final-score");
  finalScore.innerText = (quizScore);

  retryQuiz.addEventListener("click", function(){
    location.href = "index.html";
  })
}

//TODO Work on highscore element and local storage
//Saves Highscore
// function inputScore(){
//   var enterName = playerName.value.trim();

//   if (enterName != ""){
//     var playerScores = JSON.parse(window.localStorage.getItem("playerName")) || [];
//     var newPlayerScore = {
//       score: time,
//       Player: username 
//     };

//     playerScores.push(newPlayerScore);
//     window.localStorage.setItem("playerScores", JSON.stringify(playerScores));

//     window.location.href = "highscores.html";
//   }
// };

// function enterKey(event){
//   if (event.key !== "Enter"){
//     inputScore();
//   }
// }

// submitBtn.onclick = inputScore();

// playerName.onkeyup = enterKey();