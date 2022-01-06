class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
  
      this.leadeboardTitle = createElement("h2");
  
      this.leader1 = createElement("h2");
      this.leader2 = createElement("h2");
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
      form = new Form();
      form.display();

      player1 = createSprite(width / 2 - 50, height - 100);
      player1.addImage("player1", player1_img);
      player1.scale = 0.1;

      player2 = createSprite(width / 2 - 50, height - 100);
      player2.addImage("player2", player2_img);
      player2.scale = 0.1;

      players = [player1,player2];

      energyDrink = new Group();
      coins = new Group();
      obstacles = new Group();
      var obstaclesPositions = [
        { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
        { x: width / 2, y: height - 2800, image: obstacle2Image },
        { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
        { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
        { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
        { x: width / 2, y: height - 5300, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
      ];
      
      this.addSprites(energyDrink, 4, energyDrinkImg, 0.02);
      this.addSprites(obstacles, obstaclesPositions.length, obstacle1Image, 0.4, obstaclesPositions)
      this.addSprites(coins , 18, coinImage, 0.1);
    }

    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, position = []) {
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
          if (position.length>0){
            x = position[i].x
            y = position[i].y
            spriteImage = position [i].image
           }
           else{
           x = random(width / 2 + 150, width / 2 - 150);
           y = random(-height * 4.5, height - 400);
    
           var sprite = createSprite(x, y);
           sprite.addImage("sprite", spriteImage);
    
           sprite.scale = scale;
           spriteGroup.add(sprite);
        }
       }
      }
    
      handleElements() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");

        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);

        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);

        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);

        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);

        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);
      }

      play() {
        this.handleElements();
        this.handleResetButton();
    
        Player.getPlayersInfo();
    
        if (allPlayers !== undefined) {
          image(track, 0, -height * 5, width, height * 6);
    
          this.showLeaderboard();
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the players in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
    
            players[index - 1].position.x = x;
            players[index - 1].position.y = y;
    
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
    
              // Changing camera position in y direction
              camera.position.y = players[index - 1].position.y;
            }
          }
          this.handlePlayerControls();

          drawSprites();
        }
      }

      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {}
          });
          window.location.reload();
        });
      }
      
      showLeaderboard() {
        var leader1, leader2;
        var players = Object.values(allPlayers);
        if (
          (players[0].rank === 0 && players[1].rank === 0) ||
          players[0].rank === 1
        ) {
          // &emsp;    This tag is used for displaying four spaces.
          leader1 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
    
          leader2 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
        }
    
        if (players[1].rank === 1) {
          leader1 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
    
          leader2 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
        }
    
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }
    
      handlePlayerControls() {
        /*if (keyIsDown(UP_ARROW)) {
          player.positionY += 10;
          player.update();
        }*/
    
        /*if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          player.positionX -= 5;
          player.update();
        }*/
    
        if (keyIsDown(RIGHT_ARROW) ) {
          player.positionX += 5;
          player.update();
        }
      }
}