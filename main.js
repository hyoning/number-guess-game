let computerNum = 0
let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.getElementById('result-area')
let inputHint = document.getElementById('input-hint');
let resetButton = document.getElementById('reset-button');
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = []

playButton.addEventListener('click', function(){
  let audio1 = new Audio('music/go.mp3');
  audio1.play();
  play();
});
resetButton.addEventListener('click', reset);


// Input 영역 클릭 시 빈값으로 변경 한다.
userInput.addEventListener("focus",function(){
    userInput.value="";
});

// 랜덤한 값 만들기
function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 50) + 1;
    console.log(computerNum)
}


function play(){
  let userValue = userInput.value;
  // 1 이하 100 이상일때, 나오는 문구
  if(userValue < 1 || userValue > 50){
    inputHint.textContent = "1과 50사이 숫자를 입력해주세요."
    return;
  }

  // 동일한 값 입력 했을 때, 다시 기회를 줌
  if(history.includes(userValue)){
    inputHint.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
    return;
  }


  chances -- ;
  chanceArea.textContent = `남은기회 : ${chances}번`;

  // 숫자 힌트 및 정답시 문구  
  if(userValue < computerNum){
    resultArea.textContent = "UP!!"
  } else if(userValue > computerNum){
    resultArea.textContent = "down!!"
  } else{
    resultArea.textContent = "맞추셨습니다!!"
    gameOver = true;
    let audio3 = new Audio('music/success.mp3');
    audio3.play();
  }

  history.push(userValue);
  
  // 기회 다썼을때
  if(chances < 1){
    gameOver = true
    resultArea.textContent = `다시 도전 하세요! 정답은 ${computerNum}`
    let audio4 = new Audio('music/fail.mp3');
    audio4.play();
  }

  // 게임이 끝났을때 버튼 disabled
  if(gameOver == true){
    playButton.disabled = true;
    
  }
  inputHint.textContent = "";
}

// reset
function reset(){
    userInput.value = "";
    resultArea.textContent = "좋아! 이번엔 꼭 성공해!";
    pickRandomNum();
    chances = 5
    chanceArea.textContent = `기회 : ${chances}`;
    history=[];
    playButton.disabled = false;
    gameOver = false;
    let audio2 = new Audio('music/start.mp3');
    audio2.play();
}

pickRandomNum();

