// EJ's Sushiria
// Ieva Malezhyk and Jace Baek
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "clickoningridients";
let ingredient = [];
let salmon;
let basket;
let grab = true;
let backg;
let egg;
let eggBasket;
let foodBasket = [];
let room0_0;
let room1_0;
let currentRoom = 0;
const newButton = document.createElement('button');
neButton.textContent = 'Click me!';
document.body.appendChild(newButton);



function preload() {
  room0_0 = loadImage("background.png");
  room1_0 = loadImage("buildstation.jpg");

  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  
  eggBasket = loadImage("eggbasket.png");
  basket = loadImage("basket.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let salmonPlace = new Ingredients(mouseX, mouseY, salmon);
  ingredient.push(salmonPlace);

  let basketPlace = new Basket(windowWidth / 2 - basket.width / 2, windowHeight / 2 - basket.height / 2, basket, basket.width, basket.height);
  foodBasket.push(basketPlace);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }

  if(currentRoom === 0) {
    room0();
  }
  else if(currentRoom === 1) {
    room1();
    for(let i of foodBasket) {
      i.display();
    }
  }
  else if(currentRoom === 2) {
    room2();
  }
  else if(currentRoom === 3) {
    room3();
  }
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    if(currentRoom === 0) {
      currentRoom = 1;
    }
    else if(currentRoom === 1){
      currentRoom = 2;
    }
    else if(currentRoom === 2) {
      currentRoom = 3;
    }
  }
  if(keyCode === LEFT_ARROW) {
    if(currentRoom === 1) {
      currentRoom = 0;
    }
    else if(currentRoom === 2) {
      currentRoom = 1;
    }
    else if(currentRoom === 3) {
      currentRoom = 2;
    }
  }
}



class Ingredients {
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display() {
    noStroke();
    fill(255, 0 , 0);
    image(this.type, this.x, this.y);
  }
}

class Basket {
  constructor(x, y, type, width, height){
    this.x = x;
    this.y = y;
    this.type = type;
    this.width = width;
    this.height = height;
  }

  display(){
    image(this.type, this.x, this.y, this.width, this.height);
  }
  
  isInBasket(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }
}

function mousePressed() {
  if (currentRoom === 1 && state === "clickoningredients") {
    for (let i = 0; i < foodBasket.length; i++) {
      if (foodBasket[i].isInBasket(mouseX, mouseY)) {
        let ing = new Ingredients(foodBasket[i].x, foodBasket[i].y, egg);
        ingredient.push(ing);
        foodBasket.splice(i, 1);
        break; 
      }
    }
  }
}

function room0() {
  currentRoom = 0;
  background(room0_0);
}

function room1() {
  currentRoom = 1;
  background(255);
}

function room2() {
  currentRoom = 2;
  background(0);
}

function room3() {
  currentRoom = 3;
  background(150);
}

function isInRoom1() {
  if(currentRoom === 1){
    let placeEggBasket = new Basket(windowWidth/2, windowHeight/2, eggBasket, 50, 50);
    foodBasket.push(placeEggBasket);
  }
}

class HowTo {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  display() {
    rect(this.x, this.y, this.width, this.height)
  }
}
