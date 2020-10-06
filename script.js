let myModal = document.getElementById("myModal").style.display = "none";
const dino = document.getElementById("dino");
const firstCactus = document.getElementById("cactus-x1");
const secondCactus = document.getElementById("cactus-x2");
const thirdCactus = document.getElementById("cactus-x3");
let highScore = document.querySelector(".rec");
let result = document.querySelector(".result");
let count = 0;

let openModal = () => {
 let game = document.querySelector(".game").style.display = "none"; 
 let modal =  document.getElementById("myModal").style.display = "block"; 
 let close = document.querySelector(".close"); 
 close=document.addEventListener("click",function(event){
    document.getElementById("myModal").style.display = "none";
    let game = document.querySelector(".game").style.display = "block"; 
})
}

let hightScoreTotal = () => {
    const savedScores = localStorage.getItem('highscore') || '[]' // get the score, or the initial value if empty
    const highscores = [...JSON.parse(savedScores), count] // add the result
       highscores.sort(function(a, b) {
        return b - a;
        });
       localStorage.setItem('highscore', JSON.stringify(highscores)); 
       highScore.innerHTML = highscores[0]; 
}
window.onload = window.localStorage.clear();

 let  jumpSound = () => {
    let audio = new Audio("jump.mp3");
    audio.play();
}

 let recordSound = () =>{
   let audio = new Audio("record.mp3");
   audio.play();
 }

 let gameOver = () =>{
   let audio = new Audio("gameOver.mp3");
   audio.play();
 }

let jump = () => {
  if(dino.classList != "jump"){
    dino.classList.add("jump");
    jumpSound();
  setTimeout(function(){
    dino.classList.remove("jump");
  },350);
  } 
}

 let isAlive = setInterval(function(){
     // get current dino y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    // get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(firstCactus).getPropertyValue("left"));
    let secondCactusLeft = parseInt(window.getComputedStyle(secondCactus).getPropertyValue("left"));
    let thirdCactusLeft = parseInt(window.getComputedStyle(thirdCactus).getPropertyValue("left"));
    if((cactusLeft < 30 && cactusLeft > 0 && dinoTop >= 130) || secondCactusLeft < 30 && secondCactusLeft > 0 && dinoTop >= 130 || thirdCactusLeft < 30 && thirdCactusLeft > 0 && dinoTop >= 130 ){
           count > 0 ?  hightScoreTotal() : false;
           count = 0;
           result.innerHTML = count;
           gameOver();
           result.style.backgroundColor = "white";  
           count == 0 ? openModal() : false;
            
     }else if (dinoTop = 40 && cactusLeft < 0 ||  secondCactusLeft < 0  ||  thirdCactusLeft < 0) {
     result.innerHTML = ++count;
      }
          if(count >= 110){
              firstCactus.style.display ="none";
              secondCactus.style.display ="block";      
          }
           if(count >= 210){
            firstCactus.style.display ="none";
            secondCactus.style.display ="none";
            thirdCactus.style.display ="block"; 
          }
          if(count >= 270){
            firstCactus.style.display ="none";
            secondCactus.style.display ="none";
            thirdCactus.style.display ="block";
            thirdCactus.style.animationDuration = "0.9s";
          } else if(count == 0){
                 firstCactus.style.animationDuration = "1.3s";
                 secondCactus.style.animationDuration = "1s";
                 firstCactus.style.display ="block";
                 secondCactus.style.display ="none";
                 thirdCactus.style.display ="none";
          }
     if(count == 100 || count == 200 || count == 300  || count == 400 || count == 500 || count == 600 || count == 700  || count == 800 || count == 900 || count == 1000  ){
       recordSound();
     }
 },20); 
document.addEventListener("keydown",function(event){
    jump();
})
