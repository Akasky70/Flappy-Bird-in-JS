'use strict';

class Obstacle{

	constructor(props){

		this.passed		= 0; // TO CHECK IF THE BIRD PASSES THE OBSTACLE< RETURN 1 IF PASSED
		this.dx			= -1;
		this.id			= props.id;
		this.class 		= props.class;
		this.$parent 	= props.parent;
		this.speed 		= props.speed || 10;
		this.posX 	 	= props.posX || 200;
		this.posY 	 	= props.posY || 200;
		this.width 		= props.width || 20;
		this.height 	= props.height || 60;
		this.background = props.background || 40;
		
		this.$obstacle = document.createElement("div");
	}

	// INITIALISE THE OBSTACLES
	initObstacle(){

		this.$obstacle.style.width 	= this.width + "px";
		this.$obstacle.style.height = this.height + "px";
		this.$obstacle.style.left 	= this.posX + "px";
		if(this.posY === 1){

			let top = panelHeight - 112 - this.height;
			this.$obstacle.style.top	= top + "px";	
		
		}else{

			this.$obstacle.style.transform = 'rotate(180deg)';
			this.$obstacle.style.top 	= "0px";
		}
		
		this.$obstacle.style.backgroundImage = "url("+ this.background +")";
		this.$obstacle.className = this.class;

		this.$parent.appendChild(this.$obstacle);
	}

	
	// UPDATE NEW X POSITION OF OBSTACLE TO MOVE THEM RIGHT
	updateObstaclePosition(){

		this.posX += this.dx * this.speed;

	}


	// MOVING OBSTACLE TO -1 x POSITION
	moveObstacle(){

		this.$obstacle.style.left 	= this.posX + "px";
		this.updateObstaclePosition();
	}

	// GET OBSTACLE

	// DESTROY OBSTACLES IF IT CROSSES THE PANEL
	destroyObstacle(){

		if(this.$obstacle.parentNode == this.$parent){
		
			this.$parent.removeChild(this.$obstacle);	
		}
	}
}