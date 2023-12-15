//============declarations=======================

//Questions

let questions = new Map([
    [1, "Which continent is India part of?"],
    [2, "Which is the largest continent in area?"],
    [3, "Which is the smallest continent in area?"],
    [4, "Which continent is also called as an 'Island-Continent'?"],
    [5, "The largest mountain in the world, Mount Everest is situated in which continent?"],
    [6, "On Which Continent Is Egypt?"],
    [7, "On which continent can you find France?"],
    [8, "Which is the Second biggest continent of the world?"],
    [9, "Columbus found which continent?"],
    [10, "Where is Amazon River?"]
]);


//Answers to the questions

let answers = new Map([
    [1, "Asia"],
    [2, "Asia"],
    [3, "Australia"],
    [4, "Australia"],
    [5, "Asia"],
    [6, "Africa"],
    [7, "Europe"],
    [8, "Africa"],
    [9, "South America"],
    [10, "South America"]
])  

//defining the set for question numbers
let  questionNoList=new Set();
let currentQuestionNo;

//varibale to store the id returned by the setinterval function
let timerId;

 //fetching data from session Storage
const playerName=sessionStorage.getItem('playerName');
const noOfQuestion = sessionStorage.getItem('noOfQuestion');

//variable to store score
let score = 0;

//====================================================================

window.onload=function(){
    //random question number generation
    while(questionNoList.size<noOfQuestion){
        let randomValue=Math.floor(Math.random()*10);
        questionNoList.add(randomValue);
    }
    console.log(questionNoList);
    questionNoList = [...questionNoList];
    console.log(questionNoList)
    generateQuestion();
    // displayQuestion(); ---- already called inside generateQuestion()
}

//====================================================================
//Functions which provide questions and functionality to buttons

function generateQuestion(){
      //function which generates questions
    disableButton();
    removeTimeoutMessage();
    clearInterval(timerId); //clear the existing timer
    stopTimer();; //stop the timer
    startTimer();;
    if(questionNoList.length<=0){//if last question, go to result
        finalDisplayCalculate(score, noOfQuestion);;
        return;
    }
    currentQuestionNo = questionNoList.pop();

    enableAnswering();
    displayQuestion();
}

function displayQuestion(){

    let resultDisplayElement = document.getElementById("result-text");
    let questionDisplayElement = document.getElementById("question-text");


        resultDisplayElement.style.display="none"
        questionDisplayElement.innerText=questions.get(currentQuestionNo+1);

}

function displayCurrentResult(clickId){
    //display the result of current question
    let resultDisplayElement = document.getElementById("result-text");
   
    let answer=answers.get(currentQuestionNo+1);

    if(answer==clickId){
        resultDisplayElement.innerText = "Correct!";
        resultDisplayElement.style = "color:green";

        updateScore();
    }
    else{
        resultDisplayElement.innerText = "Wrong!";
        resultDisplayElement.style = "color:red";
    }
    resultDisplayElement.style.display = "block";
}

//function to update score based on questions
function updateScore(){
    score++;
}

function clickReciever(clickedElementId){
    //recieve and process the click on the map
    enableButton();//next button enabled
    clearInterval(timerId);//stop the timer
    stopTimer();
    disableAnswering();
    displayCurrentResult(clickedElementId);
}

function enableAnswering(){
    //eneble the clicking  the map
    areaContainer=document.querySelectorAll('area');
    areaContainer.forEach((question) => {
        question.onclick = function() {
            clickReciever(this.id);
        };
    });
}

function disableAnswering(){
    //disable clicking the map
    areaContainer=document.querySelectorAll('area');
    areaContainer.forEach((question) => {
        question.onclick = null;
    });
}

function displayTimeoutMessage() {
    document.getElementById('timeout-message').style.display = 'block';
    disableAnswering();
  }

function removeTimeoutMessage(){

    document.getElementById('timeout-message').style.display = 'none';
}  

function enableButton(){

    let button = document.getElementById("next-button");
    button.disabled = false;
    button.classList.remove("btn-danger");
    button.classList.add("btn-primary");
    button.style.opacity = 1;

    if (questionNoList.length <= 0) {//if last question, change the button text to submit
        button.innerHTML = "  Submit  ";
    }
    
    button.onclick=generateQuestion
}

function disableButton(){

    let button = document.getElementById("next-button");
    button.disabled = true;
    
    button.classList.remove("btn-primary");
    button.classList.add("btn-danger");
    button.style.opacity = 0.75;
    button.onclick = "";
}

//general utitlity function 

function startTimer() {
    let timer = 10;
    let displayElement = document.getElementById("timer");
    document.getElementById("timer-display").style.display = "block";
  
    // Use setInterval to update the timer display every second
    timerId = setInterval(function () {
        displayElement.textContent = timer;
    
        if (--timer < 0) {
            displayTimeoutMessage();
            enableButton();
            stopTimer();
            clearInterval(timerId);
        
        }
    }, 1000);
    // console.log("console id:",timerId)
  }
  
function stopTimer(){
    document.getElementById("timer-display").style.display = "none";

}


//==============================================================================

//display gif for highscore

function gifDisplayHighscore()
{
    setTimeout(function(){
        document.getElementById("highscore-gif").style='visibility:hidden';
    },5000);
    document.getElementById("highscore-gif").style='visibility:visible';
}

//diplay gif for low score

