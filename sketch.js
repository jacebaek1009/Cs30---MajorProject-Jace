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
let tofu;
let eggBasket;
let tofuBasket;
let salmonBasket;
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
let spawnTimer = 0;
let many = 3;
let howToArray = [];
let sushiRoll;
let sushi;
let strawberryTea;
let strawberryVisible = false;
let matcha;
let matchaVisible = false;
let buttonVisible = false;

function preload() {
  room0_0 = loadImage("order-station.png");
  room1_0 = loadImage("cooking station.png");
  room2_0 = loadImage("build.png");
  room3_0 = loadImage("teaStation.png");


  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  tofu = loadImage("tofu.png");

  salmonBasket = loadImage("salmonBasket.png");
  eggBasket = loadImage("eggbasket.png");
  tofuBasket = loadImage("tofuBasket.png")
  basket = loadImage("basket.png");
  
  demoCustomer = loadImage("demo customer.png");

  sushiRoll = loadImage("sushi.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let eggBasketPlace = new Basket(width / 2 - 100, height / 2, eggBasket, 100, 100); 
  foodBasket.push(eggBasketPlace);
  
  let salmonBasketPlace = new Basket(width / 2 + 100, height / 2, salmonBasket, 100, 100);
  foodBasket.push(salmonBasketPlace);

  let tofuBasketPlace = new Basket(width / 2 + 300, height / 2, tofuBasket, 100, 100);
  foodBasket.push(tofuBasketPlace);

  strawberryTea = createButton("Strawberry Tea");
  strawberryTea.size(200, 50);
  strawberryTea.style("background-color", "pink");
  strawberryTea.mousePressed(toggleStrawberry);

  matcha = createButton("Matcha");
  matcha.size(200, 50);
  matcha.style("background-color", "green");
  matcha.mousePressed(toggleMatcha);

  sushi = spawnSushi();

  const size = 100;
  const spacing = size + 20;
  salmonBasket = new Basket(width / 2 + 100, height / 2, salmon, 100, 100); 
  foodBasket.push(salmonBasket);

  // let customerPlace = new CustomerEva(windowWidth, windowHeight/2, 5, 10, 100, 100, demoCustomer);
  // customerArray.push(evaPlace);

  let x = size;

  const customerNum = 5;

  for(let i = 0; i < customerNum; i++) {
    const customerEva = new CustomerEva(windowWidth, windowHeight/2, 15, 10, size, demoCustomer);
    customerArray.push(customerEva);
    x -= spacing;
  }
  
  let predict = new HowTo(windowWidth - 500, windowHeight/2, 50, 50, 5);
  howToArray.push(predict);
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
  
    for(const customerEva of customerArray) {
      customerEva.move();
      customerEva.draw();
      customerEva.assignOrder();
    }

    for (let i = 0; i < customerArray.length - 1; i++) {
      const currentCustomer = customerArray[i];
      const nextCustomer = customerArray[i + 1];
      const distance = nextCustomer.x - (currentCustomer.x + currentCustomer.size);

      if (distance < 0) {
        nextCustomer.x = currentCustomer.x + currentCustomer.size + 1;
      }
    }
  }

  else if(currentRoom === 1) {
    room1();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");

    displaySushi();
  }
  else if(currentRoom === 2) {
    room2();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
    for (let i = 0; i < howToArray.length; i++) {
      i.display();
    }
    if (basketSelected && selectedBasket !== null) {
      selectedBasket.x = mouseX;
      selectedBasket.y = mouseY;
      selectedBasket.display();
    }
  }
  else if(currentRoom === 3) {
    room3();
    bottomRect();
    displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
    displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
    displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
    displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
    strawberryTea.position(100, 100);
    matcha.position(350, 100)

    if (strawberryVisible) {
      fill("pink");
      rect(700, 370, 150, 200);
  }
  if (matchaVisible) {
    fill("green");
    rect(700, 370, 150, 200);
  }
  
}
}

