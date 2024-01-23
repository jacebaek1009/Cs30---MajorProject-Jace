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

let buildingScore1;
let buildingScore2 = 100;
let cookingScore = 100;
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

let sauceBottle;
let sauceDroplets = [];

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
let sushiDone;

let completeRoom;

let riceCooker;
let nori;
let noriArray = [];
let cookedRice = false;
let switchRoomRice = false;

let didOrder = false;
const order1 = ["white rice", "egg","egg","egg", "egg", "egg", "matcha tea"];
             
const order2 = ["white rice", "salmon", "strawberry tea"];
let tickets = [];
let interactionAllowed = true;
let startTime;
let ticketDelay = 8000;
let createdIngredients = [];

let finalRoomStart;
let finalRoom = 5000;

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

let gameState = "start";

function preload() {
  room0_0 = loadImage("order-station.png");
  room1_0 = loadImage("cooking station.png");
  room2_0 = loadImage("build.png");
  room3_0 = loadImage("teaStation.png");
  room4_0 = loadImage("OrderStation2.png")
  startScreen = loadImage("startscreen.png");

  
  egg = loadImage("egg.png");
  salmon = loadImage("salmon.png");
  tofu = loadImage("tofu.png");
  crab = loadImage("crab.png");

  salmonBasket = loadImage("salmonBasket.png");
  eggBasket = loadImage("eggbasket.png");
  tofuBasket = loadImage("tofuBasket.png");
  crabBasket = loadImage("crabBasket.png");
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

  sushiDone = loadImage("sushiDone.png");
  
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

  completeRoom = createButton("Finish");
  completeRoom.size(300, 300);
  completeRoom.style("backgroun-color", "green")
  completeRoom.position(windowWidth - 400, windowHeight / 2);

  sauceBottle = new SauceBottle(width / 2, height / 2);
  
  bgSound.play();
}

function draw() {  
  if (startScreen) {
    startRoom();
    strawberryTea.hide();
    matcha.hide();
    mangoTea.hide();
    bSugarTea.hide();
    taroTea.hide();
    completeRoom.hide();
  }
  if (gameState === "level1") {
    if (level1 && !gaveFood) {
      if(currentRoom === 0) {
        room0();
        interactionAllowed = true;
        for (let i = 0; i < tickets.length; i++) {
          tickets[i].display();
          tickets[i].update();
        }
        completeRoom.hide();
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
        completeRoom.hide();
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
        completeRoom.hide();
        strawberryTea.hide();
        matcha.hide();
        mangoTea.hide();
        bSugarTea.hide();
        taroTea.hide();
        baskets.push(new Basket(width / 4 - 250, height / 3 - 100, 200, eggBasket));
        baskets.push(new Basket(540, 285, 200, salmonBasket));
        baskets.push(new Basket(840, 285, 200, tofuBasket));
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

        sauceBottle.display();
        for (let i = sauceDroplets.length - 1; i >= 0; i--) {
          sauceDroplets[i].update();
          sauceDroplets[i].display();
          if (sauceDroplets[i].isOffScreen()) {
            sauceDroplets.splice(i, 1);
          }
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
        completeRoom.show();
        strawberryTea.mousePressed(toggleStrawberry);
        matcha.mousePressed(toggleMatcha);
        mangoTea.mousePressed(toggleMango);
        bSugarTea.mousePressed(toggleSugar);
        taroTea.mousePressed(toggleTaro);
        completeRoom.mousePressed(toggleEndRoom);

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
        orderRoom();
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

      else if(currentRoom === 5) {
        endRoom();
        if (millis() > orderTimer + orderTime) {
          room0();
        }
        image(sushiDone, windowWidth /2, windowHeight /2, 200, 200);
        if (strawberryVisible) {
          image(strawberryPic,windowWidth /2 - 40, windowHeight / 2, 150, 200);
          strawberryTea.hide();
          matcha.hide();
          mangoTea.hide();
          bSugarTea.hide();
          taroTea.hide();
        }
        if (matchaVisible) {
          image(matchaPic, windowWidth /2 - 40, windowHeight / 2, 150, 200);
          strawberryTea.hide();
          matcha.hide();
          mangoTea.hide();
          bSugarTea.hide();
          taroTea.hide();
        }
        if (mangoVisible) {
          image(mangoPic,windowWidth /2 - 40, windowHeight / 2, 150, 200);
          strawberryTea.hide();
          matcha.hide();
          mangoTea.hide();
          bSugarTea.hide();
          taroTea.hide();
        }
        if (bSugarVisible) {
          image(sugarPic, windowWidth /2 - 40, windowHeight / 2, 150, 200);
          strawberryTea.hide();
          matcha.hide();
          mangoTea.hide();
          bSugarTea.hide();
          taroTea.hide();
        }
        if (taroVisible) {
          image(taroPic,windowWidth /2 - 40, windowHeight / 2, 150, 200);
          strawberryTea.hide();
          matcha.hide();
          mangoTea.hide();
          bSugarTea.hide();
          taroTea.hide();
        }
        const result = compareArrays(order1, createdIngredients) 
        if(result === 1) {
          buildingScore1 = 100;
        }
        else {
          buildingScore1 = 50;
        }
        fill(150, 200, 250); 
        rect(50, 50, 300, 300); 
      
        fill(0); 
        textSize(24); 
        textAlign(CENTER, CENTER); 
        text(cookingScore, 200, 200);
      } 
    }
    riceCookerInstance.update();
    ordersDone++; 
  }
}

function compareArrays(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Compare elements of the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      // If any elements are different, return false
      return false;
    }
  }

  // If all elements are the same, return a number (e.g., 1)
  return 1;
}

