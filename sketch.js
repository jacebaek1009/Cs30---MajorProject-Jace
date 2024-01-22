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

let cookingScore = 0;
let scoreIncrements = 0.01;
let orderTicket;

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

let sushiRoll;
let sushi;
let strawberryTea;
let strawberryPic;
let strawberryVisible = false;
let matcha;
let matchaPic;
let matchaVisible = false;
let mangoTea;
let mangoPic;
let mangoVisible = false;
let bSugarTea;
let sugarPic;
let bSugarVisible = false;
let taroTea;
let taroPic;
let taroVisible = false;
let riceBowlWhite;
let baskets = [];
let pickedSquare = null;
let placedSquares = [];
let riceWhite;
let whiteRiceNori;
let riceCookerInstance;

let riceCooker;
let nori;
let noriArray = [];
let cookedRice = false;
let switchRoomRice = false;

let didOrder = false;
const orders = [["1", "white Rice", "salmon", "crab",  "egg", "duck sauce", "matcha"],
              ["2", "brown Rice", "salmon", "crab",  "egg", "duck sauce", "matcha"]];
let tickets = [];
let interactionAllowed = true;
let startTime;
let ticketDelay = 8000;

const size = 200;
const spacing = size + 20;
let x = size;
const customerNum = 5;

let level1 = true;
let gaveFood = false;
let ordersDone = 0;

let bgSound;
let roomSwitched = false;

let hasIngredient = false;

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
  riceCooker = loadImage("ricePot.png");
  
  demoCustomer = loadImage("demo customer.png");
  
  nori = loadImage("whiteRiceOn.png");
  riceBowlWhite = loadImage("whiteRice.png");
  

  strawberryPic = loadImage("strawberrytea.png");
  matchaPic = loadImage("matcha.png");
  mangoPic = loadImage("mangotea.png");
  taroPic = loadImage("taroboba.png");
  sugarPic = loadImage("BSugar.png");

  orderTicket = loadImage("orderTicket.png");

  bgSound = loadSound("Bgback.mp3");
  bgSound.setVolume(1.0);

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
  
  
  if (!bgSound.isPlaying()) {
    bgSound.loop();
  }
  riceCookerInstance = new RiceCooker(200, windowHeight/2, 200, riceCooker)
  const spacing = size + 20;
  
  let x = size;
  
  sushi = spawnSushi();
  riceWhite = spawnRiceBowlWhite();
  
  for(let i = 0; i < customerNum; i++) {
    const customerEva = new CustomerEva(windowWidth, windowHeight - 300, 15, 10, size, demoCustomer);
    customerArray.push(customerEva);
    x -= spacing;
  }
  strawberryTea = createButton("Strawberry Milk Tea");
  strawberryTea.size(200, 50);
  strawberryTea.style("background-color", "pink");
  strawberryTea.position(100, 100);
  
  matcha = createButton("Matcha");
  matcha.size(200, 50);
  matcha.style("background-color", "green");
  matcha.position(350, 100);
  
  mangoTea = createButton("Mango Milk Tea");
  mangoTea.size(200, 50);
  mangoTea.style("background-color", "orange");
  mangoTea.position(600, 100);
  
  bSugarTea = createButton("Brown Sugar Milk Tea");
  bSugarTea.size(200, 50);
  bSugarTea.style("background-color", "brown");
  bSugarTea.position(850, 100);
  
  taroTea = createButton("Taro Milk Tea");
  taroTea.size(200, 50);
  taroTea.style("background-color", "purple");
  taroTea.position(1100, 100);
  
  bgSound.play();
}

