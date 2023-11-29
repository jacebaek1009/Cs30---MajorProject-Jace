// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ingredient = [];
let salmon;
let basket;
let grab = true;
let backg;
let egg;
let eggBasket;
let foodBasket = [];


function preload() {
  salmon = loadImage("salmon.png");
  basket = loadImage("basket.png");
  backg = loadImage("background.png");
  egg = loadImage("egg.png");
  eggBasket = loadImage("eggbasket.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backg);
  let salmonPlace = new Ingredients(mouseX, mouseY, salmon);
  let placeEggBasket = new Basket(windowWidth/2, windowHeight/2, eggBasket, 50, 50);
  ingredient.push(salmonPlace);
  foodBasket.push(placeEggBasket);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }
  for(let i of foodBasket) {
    i.display();
  }
  startImageTransition();
}
function mousePressed() {
  let isClicked = ()
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
    return x >= this.x && x <=this.width && (y <= this.height && y >= this.y);
  }
}

function startImageTransition(){
  let images = document.get
}