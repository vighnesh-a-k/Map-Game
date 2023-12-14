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

    // console.log(questionNoSet);

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