function draw() {  
  
  if (level1 && !gaveFood) {
    if(currentRoom === 0) {
      room0();
      interactionAllowed = true;
      for (let i = 0; i < tickets.length; i++) {
        tickets[i].display();
        tickets[i].update();
      }
      strawberryTea.hide();
      matcha.hide();
      mangoTea.hide();
      bSugarTea.hide();
      taroTea.hide();
      
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

      if(didOrder) {
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
      if(roomSwitched) {
        placedSquares = [];
      }
      for (let basket of baskets) {
        if(basket.remove) {
          basket.removeFromArray();
        }
      }
      room1();
      for (let i = 0; i < tickets.length; i++) {
        tickets[i].display();
        tickets[i].update();
      }
      if(!switchRoomRice) {
        for (let nori of noriArray) {
          nori.display();
        }
      }
      riceCookerInstance.display();
      strawberryTea.hide();
      matcha.hide();
      mangoTea.hide();
      bSugarTea.hide();
      taroTea.hide();
      bottomRect();
      baskets.push(new Basket(riceWhite.x, riceWhite.y, riceWhite.width, riceWhite.image));
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
      
      displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
      displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
      displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");

      displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");

      roomSwitched = false;
    }
    else if(currentRoom === 2) {
      if(roomSwitched) {
        placedSquares = [];
      }
      for (let basket of baskets) {
        if(basket.remove) {
          basket.removeFromArray();
        }
      }
      room2();
      for (let i = 0; i < tickets.length; i++) {
        tickets[i].display();
        tickets[i].update();
      }
      if(cookedRice) {
        for (let nori of noriArray) {
          nori.display();
        }
        switchRoomRice = true;
        
      }
      roomSwitched = false;
      strawberryTea.hide();
      matcha.hide();
      mangoTea.hide();
      bSugarTea.hide();
      taroTea.hide();
      baskets.push(new Basket(width / 4 - 250, height / 3 - 100, 200, eggBasket));
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

      hasIngredient = false;
      roomSwitched = false;
    }
    else if(currentRoom === 3) {
      room3();
      for (let i = 0; i < tickets.length; i++) {
        tickets[i].display();
        tickets[i].update();
      }
      bottomRect();
      displayButton(windowWidth/4, windowHeight - 50, "lime", "Order Station");
      displayButton(windowWidth/4 + 300, windowHeight- 50, "", "Cook Station");
      displayButton(windowWidth/4 + 600, windowHeight- 50, "orange", "Build Station");
      displayButton(windowWidth/4 + 900, windowHeight- 50, "purple", "Tea Station");
      strawberryTea.show();
      matcha.show();
      mangoTea.show();
      bSugarTea.show();
      taroTea.show(); 
      strawberryTea.mousePressed(toggleStrawberry);
      matcha.mousePressed(toggleMatcha);
      mangoTea.mousePressed(toggleMango);
      bSugarTea.mousePressed(toggleSugar);
      taroTea.mousePressed(toggleTaro);

      if (strawberryVisible) {
        image(strawberryPic,700, 370, 150, 200);
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
      }
      if (matchaVisible) {
        image(matchaPic,700, 370, 150, 200);
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
      }
      if (mangoVisible) {
        image(mangoPic,700, 370, 150, 200);
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
      }
      if (bSugarVisible) {
        image(sugarPic,700, 370, 150, 200);
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
      }
      if (taroVisible) {
        image(taroPic,700, 370, 150, 200);
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
      }
    }
    else if(currentRoom === 4){
      strawberryTea.hide();
      matcha.hide();
      mangoTea.hide();
      bSugarTea.hide();
      taroTea.hide();
      image(demoCustomer, windowWidth - 500, windowHeight/2, 600, 600);
      
      for (let i = 0; i < tickets.length; i++) {
        tickets[i].display();
        tickets[i].update();
      }
      if (millis() > orderTimer + orderTime) {
        if (interactionAllowed) {
          // Select a random order index
          const orderIndex = Math.floor(random(orders.length));
          
          // Create a new ticket with the selected order
          const newTicket = new OrderTicket(width / 2, height / 2, 100, 200, orders[orderIndex]);
          tickets.push(newTicket);
          room0();
        }
        orderTimer = millis();
      }
    }
  }
  riceCookerInstance.update();
  ordersDone++; 
}


function toggleStrawberry() {
  strawberryVisible = !strawberryVisible;
}
function toggleMatcha() {
  matchaVisible = !matchaVisible;
}
function toggleMango() {
  mangoVisible = !mangoVisible;
}
function toggleSugar() {
  bSugarVisible = !bSugarVisible;
}
function toggleTaro() {
  taroVisible = !taroVisible;
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
  if(riceCookerInstance.contains(mouseX, mouseY)) {
    if (pickedSquare && pickedSquare.image === riceWhite.image) {
      riceCookerInstance.putWhiteRice();
    }
    else {
      riceCookerInstance.takeWhiteRice();
    }
  }
  if(currentRoom === 2) {
    for (let nori of noriArray) {
      nori.checkEggPlacement(mouseX, mouseY);
    }
  }

  for (let basket of baskets) {
    if(basket.image === eggBasket) {
      if (basket.contains(mouseX, mouseY)) {
        if (pickedSquare && pickedSquare.image === egg) {
          // Check if the basket contains the same ingredient as the one in hand
          pickedSquare.release();
          pickedSquare = null;
          hasIngredient = false;
        } else {
          if (!pickedSquare) {
            pickedSquare = new Ingredient(mouseX, mouseY, 100, egg);
            pickedFromBasket = true;
            hasIngredient = true;
          } else {
            pickedSquare.release();
            pickedSquare = new Ingredient(mouseX, mouseY, 100, egg);
            pickedFromBasket = true;
            hasIngredient = true;
          }
        }
        break;
      }
    }

    if(basket.image === riceBowlWhite) {
      if (basket.contains(mouseX, mouseY)) {
        if (!pickedSquare) {
          pickedSquare = new Ingredient(mouseX, mouseY, 30, basket.image);
          pickedFromBasket = true;
        } else {
          pickedSquare.release();
          pickedSquare = new Ingredient(mouseX, mouseY, 30, basket.image);
          pickedFromBasket = true;
        }
        break;
      }
    }
  }

  if (!pickedFromBasket && pickedSquare) {
    pickedSquare.release();
    placedSquares.push(pickedSquare);
    pickedSquare = null;
  }

  if (interactionAllowed) {
    // Check if the mouse is pressed inside any ticket
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].contains(mouseX, mouseY) && tickets[i].canMove()) {
        tickets[i].startDragging(mouseX, mouseY);
        break; // Break the loop once we find the first ticket that was clicked
      }
    }
  }
}

