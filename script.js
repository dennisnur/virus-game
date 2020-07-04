const board = document.querySelector('.board');
const colorGame = document.querySelector('.selected-color');
const textScore = document.querySelector('.score');
const message = document.querySelector('.message');
const reloadButton = document.querySelector('.reload');
const gameScore = document.querySelector('.game-score');
const gameInfo = document.querySelector('.game-info');
const gameWon = document.querySelector('.game-won');
const time = document.querySelector('.time');
const rank = document.querySelector('.rank');
const greeting = document.querySelector('.greeting');
const labelReload = document.querySelector('.label-reload');

const colors = [
  '#9369C6', '#54B5D2', '#B7D332' , '#FAF057', '#F9AF15', '#EE4C52'
]
const rankTitle = [
  '&#127775;&#127775;&#127775;&#127775;&#127775;',
  '&#127775;&#127775;&#127775;&#127775;',
  '&#127775;&#127775;&#127775;',
  '&#127775;&#127775;',
  '&#127775;',
]
let score = 100;
let selectedColor = colors[(Math.floor(Math.random() * colors.length) + 1)-1];
let second = 0;
let minute = 0;
let clearTime;

reloadButton.addEventListener('click',reloadPage);

selectedColor = toRGB(selectedColor)
colorGame.style.backgroundColor = selectedColor;

for (var i = 0; i < 100; i++) {
  createBox();
}

animateLight();

setTimeout(()=>{
  starTime();
},3000)

function createBox(){
  let box = document.createElement('div');
  box.className = 'box';
  box.style.transition = `${Math.floor(Math.random() * 10 + 0.25) / 10}s ease`
  board.appendChild(box);
}

function animateLight(){
  let boxes = document.querySelectorAll('.box');
  boxes.forEach((item, i) => {
    let indColor = -1;
    setInterval(()=>{
      if (indColor < 0) {
        indColor = Math.floor(Math.random() * colors.length) + 1;
      }else if(indColor >= colors.length) {
        indColor = 0;
      }else {
        indColor++;
      }
      let color = colors[indColor];
      item.style.backgroundColor = color;
    }, Math.floor(Math.random() * 3000) + 1)

    item.addEventListener('click',() => {
      if (item.style.backgroundColor === selectedColor) {
        score--
        textScore.innerHTML = `${score}`;
        item.remove();
        if (score == "50") {
          message.innerHTML = "Half of virus is already destroy. Keep going! &#128558;.";
        }else if (score == "0") {
          gameInfo.style.display = 'none';
          gameInfo.style.display = 'none';
          gameWon.style.minHeight = '50vh';
          greeting.innerHTML = "Congratulations!";
          pickRank()
          reloadButton.style.display = 'block';
          labelReload.innerHTML = 'Play again ?';
          clearTimeout(clearTime);
        }
      }
    })
  });
}

function toRGB(color){
  let r = [color[1], color[2]]
  let g = [color[3], color[4]]
  let b = [color[5], color[6]]
  let result = '';

  r = convertLetter(r);
  g = convertLetter(g);
  b = convertLetter(b);

  r = toDecimal(r);
  g = toDecimal(g);
  b = toDecimal(b);

  result = `rgb(${r}, ${g}, ${b})`;
  return result;
}

function convertLetter(channel){
  for (var i = 0; i < channel.length; i++) {
    switch (channel[i].toLowerCase()) {
      case 'a':
        channel[i] = 10;
        break;
      case 'b':
        channel[i] = 11;
        break;
      case 'c':
        channel[i] = 12;
        break;
      case 'd':
        channel[i] = 13;
        break;
      case 'e':
        channel[i] = 14;
        break;
      case 'f':
        channel[i] = 15;
        break;
      default:
        channel[i] = parseInt(channel[i]);
    }
  }
  return channel;
}

function toDecimal(channel){
  let result = 0;
  for (var i = 0; i < channel.length-1; i++) {
    result = channel[i] * 16**1 + channel[i+1] * 16**0;
  }
  return result;
}

function reloadPage(){
  window.location.reload();
}

function starTime(){
  if (second === 60) {
    second = 0;
    minute += 1;
  }
  mins = (minute < 10) ? ('0' + minute + ':') : (minute + ':');
  secs = (second < 10) ? ('0' + second) : (second);
  if(minute > 0) {
    time.innerHTML = `${mins}${secs}`
  }else {
    time.innerHTML = `${secs}`
  }
  second++;
  clearTime = setTimeout(starTime, 1000);
}

function pickRank(){
  if (minute == 0 && second >= 0 && second <= 55) {
    rank.innerHTML = rankTitle[0];
    message.innerHTML = "You have strong immunity, to fight virus. &#128157;";
  }else if (minute == 1 && second >= 0 && second <= 25) {
    rank.innerHTML = rankTitle[1];
    message.innerHTML = "You have good immunity, to fight virus. &#128150;";
  }else if (minute == 1 && second >= 25 && second <= 45) {
    rank.innerHTML = rankTitle[2];
    message.innerHTML = "You have medium immunity, to fight virus. &#128155;";
  }else if (minute == 1 && second >= 45 && second <= 59) {
    rank.innerHTML = rankTitle[3];
    message.innerHTML = "You have low immunity, to fight virus. &#128148;";
  }else if (minute >= 2) {
    rank.innerHTML = rankTitle[4];
    message.innerHTML = "You need more nutrition, to fight virus. &#128420;";
  }
}

//social code
const socialOpen = document.querySelector('.open');
const socialClose = document.querySelector('.close');
const socialContainer = document.querySelector('.social-container');

socialOpen.addEventListener('click', showSocial);
socialClose.addEventListener('click', closeSocial);

function showSocial() {
  socialOpen.style.display = 'none';
  socialClose.style.display = 'inline';
  socialContainer.style.opacity = '1';
  socialContainer.style.transform = 'scale(1)';
  socialContainer.style.right = '100%';
}

function closeSocial() {
  socialOpen.style.display = 'inline';
  socialClose.style.display = 'none';
  socialContainer.style.opacity = '0';
  socialContainer.style.transform = 'scale(.5)';
  socialContainer.style.right = '-250%';
}
