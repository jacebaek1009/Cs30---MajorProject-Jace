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

let many = 3;

let howToArray = [];

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

let order;
let didOrder = false;
let tickets = [["white Rice", "salmon", "crab",  "egg", "duck sauce", "matcha"],
              ["brown Rice", "salmon", "crab",  "egg", "duck sauce", "matcha"]];

const size = 200;
const spacing = size + 20;
let x = size;
const customerNum = 5;

let level1 = true;
let gaveFood = false;
let ordersDone = 0;

let bgSound;
let roomSwitched = false;

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
  taroPic = loadImage("tarotea.png");
  sugarPic = loadImage("BSugar.png");

  orderTicket = loadImage("orderTicket.png");

  bgSound = loadSound("Bgback.mp3");
  bgSound.setVolume(1.0);

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  riceCookerInstance = new RiceCooker(200, windowHeight/2, 200, riceCooker)

    if (!bgSound.isPlaying()) {
    bgSound.loop();
  }
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
      for (let basket of baskets) {
        if(basket.remove) {
          basket.removeFromArray();
        }
      }
      room1();
for (let nori of noriArray) {
        nori.display();
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
          }
    else if(currentRoom === 2) {
      for (let basket of baskets) {
        if(basket.remove) {
          basket.removeFromArray();
        }
      }
      room2();
      roomSwitched = false;
      strawberryTea.hide();
      matcha.hide();
      mangoTea.hide();
      bSugarTea.hide();
      taroTea.hide();
      //baskets.push(new Basket(width / 4, height / 2, 50, eggBasket));
      baskets.push(new Basket(width / 4 - 250, height / 3 - 100, 200, eggBasket));
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
        if (millis() > orderTimer + orderTime) {
          room0();
          orderTimer = millis();
        }
for (let i = 0; i < tickets.length; i++) {
        image(demoCustomer, windowWidth - 800, windowHeight/2 + i * 300, 700, 700);
        image(orderTicket, windowWidth - 800, windowHeight/2 - 200 + i * 300, 200, 200);

        // Write down individual orders on each ticket
        fill("black");
        textSize(20);
        textAlign(LEFT, CENTER);
        for (let j = 0; j < tickets[i].length; j++) {
          text(tickets[i][j], windowWidth - 780, windowHeight/2 - 160 + i * 300 + j * 30);
        }

        // Add a delay between orders for each customer
        if (millis() > orderTimer + orderTime * (i + 1)) {
          orderTimer = millis();
        }
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
  for (let basket of baskets) {
    if(basket.image === eggBasket) {
      if (basket.contains(mouseX, mouseY)) {
        if (!pickedSquare) {
          pickedSquare = new Ingredient(basket.x, basket.y, 30, egg);
          pickedFromBasket = true;
        } else {
          pickedSquare.release();
          pickedSquare = new Ingredient(basket.x, basket.y, 30, egg);
          pickedFromBasket = true;
        }
        break;
      }
    }

    if(basket.image === riceBowlWhite) {
      if (basket.contains(mouseX, mouseY)) {
        if (!pickedSquare) {
          pickedSquare = new Ingredient(basket.x, basket.y, 30, basket.image);
          pickedFromBasket = true;
        } else {
          pickedSquare.release();
          pickedSquare = new Ingredient(basket.x, basket.y, 30, basket.image);
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
  }

class Ingredient {
  constructor(x, y, size, image) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.image = image;
    this.isPicked = true;
  }
  update(x, y) {
    if (this.isPicked) {
      this.x = x;
      this.y = y;
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
    }
  }

  takeWhiteRice() {
    if (this.hasWhiteRice) {
      this.hasWhiteRice = false;
      this.cookingTime = 0;
noriArray.push(new Nori(sushi.x, sushi.y, 700, nori))
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
  }

  display() {
    image(this.image, this.x, this.y, this.size, this.size);
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
      didOrder = true;
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
    x: windowWidth - 1000,
    y: windowHeight - 600,
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