function mouseReleased() {
  // When the mouse is released, stop dragging for all tickets
  for (let i = 0; i < tickets.length; i++) {
    tickets[i].stopDragging();
  }
}

function mouseClicked() {
  if(currentRoom === 0) {
    let isClickedOrder = isInButton(mouseX, mouseY, windowHeight - 350, windowHeight - 350 + 115, 550 - 155 / 2, 550 + 155 / 2);
    for (let i = 0; i < customerArray.length; i++) {
      if (isClickedOrder) {
        orderRoom();
        customerArray.splice(i, 1);
        adjustCustomer(i);
        break;
      }
    }
      // Perform the room transition or any other action you want
  }
  let isClicked1 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 - 40, windowWidth/4 + buttonWidth);
  if(isClicked1) {
    room0();
  }
  let isClicked2 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 260, windowWidth/4  + 200 + buttonWidth);
  if(isClicked2) {
    room1();
    roomSwitched = true;
  }
  let isClicked3 = isInButton(mouseX, mouseY, windowHeight - 50, windowHeight - 50 + buttonHeight, windowWidth/4 + 540, windowWidth/4 + 600 + buttonWidth);
  if(isClicked3) {
    room2();
    roomSwitched = true;
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

function orderRoom() {
  background(room0_0);
  currentRoom = 4;
}

class Ingredient {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.isPicked = true;
  }
  update() {
    if (this.isPicked) {
      this.x = mouseX - this.size / 2;
      this.y = mouseY - this.size / 2;
    }
  }
  display() {
    image(this.image, this.x, this.y, this.size, this.size);
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
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }


  display() {
    image(this.image, this.x, this.y, this.size, this.size);
  }

  removeFromArray() {
    let index = baskets.indexOf(this);
    if(index !== -1) {
      baskets.splice(index, 1);
    }
  }

  remove() {
    this.toBeRemoved = true;
  }
}

