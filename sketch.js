// EJ's Sushiria
// Ieva Malezhyk and Jace Baek
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "clickoningredients";
let ingredient = [];
let basketSelected = false;
let selectedBasket = null;
let salmon;
let basket;
let grab = true;
let backg;
let egg;
let eggBasket;
let salmonBasket;
let foodBasket = [];
let room0_0;
let room1_0;
let currentRoom = 0;
let buttonWidth = 150;
let buttonHeight = 100;

function preload() {
  room0_0 = loadImage("order-station.png");
  room1_0 = loadImage("buildstation.jpg");

  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  salmonBasket = loadImage("salmonBasket.png")
  
  eggBasket = loadImage("eggbasket.png");
  basket = loadImage("basket.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let basketPlace = new Basket(width /2, height/2, eggBasket, width /2, height/2 );
  foodBasket.push(basketPlace);

  salmonBasket = new Basket(width / 2 + 100, height / 2, salmonBasket, 100, 100);
  foodBasket.push(salmonBasket);
}

function draw() {

  
  if(currentRoom === 0) {
    room0();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Build Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Cook Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "tea Station");
    for(let y of foodBasket){
      y.display();
    }
    for(let i of ingredient) {
      i.display();
  }
  }
  else if(currentRoom === 1) {
    room1();
    bottomRect();
  }
  else if(currentRoom === 2) {
    room2();
    bottomRect();
  }
  else if(currentRoom === 3) {
    room3();
    bottomRect();
  }
  if (basketSelected && selectedBasket !== null) {
    selectedBasket.x = mouseX;
    selectedBasket.y = mouseY;
    selectedBasket.display();
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
  if (currentRoom === 0 && state === "clickoningredients") {
    for (let i = 0; i < foodBasket.length; i++) {
      if (foodBasket[i].isInBasket(mouseX, mouseY)) {
        let ing = new Ingredients(foodBasket[i].x, foodBasket[i].y, egg, salmon);
        ingredient.push(ing);
        foodBasket.splice(i, 1);
        break; 
      }
    }
  }
  
  for (let i = 0; i < foodBasket.length; i++) {
    if (foodBasket[i].isInBasket(mouseX, mouseY)) {
      basketSelected = true;
      selectedBasket = foodBasket[i];
      if (i === 1) { 
        selectedBasket.type = salmon; 
      }
      break;
    }
  }
}


function mouseReleased() {
  basketSelected = false;
  selectedBasket = null;
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

function displayButton(x, y, color, say) {
  fill(color);
  ellipse(x, y, buttonWidth, buttonHeight);

  fill("black");
  textSize(20);
  textAlign(CENTER, CENTER);
  text(say, x, y);
}

function isInButton(x, y, top, bottom, left, right) {
  

}

function bottomRect() {
  fill("grey");
  rect(0, windowHeight - 100, windowWidth, 100);
}

