const board = document.querySelector('.board');
const colorGame = document.querySelector('.selected-color');
const textScore = document.querySelector('.score');
const message = document.querySelector('.message');

const colors = [
  '#9369C6', '#54B5D2', '#B7D332' , '#FAF057', '#F9AF15', '#EE4C52'
]

let score = 0;

let selectedColor = colors[(Math.floor(Math.random() * colors.length) + 1)-1];
selectedColor = toRGB(selectedColor)
console.log(selectedColor);
colorGame.style.backgroundColor = selectedColor;

for (var i = 0; i < 100; i++) {
  createBox();
}

animateLight();

function createBox(){
  let box = document.createElement('div');
  box.className = 'box';
  box.style.transition = `${Math.floor(Math.random() * 5) + 1}s ease`
  board.appendChild(box);
}

function animateLight(){
  let boxes = document.querySelectorAll('.box');
  boxes.forEach((item, i) => {
    setInterval(()=>{
      let color = colors[Math.floor(Math.random() * colors.length) + 1];
      item.style.backgroundColor = color;
    }, Math.floor(Math.random() * 3000) + 1)

    item.addEventListener('click',() => {
      if (item.style.backgroundColor === selectedColor) {
        score++
        textScore.innerHTML = `${score}`;
        item.remove();
        if (score == "50") {
          message.innerHTML = "Is half of virus is already destroy. Keep going !.";
        }else if (score == "100") {
          message.innerHTML = "Cool bro you save the entire world &#127758;.";
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