class RiceCooker {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.hasWhiteRice = false;
    this.cookingTime = 0;
    this.cookingDuration = 5000;
  }

  contains(x, y) {
    return (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }

  putWhiteRice() {
    if(pickedSquare && pickedSquare.image === riceWhite.image) {
      this.hasWhiteRice = true;
      this.cookingTime = millis();
      pickedSquare.release();
      pickedSquare = null;
      switchRoomRice = false;
    }
  }

  takeWhiteRice() {
    if (this.hasWhiteRice) {
      cookedRice = true;
      this.hasWhiteRice = false;
      this.cookingTime = 0;
      noriArray.push(new Nori(sushi.x, sushi.y, 700, nori));
      console.log("rice taken out");
    }
  }

  update() {
    if (this.hasWhiteRice) {
      const currentTime = millis() - this.cookingTime;
      console.log("cookingTime: " + currentTime);
      if(currentTime >= this.cookingDuration) {
        if(cookingScore >= 0) {
          cookingScore -= scoreIncrements;
          console.log(cookingScore);
        }
      }
    }
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
    if (this.hasWhiteRice) {
      // Display white rice inside the rice cooker
      image(riceWhite.image, this.x, this.y, this.size, this.size);
    }
  }
}
 
class Nori {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.eggSquares = [];
    this.createEggSquares();
  }

  createEggSquares() {
    const squareSize = 80; // Adjust the size of each square
    const numSquares = 5;
    const spacing = 70; // Adjust the spacing between squares

    for (let i = 0; i < numSquares; i++) {
      const squareX = this.x - this.size / 2 + i * (squareSize + spacing);
      const squareY = this.y;
      this.eggSquares.push(new EggRef(squareX, squareY, squareSize));
    }
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
    for (const square of this.eggSquares) {
      fill(255, 255, 0, 150); // Yellow with some transparency
      rectMode(CENTER);
      const shiftedX = square.x + 400;
      const shiftY = square.y + 250;
      rect(shiftedX, shiftY, square.size, square.size);
    }
    rectMode(CORNER); // Reset rectMode to CORNER after drawing squares
  }

  checkEggPlacement(eggX, eggY) {
    if (pickedSquare && pickedSquare.isPicked) {
      let closestSquare = null;
      let closestDistance = Infinity;

      for (const square of this.eggSquares) {
        const distance = dist(eggX, eggY, square.x + 400 + square.size / 2, square.y + 250 + square.size / 2);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSquare = square;
        }
      }

      if (closestSquare) {
        console.log("Egg placed near a square! Distance:", closestDistance);
        // Additional actions based on the egg placement
      }
    }
  }
}
class EggRef {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  contains(px, py) {
    // Check if the point (px, py) is within the square
    return (
      px >= this.x - this.size / 2 &&
      px <= this.x + this.size / 2 &&
      py >= this.y - this.size / 2 &&
      py <= this.y + this.size / 2
    );
  }
}

class OrderTicket {
  constructor(x, y, width, height, ingredients) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ingredients = ingredients;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.moveStartTime = millis();
  }

  display() {
    // Draw the ticket as a rectangle
    image(orderTicket, this.x, this.y, this.width, this.height);

    // Display the ingredients
    fill(0);
    textAlign(CENTER, TOP);
    for (let i = 0; i < this.ingredients.length; i++) {
      text(this.ingredients[i], this.x + this.width / 2, this.y + i * 15 + this.height / 3);
    }
  }

  contains(px, py) {
    return (
      px > this.x &&
      px < this.x + this.width &&
      py > this.y &&
      py < this.y + this.height
    );
  }

  canMove() {
    // Check if enough time has passed since the ticket was spawned
    return millis() - this.moveStartTime > ticketDelay;
  }

  startDragging(mx, my) {
    if (this.contains(mx, my) && this.canMove()) {
      this.dragging = true;
      this.offsetX = mx - this.x;
      this.offsetY = my - this.y;
    }
  }

  stopDragging() {
    this.dragging = false;
    // Move the ticket to the top when released
    this.y = 10;
  }

  update() {
    if (this.dragging) {
      this.x = constrain(mouseX - this.offsetX, 0, width - this.width);
      this.y = constrain(mouseY - this.offsetY, 0, height - this.height);
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
      didOrder = true;
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



function spawnSushi() {
  let sushi = {
    x: windowWidth - 1000,
    y: windowHeight - 900,
    width: 1000,
    height: 400,
    image: sushiRoll
  };
  return sushi;
}

function spawnRiceBowlWhite() {
  let riceWhite = {
    x: windowWidth - 1200,
    y: windowHeight - 700,
    width: 300,
    height: 200,
    image: riceBowlWhite
  };
  return riceWhite;
}

function orderButton() {
  fill("white");
  ellipse(550, windowHeight - 350, 155, 115);

}