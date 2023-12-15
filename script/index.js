function start() {


  let nameStore = document.getElementById("firstName").value;
  let noOfQuestions = document.getElementById("number").value;



    
    
  sessionStorage.setItem("playerName", nameStore);
  sessionStorage.setItem("noOfQuestion", noOfQuestions);
  
  //    if (nameStore == "") {
  //   window.alert("Type first name");
  //   return;
  // } else {
  //   //this code needs fixing link is not reached
  //   window.location.replace("./game.html");
  //   console.log("reached")
  // }


  if (nameStore == "") {
    window.alert("Type first name");
  } else {
    window.location.assign("./game.html");
  }
  
  
  }
  
  // window.onload = function(){
  //     document.getElementById("intro-music").play();
  // }