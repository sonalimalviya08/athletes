var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2, energyDrink, coins, obstacles, obstacle1Image, obstacle2Image;
var players = [];
var canvas;
var backgroundImage, player1_img, player2_img, track;
var energyDrinkImg, coinImage;

function preload(){
  backgroundImage = loadImage("background.jpg");
  player1_img = loadImage("player1.jpg");
  player2_img = loadImage("player2.jpg");
  track = loadImage("background.jpg");
  energyDrinkImg = loadImage("energydrink.jpg");
  coinImage = loadImage("goldCoin.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);  
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
  
