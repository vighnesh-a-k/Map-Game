function start() {


  let nameStore = document.getElementById("firstName").value;
  let noOfQuestions = document.getElementById("number").value;


  if (nameStore == "") {
    window.alert("Type first name");
    return;
  } else {
    //this code needs fixing link is not reached
    window.location.replace("./game.html");
    console.log("reached")
  }
    
    
    sessionStorage.setItem("playerName", nameStore);
  sessionStorage.setItem("noOfQuestion", noOfQuestions);
  
   
  
  
  }
  
  // window.onload = function(){
  //     document.getElementById("intro-music").play();
  // }