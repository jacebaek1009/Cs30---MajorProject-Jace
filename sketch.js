// EJ's Sushiria
// Ieva Malezhyk and Jace Baek
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "clickoningredients";
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
let room2_0;
let room3_0;
let currentRoom = 0;
let buttonWidth = 150;
let buttonHeight = 100;
let demoCustomer;
let customerArray = [];

function preload() {
  room0_0 = loadImage("order-station.png");
  room1_0 = loadImage("cooking station.png");
  room2_0 = loadImage("build.png");

  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  
  eggBasket = loadImage("eggbasket.png");
  basket = loadImage("basket.png");

  demoCustomer = loadImage("demo customer.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let basketPlace = new Basket(width /2,height/2);
  foodBasket.push(basketPlace);

  let customerPlace = new Customer(windowWidth, windowHeight/2, 5, 10, 100, 100, demoCustomer);
  customerArray.push(customerPlace);
}

function draw() {
  for(let i of ingredient) {
    i.display();
  }

  if(currentRoom === 0) {
    room0();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
    for(let i of customerArray) {
      i.charDisplay();
      i.update();
      i.stopLoc();
    }
  }
  else if(currentRoom === 1) {
    room1();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
  }
  else if(currentRoom === 2) {
    room2();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
  }
  else if(currentRoom === 3) {
    room3();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
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
  let isClicked1 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 - 40, windowWidth/4 + buttonWidth);
  if(isClicked1) {
    room0();
  }
  let isClicked2 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 260, windowWidth/4  + 300 + buttonWidth);
  if(isClicked2) {
    room1();
  }
  let isClicked3 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 540, windowWidth/4 + 600+ buttonWidth);
  if(isClicked3) {
    room2();
  }

}

function room0() {
  currentRoom = 0;
  background(room0_0);
}

function room1() {
  currentRoom = 1;
  background(room1_0);
}

function room2() {
  currentRoom = 2;
  background(room2_0);
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
    rect(this.x, this.y, this.width, this.height);
  }
}

class Customer {
  constructor(x, y, dx, dy, width, height, character) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.char = character;
  }
  charDisplay() {
    image(this.char, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= this.dx;
  }
  stopLoc() {
    if(this.x <= 30) {
      this.dx = 0;
      this.x -= this.dx;
    }
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

function isInButton(x, y, top, bottom, left, right, padding = 20) {
  return x >= left - padding && x <= right + padding && (y <= bottom + padding && y >= top - padding);
}

function bottomRect() {
  fill("grey");
  rect(0, windowHeight - 100, windowWidth, 100);
}
