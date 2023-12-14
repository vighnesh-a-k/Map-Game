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
const noOfQuestion=sessionStorage.getItem('noOfQuestion');


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



function generateQuestion(){
    //function which generates questions

    if(questionNoList.length<=0){
        console.log("empty error")
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
    }
    else{
        resultDisplayElement.innerText="Wrong"
    }
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

