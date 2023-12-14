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



var questionNoSet=new Set();

window.onload=function(){

    // sessionStorage.setItem('playerName','nebil');
    // sessionStorage.setItem('noOfQuestion',7);

    //fetching data from session Storage
    const playerName=sessionStorage.getItem('playerName');
    const noOfQuestion=sessionStorage.getItem('noOfQuestion');

    //random question number generation
    while(questionNoSet.size<noOfQuestion){
        let randomValue=Math.floor(Math.random()*10+1);
        questionNoSet.add(randomValue);

    }

    //console.log(questionNoSet);
    generateQuestion();
}

//function which generates and displays the questions
function generateQuestion(){
    questionNoSet.forEach(value=>{
        //console.log(questions.get(value));
        displayQuestion = document.getElementsByClassName("card-title")[0];
        displayQuestion.innerHTML = questions.get(value);
    })
}




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