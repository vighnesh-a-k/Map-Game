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