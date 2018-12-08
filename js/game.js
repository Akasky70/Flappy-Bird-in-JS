'use strict';

let speedIncrement = 0;

class Game{

	constructor(){
		this.score = 0;
		this.obstacles = [];
		this.obstacleCount = 0;
		this.topOrBottom = [1,-1];
	}

	// FUNCTION TO CREATE OBSTACLES
	createObstcles(){
	
		let positionY = 1;
		let heightOfObstacle = Math.floor(Math.random() * (240 - 80)) + 80;
		
		for(let i = 0; i < 2; i++){
			
			speedIncrement += 0.02; 
			
			this.obstacles[this.obstacleCount] = new Obstacle({
	
				width	: 60,
				posY	: positionY,
				posX	: panelWidth,
				parent	   : $bgPanel,
				class	: "obstacles",
				background : (speedIncrement > 8) ? "images/pipe-red.png" :"images/pipe-green.png",
				speed	: 8 + speedIncrement ,
				height  : (positionY ===1) ?
							heightOfObstacle : 
							(Math.floor(Math.random() * (380 - 360)) + 360) - heightOfObstacle,
			});
	
			this.obstacles[this.obstacleCount].initObstacle();
			this.obstacleCount++;
			positionY = -1;
		}

		return (25 - Math.ceil(speedIncrement));
	}	

	// MOVE OBSTACLE BY INVOKING FUNCTION IN OBSTACLE CLASS
	moveObstacles(){

		let temp = [];

		this.obstacles.forEach(function(obstacle){

			obstacle.moveObstacle();

			// if(typeof obstacle !== "undefined"){
				// IF IT CROSSES -70 IN x POSITION DESTRY IT
				if(obstacle.posX <= -70){

					obstacle.destroyObstacle();
					
				} else {
					temp.push(obstacle);
				}
			// }

		// BIND this TO ACCESS this OBJECT IN SUCH FUNCTION OR ASSIGN THIS TO NEW VARIABLE
		}.bind(this));

		this.obstacles = temp;
		return this.obstacles;
	}

	// CHECK IF BIRD HITS OBSTACLES
	checkObstacleCollision(bird, gamePanel){

		let returnvalue = 1;
		bird.birdBoundryCollision();
		this.obstacles.forEach(function(obstacle){
			
			let birdXright  = bird.left + bird.width-13,
				birdXleft 	= bird.left - (bird.width + bird.speed),

				birdY   	= bird.top + (bird.height - bird.speed),
				obstacleY	= panelHeight - obstacle.height -112;

			if(obstacle.posX <= birdXright && obstacle.posX >= birdXleft){

				if((birdY > obstacleY && obstacle.posY === 1) || (obstacle.height >= (bird.top+10) && obstacle.posY === -1)){
					
					bird.destroyBird();
					returnvalue = 0;
					end.play();
				
				}else{
					
					if( (obstacle.posX + obstacle.width < bird.left + (obstacle.speed * 2)) && obstacle.passed === 0){

						this.score += 0.5;
						obstacle.passed = 1;
						// SHOW SCORE IN PANEL
						gamePanel.showScore(this.score);

					}
				}
			}

		}.bind(this));
		
		return returnvalue;
	}

	// DESTROY ALL OBSTACLES
	resetObstacles(){

		this.obstacles.forEach(function(obstacle){

			obstacle.destroyObstacle();

		}.bind(this));

		speedIncrement = 0;
		this.obstacles = [];
		this.obstacleCount=0;
		return 1;
	}

	// RESET SCORE
	resetScore(){

		this.score = 0;
		gamePanel.showScore(this.score);
	}
}
