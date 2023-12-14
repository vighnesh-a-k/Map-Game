function start() {
    event.preventDefault();
    let nameStore = document.getElementById("firstName").value;
    let noOfQuestions = document.getElementById("number").value;
    sessionStorage.setItem("username", nameStore);
    sessionStorage.setItem("questions", noOfQuestions);
  
    const name = document.getElementById("firstName");
  
    if (name.value == "") {
      window.alert("Type first name");
    } else {
      window.location.href = "game.html";
    }
  }
  
  window.onload = function(){
      document.getElementById("intro-music").play();
  }