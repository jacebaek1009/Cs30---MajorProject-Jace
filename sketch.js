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
  let placeEggBasket = new Basket(windowWidth/2, windowHeight/2, eggBasket);
  ingredient.push(salmonPlace);
  ingredient.push(placeEggBasket);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }
  
}
function mousePressed() {
  let place = new Ingredients(mouseX, mouseY, salmon);
  ingredient.push(place);
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
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display(){
    image(this.type, this.x, this.y);
  }
  isInBasket(x, y, top, bottom, left, right) {
    return x >= left && x <=right && (y <= bottom && y >= top);
  }
}