function toggleStrawberry() {
  strawberryVisible = !strawberryVisible;
}
function toggleMatcha() {
  matchaVisible = !matchaVisible;
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

function mouseClicked() {
  for (let i = 0; i < customerArray.length; i++) {
    if (customerArray[i].customerClicked(mouseX, mouseY)) {
      customerArray.splice(i, 1);
      adjustCustomer(i);
      break;
    }
  }
  if (currentRoom === 1 && state === "clickoningredients") {
    for (let i = 0; i < foodBasket.length; i++) {
      if (foodBasket[i].isInBasket(mouseX, mouseY)) {
        let ing;
        if (i === 0) {
          ing = new Ingredients(foodBasket[i].x, foodBasket[i].y, egg);
        } else if (i === 1) {
          ing = new Ingredients(foodBasket[i].x, foodBasket[i].y, salmon);
        } else if (i === 2) {
          ing = new Ingredients(foodBasket[i].x, foodBasket[i].y, tofu);
        }
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
      break;
    }
  }
}


function mouseReleased() {
  basketSelected = false;
  selectedBasket = null;
  let isClicked1 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 - 40, windowWidth/4 + buttonWidth);
  if(isClicked1) {
    room0();
  }
  let isClicked2 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 260, windowWidth/4  + 200 + buttonWidth);
  if(isClicked2) {
    room1();
  }
  let isClicked3 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 540, windowWidth/4 + 600 + buttonWidth);
  if(isClicked3) {
    room2();
  }
  
  let isClicked4 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 750, windowWidth/4 + 900 + buttonWidth);
  if(isClicked4) {
    room3();
  }
}

function adjustCustomer(startPos) {
  let x = customerArray[startPos].x;
  for (let i = startPos; i < customerArray.length; i++){
    customerArray[i].x = x;
    x += customerArray[i].x + 10;
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

  let eggBasketBuild = new Basket(150, 335, eggBasket, 100, 100); 
  let salmonBasketBuild = new Basket(380, 335, salmonBasket, 100, 100); 
  let tofuBasketBuild = new Basket(550, 335, tofuBasket, 100, 100);  

  eggBasketBuild.display();
  salmonBasketBuild.display();
  tofuBasketBuild.display();


  displayButton(windowWidth / 4, windowHeight - 50, "lime", "Order Station");
  displayButton(windowWidth / 4 + 300, windowHeight - 50, "", "Cook Station");
  displayButton(windowWidth / 4 + 600, windowHeight - 50, "orange", "Build Station");
  displayButton(windowWidth / 4 + 900, windowHeight - 50, "purple", "Tea Station");
}

function room3() {
  currentRoom = 3;
  background(room3_0);
}


class HowTo {
  constructor(x, y, width, height, many) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.many = many;
  }
  display() {
    rect(this.x, this.y, this.width, this.height);
  }
  move() {
    for(let i = 0; i <= many; i++) {
      this.x += 20;
    }
  }
}

class Customerobject {
  constructor (x, y, dx, dy, size, characters) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.char = characters;
  }
}
class CustomerEva extends Customerobject {
  constructor(x, y, dx, dy, size, character) {
    super (x, y, dx, dy, size, character);
    this.originalX = x;
    this.order = null;
  }
  draw() {
    image(this.char, this.x, this.y, this.size, this.size);
  }
  
  move() {
    // Only move if not at the left edge
    if (this.x > 0) {
      this.x -= this.dx;
    }
  }
  
  assignOrder() {
    if(this.x === 1) {
      let orders = ["salmon", "egg"];
    
      this.order = orders;
      console.log(`Customer at (${this.x}, ${this.y}) has ordered: ${this.order}`);
    }
  }
  
  customerClicked(mx, my) {
    return mx >= this.x && mx <= this.x + this.size && my >= this.y && my <= this.y + this.size;
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



function spawnSushi() {
  let sushi = {
    x: windowWidth - 900,
    y: windowHeight - 400,
    image: sushiRoll
  };
  return sushi;
}

function displaySushi() {
  image(sushi.image, sushi.x, sushi.y);
}