function toggleStrawberry() {
  createdIngredients.push("strawberry tea")
  strawberryVisible = !strawberryVisible;
}
function toggleMatcha() {
  createdIngredients.push("matcha tea")
  matchaVisible = !matchaVisible;
}
function toggleMango() {
  createdIngredients.push("mango tea")
  mangoVisible = !mangoVisible;
}
function toggleSugar() {
  createdIngredients.push("brown sugar tea")
  bSugarVisible = !bSugarVisible;
}
function toggleTaro() {
  createdIngredients.push("taro tea")
  taroVisible = !taroVisible;
}
function toggleEndRoom(){
  currentRoom = 5;
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
  if (gameState === "start" && mouseX > width / 2 - 200 && mouseX < width / 2 + 200 && mouseY > height / 2 + 100 && mouseY < height / 2 + 200) {
    gameState = "level1";
    room0(); // Change the initial room when starting the game
  }
  if(gameState === "level1"){
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
              createdIngredients.push("egg");
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
          if (pickedSquare && pickedSquare.image === basket.image) {
            // Check if the basket contains the same ingredient as the one in hand
            pickedSquare.release();
            pickedSquare = null;
            hasIngredient = false;
          } 
          else {
            if (!pickedSquare) {
              pickedSquare = new Ingredient(mouseX, mouseY, 100, basket.image);
              pickedFromBasket = true;
              createdIngredients.push("white rice");
            } else {
              pickedSquare.release();
              pickedSquare = new Ingredient(mouseX, mouseY, 100, basket.image);
              pickedFromBasket = true;
            }
          }
          break;
        }
      }

      if(basket.image === tofuBasket) {
        if (basket.contains(mouseX, mouseY)) {
          if (pickedSquare && pickedSquare.image === tofu) {
            // Check if the basket contains the same ingredient as the one in hand
            pickedSquare.release();
            pickedSquare = null;
            hasIngredient = false;
            
          } 
          else {
            if (!pickedSquare) {
              pickedSquare = new Ingredient(mouseX, mouseY, 100, tofu);
              pickedFromBasket = true;
              createdIngredients.push("tofu");
              
            } else {
              pickedSquare.release();
              pickedSquare = new Ingredient(mouseX, mouseY, 100, tofu);
              pickedFromBasket = true;
              createdIngredients.push("tofu");
            }
          }
          break;
        }
      }

      if(basket.image === salmonBasket) {
        if (basket.contains(mouseX, mouseY)) {
          if (pickedSquare && pickedSquare.image === salmon) {
            // Check if the basket contains the same ingredient as the one in hand
            pickedSquare.release();
            pickedSquare = null;
            hasIngredient = false;
          } 
          else {
            if (!pickedSquare) {
              pickedSquare = new Ingredient(mouseX, mouseY, 100, salmon);
              pickedFromBasket = true;
              createdIngredients.push("salmon");
            } else {
              pickedSquare.release();
              pickedSquare = new Ingredient(mouseX, mouseY, 100, salmon);
              pickedFromBasket = true;
              createdIngredients.push("salmon");
            }
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
}

function mouseReleased() {
  // When the mouse is released, stop dragging for all tickets
  if(gameState === "level1") {
    for (let i = 0; i < tickets.length; i++) {
      tickets[i].stopDragging();
    }
  }
}

function mouseClicked() {
  if(gameState === "start") {
    room0();
    gameState = "level1";
  }
  if(gameState === "level1") {
    if(currentRoom === 0) {
      let isClickedOrder = isInButton(mouseX, mouseY, windowHeight - 350, windowHeight - 350 + 115, 550 - 155 / 2, 550 + 155 / 2);
      for (let i = 0; i < customerArray.length; i++) {
        if (isClickedOrder) {
          currentRoom = 4;
          customerArray.splice(i, 1);
          adjustCustomer(i);
          break;
        }
      }
        // Perform the room transition or any other action you want
    }
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

function endRoom() {
  background(room0_0)
  currentRoom = 5;
}

function startRoom() {
  background(startScreen);
  fill(255);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("EJ's Sushiria", width / 2, 120);
  fill(0);
  textSize(50);
  text("START GAME", width / 2 + 25, height / 2 + 130);
}

class SauceBottle {
  constructor(x, y) {
    this.x = 900;
    this.y = 50;
    this.size = 100;
    this.dropletRate = 5;
  }

  display() {
    fill(255,0,0);
    stroke(0)
    rect(this.x, this.y, this.size, this.size);
    fill(100);
    rect(940, 40, 20, 10);
  }
  drizzle() {
    for (let i = 0; i < this.dropletRate; i++) {
      let droplet = new SauceDroplet(950, 70);
      sauceDroplets.push(droplet);
    }
  }
  contains(x, y) {
    return (
      x >= this.x - this.size / 2 &&
      x <= this.x + this.size / 2 &&
      y >= this.y - this.size / 2 &&
      y <= this.y + this.size / 2
    );
  }
}

class SauceDroplet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = random(1, 5);
  }

  update() {
    this.y += this.speed;
    this.speed += 0.1;
  }

  display() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isOffScreen() {
    return this.y > height;
  }
}

class Ingredient {
  constructor(x, y, size, image, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.type = type;
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
    // Check if the mouse coordinates are within the boundaries of the image
    if (x >= this.x && x <= this.x + this.size && y >= this.y && y <= this.y + this.size) {
      // Get the color of the pixel at the mouse position
      const col = this.image.get(int(x - this.x), int(y - this.y));
  
      // Check if the alpha (transparency) value of the pixel is greater than 0
      return alpha(col) > 0;
    }
    
    return false;
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
        console.log("Ingredient placed near a square! Distance:", closestDistance);
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
    textSize(20);
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
