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

 //fetching data from session Storage
const playerName=sessionStorage.getItem('playerName');
const noOfQuestion = sessionStorage.getItem('noOfQuestion');

//variable to store score
let score = 0;

//====================================================================

window.onload=function(){
    //random question number generation
    while(questionNoList.size<noOfQuestion){
        let randomValue=Math.floor(Math.random()*10+1);
        questionNoList.add(randomValue);
    }
    questionNoList=[...questionNoList]
    generateQuestion();
    displayQuestion()
}

//====================================================================
//Functions which provide questions and functionality to buttons

function generateQuestion(){
      //function which generates questions

      if(questionNoList.length<=0){
        finalDisplayCalculate(score,noOfQuestion);
        return;
    }
    currentQuestionNo=questionNoList.pop()
    enableAnswering()
    displayQuestion()
}

function displayQuestion(){
        let questionDisplayElement=document.getElementById("question-text")
        let resultDisplayElement=document.getElementById("result-text")
        questionDisplayElement.innerText=questions[currentQuestionNo]
}

function displayCurrentResult(clickId){
    //display the result of current question
    let resultDisplayElement=document.getElementById("result-text")
    if(answers[currentQuestionNo]==clickId){
        resultDisplayElement.innerText="Correct"
        updateScore();
    }
    else{
        resultDisplayElement.innerText="Wrong"
    }
}

//function to update score based on questions
function updateScore(){
    score++;
}

function clickReciever(clickedElementId){
    //recieve and process the click on the map
    disableAnswering()
    displayCurrentResult(clickedElementId)
}

function enableAnswering(){
    //eneble the clicking  the map
    areaContainer=document.getElementsByTagName("Area")
    areaContainer.forEach((question) => {
        question.onclick = function() {
            clickReciever(this.id);
        };
    });
}

function disableAnswering(){
    //disable clicking the map
    areaContainer=document.getElementsByTagName("Area")
    areaContainer.forEach((question) => {
        question.onclick =null
    });
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
    document.getElementById("lowscore-image").style='visibility:visible';
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
  
    score = (Math.round(((parseInt(score) / parseInt(numberOfqs)) * 100) * 100) / 100).toFixed(2);
    let finalSentence;
    let highscorename = null;
    let highscorenumber;
    document.getElementById('card-inner').remove();

    if (localStorage.getItem("highscorename") !== null) {
        highscorenumber = localStorage.getItem('highscorenumber');
        highscorename = localStorage.getItem('highscorename');

//console.count("hn :" + highscorenumber + " " + highscorename + " ys: " + score);

        if (score == 100) {
            if (score > highscorenumber) {
                finalSentence = "Wow " + playerName + "! You scored 100% and set a new Record!";
                localStorage.setItem('highscorename', playerName);
                localStorage.setItem('highscorenumber', score);

            }
            else {
                finalSentence = "Wow " + playerName + "! You scored 100%!";
            }
        }
        else if (score == 0) {
            finalSentence = "You didn't even try " + playerName + " ...";
        }
        else if (highscorenumber < score) {
            finalSentence = "Wow " + playerName + "! You set a new Record!";
            localStorage.setItem('highscorename', playerName);
            localStorage.setItem('highscorenumber', score);
        }
        else if (highscorenumber > score) {
            finalSentence = "We think you could do a little better " + playerName + ".";
        }
        else if (highscorenumber == score) {
            finalSentence = "Nice work " + playerName + ". You scored same as the current Record!";
        }
    }
    else {
        highscorenumber = 0;
        if (score == 100) {
            finalSentence = "Wow " + playerName + "! You scored 100% and set a new Record!";
        }
        else if (score == 0) {
            finalSentence = "You didn't even try " + playerName + " ... and set a record of '0'... Booo";
        }
        else {
            finalSentence = playerName + ", you actually set a new Record as the first player!";

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

    
    const resultCard = document.createElement('div');
    resultCard.classList.add("card-body");
    resultCard.id = "card-inner";

    const gameOverText = document.createElement('h2');
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
    replayButton.classList.add("btn", "btn-success", "btn-lg");
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