function gifDisplayLowscore()
{
    setTimeout(function(){
        document.getElementById("lowscore-gif").style='visibility:hidden';
    },5000);
    document.getElementById("lowscore-gif").style='visibility:visible';
}

//==============================================================================


//let playerName = 'josin';------------- created to test result display

//=============================================================================

// function to test calculation and display final result function independently
//not used for functioning of the program

function storehighscore() {
    
    let highscorename = 'name';
    let highscorenumber = 50;
    localStorage.setItem('highscorename', highscorename);
    localStorage.setItem('highscorenumber', highscorenumber);

}

//========================================================================


//function to select what to display on the final screen
const finalDisplayCalculate = (score, numberOfqs) => {
  

    let bgaudio=document.getElementById('bg-audio');
    bgaudio.pause();
    score = (Math.round(((parseInt(score) / parseInt(numberOfqs)) * 100) * 100) / 100).toFixed(2);
    let finalSentence;
    let highscorename = null;
    let highscorenumber;
    document.getElementById('card-inner').remove();

    if (localStorage.getItem("highscorename") !== null) {
        highscorenumber = parseInt(localStorage.getItem('highscorenumber'));
        highscorename = localStorage.getItem('highscorename');

//console.count("hn :" + highscorenumber + " " + highscorename + " ys: " + score);

        if (score == 100) {
            if (score > highscorenumber) {
                finalSentence = "Wow " + playerName + "! You scored 100% and set a new Record!";
                gifDisplayHighscore();
                localStorage.setItem('highscorename', playerName);
                localStorage.setItem('highscorenumber', score);

            }
            else {
                finalSentence = "Wow " + playerName + "! You scored 100%!";
                gifDisplayHighscore();
            }
        }
        else if (score == 0) {
            finalSentence = "You didn't even try " + playerName + " ...";
            gifDisplayLowscore();//lowscore
        }
        else if (highscorenumber < score) {
            finalSentence = "Wow " + playerName + "! You set a new Record!";
            gifDisplayHighscore();

            localStorage.setItem('highscorename', playerName);
            localStorage.setItem('highscorenumber', score);
        }
        else if (highscorenumber > score) {
            finalSentence = "We think you could do a little better " + playerName + ".";
        }
        else if (highscorenumber == score) {
            finalSentence = "Nice work " + playerName + ". You scored same as the current Record!";
            gifDisplayHighscore();

        }
    }
    else {
        highscorenumber = 0;
        if (score == 100) {
            finalSentence = "Wow " + playerName + "! You scored 100% and set a new Record as the first player!";
            gifDisplayHighscore();

        }
        else if (score == 0) {
            finalSentence = "You didn't even try " + playerName + " ... and set a record of '0'... Booo";
            gifDisplayLowscore();//lowscore
        }
        else {
            finalSentence = playerName + ", you actually set a new Record as the first player!";
            gifDisplayHighscore();


        }
        localStorage.setItem('highscorename', playerName);
        localStorage.setItem('highscorenumber', score);
    }

    console.log(finalSentence);
    displayResult(score, highscorename, highscorenumber, finalSentence);

}

//==================================================================================


//function to display the final screen - game over

const displayResult = (score, highscorename, highscorenumber, finalSentence) => {

    //gifDisplayHighscore();//display gif for beating high score
   
    const resultCard = document.createElement('div');
    resultCard.classList.add("card-body");
    resultCard.id = "card-inner";

    const gameOverText = document.createElement('h1');
    gameOverText.classList.add("game-over", "mb-4");
    gameOverText.innerText = "GAME OVER!";

    resultCard.appendChild(gameOverText);

    const cuRecDiv = document.createElement('div');
    cuRecDiv.id = "cRecScore-div";
    cuRecDiv.innerText = "Current Record : " + highscorenumber+"%";

    const cuRecNameDiv = document.createElement('div');
    cuRecNameDiv.id = "cRecName-div";
    cuRecNameDiv.innerText = "Record Holder : " + highscorename;

    if (highscorename == null) {
        cuRecDiv.style = "display:none";
        cuRecNameDiv.style = "display:none";
    }
    resultCard.appendChild(cuRecDiv);


    resultCard.appendChild(cuRecNameDiv);

    const yourScore = document.createElement('div');
    yourScore.id = "yourScore-div";
    yourScore.innerText = "Your Score : " + score+"%";

    resultCard.appendChild(yourScore);

    const sentence = document.createElement('div');
    sentence.id = "sentence-div";
    sentence.innerText = finalSentence;

    resultCard.appendChild(sentence);

    const replayButtonDiv = document.createElement('div');
    replayButtonDiv.id = "replay-button-div";

    const replayButton = document.createElement('button');
    replayButton.id = "replay-button";
    replayButton.classList.add("btn", "btn-success", "btn-lg","m-5");
    replayButton.innerHTML = "Try again";
    replayButton.onclick = function () {
        window.location.href = "./index.html";
    }

    //----------------- the replay icon is not working.

    // const replayIcon = document.createElement('i');
    // replayIcon.classList.add("bi", "bi-arrow-counterclockwise");

    // replayButton.appendChild(replayIcon);

    replayButtonDiv.appendChild(replayButton);

    resultCard.appendChild(replayButtonDiv);

    const mainCard = document.getElementById('main-card');
    mainCard.appendChild(resultCard);
}


//===========================================================

