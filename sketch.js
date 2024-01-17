// EJ's Sushiria
// Ieva Malezhyk and Jace Baek
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let salmon;
let backg;
let egg;
let tofu;
let eggBasket;
let tofuBasket;
let salmonBasket;
let room0_0;
let room1_0;
let room2_0;
let room3_0;
let room4_0;
let currentRoom = 0;
let buttonWidth = 150;
let buttonHeight = 100;
let demoCustomer;
let customerArray = [];

let orderTimer = 0;
let orderTime = 8000;

let many = 3;

let howToArray = [];

let sushiRoll;
let sushi;
let strawberryTea;
let strawberryVisible = false;
let matcha;
let matchaVisible = false;
let buttonVisible = false;
let riceBowlWhite;
let baskets = [];
let pickedSquare = null;
let placedSquares = [];
let riceWhite;

let order;
let didOrder = false;
let level1Order1 = ["white Rice", "salmon", "crab",  "egg", "duck sauce", "matcha"];

const size = 200;
const spacing = size + 20;
let x = size;
const customerNum = 5;

let level1 = true;
let gaveFood = false;
let ordersDone = 0;

function preload() {
  room0_0 = loadImage("order-station.png");
  room1_0 = loadImage("cooking station.png");
  room2_0 = loadImage("build.png");
  room3_0 = loadImage("teaStation.png");
  room4_0 = loadImage("OrderStation2.png")


  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  tofu = loadImage("tofu.png");

  salmonBasket = loadImage("salmonBasket.png");
  eggBasket = loadImage("eggbasket.png");
  tofuBasket = loadImage("tofuBasket.png")
  basket = loadImage("basket.png");
  
  demoCustomer = loadImage("demo customer.png");

  sushiRoll = loadImage("sushi.png");
  riceBowlWhite = loadImage("whiteRice.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  sushi = spawnSushi();

  const spacing = size + 20;

  let x = size;

  sushi = spawnSushi();
  riceWhite = spawnRiceBowlWhite();

  
  let predict = new HowTo(windowWidth - 500, windowHeight/2, 50, 50, 5);
  howToArray.push(predict);
  
  for(let i = 0; i < customerNum; i++) {
      const customerEva = new CustomerEva(windowWidth, windowHeight - 300, 15, 10, size, demoCustomer);
      customerArray.push(customerEva);
      x -= spacing;
  }

  strawberryTea = createButton("Strawberry Tea");
  strawberryTea.size(200, 50);
  strawberryTea.style("background-color", "pink");

  matcha = createButton("Matcha");
  matcha.size(200, 50);
  matcha.style("background-color", "green");
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

function draw() {  
  if (level1 && !gaveFood) {
    if(currentRoom === 0) {
      room0();
      strawberryTea.hide();
      matcha.hide();
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
      
      if (didOrder) {
        orderButton();
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
      strawberryTea.hide();
      matcha.hide();
      bottomRect();
      displaySushi();
      displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
      displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
      displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
      displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
      displaySushi();
      displayRiceWhite();
    }
    else if(currentRoom === 2) {
      room2();
      strawberryTea.hide();
      matcha.hide();
      baskets.push(new Basket(width / 4, height / 2, 50, eggBasket));
      // baskets.push(new Basket(width / 2, height / 2, 50, color(0, 255, 0)));
      // baskets.push(new Basket((3 * width) / 4, height / 2, 50, color(0, 0, 255)));
      for (let basket of baskets) {
        basket.display();
      }
    
      for (let square of placedSquares) {
        square.display();
      }
    
      if (pickedSquare) {
        pickedSquare.update(mouseX, mouseY);
        pickedSquare.display();
      }

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
      strawberryTea.show();
      matcha.show();
      strawberryTea.mousePressed(toggleStrawberry);
      matcha.mousePressed(toggleMatcha);
      if (strawberryVisible) {
        fill("pink");
        rect(700, 370, 150, 200);
      }
      if (matchaVisible) {
        fill("green");
        rect(700, 370, 150, 200);
      }
    }
    else if(currentRoom === 4){
      strawberryTea.hide();
      matcha.hide();
        if (millis() > orderTimer + orderTime) {
          room0();
          orderTimer = millis();
        }
      }
    ordersDone++; 
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


function mousePressed(){
  let pickedFromBasket = false;

  for (let basket of baskets) {
    if (basket.contains(mouseX, mouseY)) {
      if (!pickedSquare) {
        pickedSquare = new Square(basket.x, basket.y, 30, basket.color);
        pickedFromBasket = true;
      } else {
        pickedSquare.release();
        pickedSquare = new Square(basket.x, basket.y, 30, basket.color);
        pickedFromBasket = true;
      }
      break;
    }
  }

  if (!pickedFromBasket && pickedSquare) {
    pickedSquare.release();
    placedSquares.push(pickedSquare);
    pickedSquare = null;
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
  
  let isClickedOrder = isInButton(mouseX, mouseY, windowHeight - 350, windowHeight - 450 + 115, 500, 600);
  if(isClickedOrder){
    roomOrder();
  }  
}


function mouseReleased() {
  basketSelected = false;
  selectedBasket = null;
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
  background(room4_0);
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
  background(room3_0);
}

function roomOrder() {
  background(room0_0);
  currentRoom = 4;
  console.log(level1Order1);
}

class Square {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isPicked = true;
  }
  update(x, y) {
    if (this.isPicked) {
      this.x = x;
      this.y = y;
    }
  }
  display() {
    fill(this.color);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
  release() {
    this.isPicked = false;
  }
}

class Basket {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
  }


  contains(x, y) {
    return (
      x > this.x - this.size / 2 &&
      x < this.x + this.size / 2 &&
      y > this.y - this.size / 2 &&
      y < this.y + this.size / 2
    );
  }


  display() {
    image(this.image, this.x,this.y,this.size,this.size)
  }
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
    if (this.x > 500) {
      this.x -= this.dx;
    }
    else {
      this.dx = 0;
    }
  }
  
  assignOrder() {
    if(this.dx === 0) {

      let orders = ["salmon", "egg"];
    
      this.order = orders;
      didOrder = true;
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

function spawnRiceBowlWhite() {
  let riceWhite = {
    x: windowWidth - 950,
    y: windowHeight - 650,
    width: 300,
    height: 200,
    image: riceBowlWhite
  };
  return riceWhite;
}

function displayRiceWhite() {
  image(riceWhite.image, riceWhite.x, riceWhite.y, riceWhite.width, riceWhite.height);
}

function orderButton() {
  fill("white");
  ellipse(550, windowHeight - 350, 155, 115);
}
