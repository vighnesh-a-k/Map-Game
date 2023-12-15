function playAudio(audio) {
    return new Promise((resolve) => {
      audio.play();
      audio.onended = resolve;
    });
  }
  async function start() {
    let nameStore = document.getElementById("firstName").value;
    let noOfQuestions = document.getElementById("number").value;
  
    sessionStorage.setItem("playerName", nameStore);
    sessionStorage.setItem("noOfQuestion", noOfQuestions);
  
    if (nameStore == "") {
      window.alert("Type first name");
    } else {
      let audio = new Audio("assets/music/start-13691.mp3");
      audio.loop = false;
      await playAudio(audio);
      window.location.assign("./game.html");
    }
  }
  