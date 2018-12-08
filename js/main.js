'use strict';

////////////////////////////- GLOBAL CONST AND VARIABLES -//////////////////////////////
const $container = document.getElementById("container");

let bird,
	$bgPanel,
	play = 0,
	gamePanel,
	restart = 0,
	interval = 0,
	createBgPanel,
	animationId = null,
	obstaclesInterval = 0,
	panelWidth = window.innerWidth,
	panelHeight = window.innerHeight,
	end = new GameSound("sound/end.mp3"),
	backgroundMusic = new GameSound("sound/bgmusic.ogg",0.3);


///////////////////////////////////- PANEL CREATION -/////////////////////////////////

const createPanel = () =>{

	//////////////////////////// - GAME PANEL CREATION - /////////////////////////
	createBgPanel = new GamePanel({

		id 			: "bgpanel",
		class		: "bg-panel",
		parent		: $container,
		width		: panelWidth,
		height		: panelHeight,
		background 	: "images/background-day.png",
	});


	$bgPanel = createBgPanel.initPanel();

///////////////////////////- GAME PANEL BG FRO ANIMATION -/////////////////////////////////
	gamePanel = new GamePanel({

		parent		: $bgPanel,
		width		: panelWidth,
		height		: panelHeight,
		id 			: "gamepanel",
		class		: "game-panel",
		background 	: "images/base.png"
	});

	gamePanel.initPanel();
	gamePanel.addGamePanelText();
///////////////////////////- CREATING BIRD OBJECT -///////////////////////////////////
	
	bird = new FlappyBird({

		width			: 45,
		height		: 35,
		top			: 200,
		left			: 500,
		id 			: "bird",
		parent		: $bgPanel,
		class			: "bird-design",
		background 	: "images/flappy.gif",
	});

	bird.initBird();
	
}

/////////////////////////////- INVOKING MAIN GAME PANEL AND LOOP -/////////////////////////////

let game = new Game();
createPanel();

/////////////////////////////////- MAIN ANIMATION LOOP -//////////////////////////////////////

function animateGame(){
 
	// INVOKING THE SAME FUNCTON FOR REPEATED ANIMATION
  	if(!(play=== 0 )){

  		animationId = requestAnimationFrame(animateGame);
  		
	}else{

		restart = gamePanel.gameOverText();
		backgroundMusic.stop();
	}

	bird.birdFlyBird();
	gamePanel.animateBg($bgPanel);

	// CREATING OBSTACLES IN CERTAIN TIME INTERVAL
	if(obstaclesInterval === 0){

		obstaclesInterval = game.createObstcles();
		if(obstaclesInterval <= 0) obstaclesInterval = 20;
	}

	game.moveObstacles();
	play = game.checkObstacleCollision(bird, gamePanel);
	play =  (bird.top  >= ( panelHeight - 150 )) ? 0 : 1;
  	obstaclesInterval--;
}


/////////////////////////- CHECKING KEYDOWN EVENT -///////////////////////////////

document.onkeydown = function(){

	var keyDownEvent 	= event || window.event,
   		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
	
	if(play === 1 && bird.life === 1){

		bird.flyBirdUpwards(keyPressedCode);
	}

	if(keyPressedCode == 32 && play == 0){

		backgroundMusic.play();

		if(restart === 1){

			bird.resetBird();
			game.resetObstacles();
			game.resetScore();
			gamePanel.removeGamePanelText();
			gamePanel.resetPanel();
			createBgPanel.resetPanel();
			createPanel();
			
			bird.top = 200;
			bird.dy  = -1;
			bird.timeCount = 6;
			bird.life = 1;
			bird.initBird();
			
			restart = 0;
		}

		play = 1;
		gamePanel.removeGamePanelText();
		animateGame();
	}
}

document.onclick = function(){

	if(play === 1 && bird.life === 1){

		bird.flyBirdUpwardsOnClick();
	}

	if(play == 0){

		backgroundMusic.play();

		if(restart === 1){
			
			bird.resetBird();
			game.resetObstacles();
			game.resetScore();
			gamePanel.removeGamePanelText();
			gamePanel.resetPanel();
			createBgPanel.resetPanel();
			createPanel();
			
			bird.top = 200;
			bird.dy  = -1;
			bird.timeCount = 6;
			bird.life = 1;
			bird.initBird();		
			
			restart = 0;
			
		}

		gamePanel.removeGamePanelText();
		play = 1;
		animateGame();
	}
}