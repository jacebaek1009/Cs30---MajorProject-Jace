// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = clickoningridients;
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
  // let salmonPlace = new Ingredients(mouseX, mouseY, salmon);
  // ingredient.push(salmonPlace);

}


function draw() {
  for(let i of ingredient) {
    i.display();
  }
  for(let i of foodBasket) {
    i.display();
  }
  if(currentRoom === 0) {
    room0();
  }
  else if(currentRoom === 1) {
    room1();
  }
  isInRoom1();
}

function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    currentRoom += 1;
  }
  if(keyCode === LEFT_ARROW) {
    currentRoom -= 1;
  }
}

function mousePressed() {
  let isClicked = i.isInBasket(mouseX, mouseY, topSide, topSide + basketH, leftSide, leftSide + basketW);
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
    return x >= this.x && x <=this.width && (y <= this.height && y >= this.y);
  }
}

function grabIngridient(){
  ingredient(mouseX, mouseY, 40);
}

function mousePressed(){
  if (State === clickoningridients){
    grabIngridient();
  }

}

function startImageTransition(){
  let images = document.get
}

function room0() {
  currentRoom = 0;
  background(room0_0);
}

function room1() {
  currentRoom = 1;
  background(255);
}

function isInRoom1() {
  if(currentRoom === 1){
    let placeEggBasket = new Basket(windowWidth/2, windowHeight/2, eggBasket, 50, 50);
    foodBasket.push(placeEggBasket);
  }
}