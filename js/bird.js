'use strict';

class FlappyBird{

	constructor( props ){
		this.deg 		= 0;
		this.life		= 1;
		this.timeCount = 6;
		this.speed 		= 20;
		this.dy			= -1;
		this.id			= props.id;
		this.class 		= props.class;
		this.$parent 	= props.parent;
		this.top 	 	= props.top || 200;
		this.left 	 	= props.left || 200;
		this.width 		= props.width || 45;
		this.height 	= props.height || 45;
		this.background = props.background || 40;
		this.$bird = document.createElement("div");

	}

	// INITIALISE BIRD
	initBird(){

		this.$bird.className = this.class;
		this.$bird.setAttribute("id",this.id);
		this.$bird.style.top 	= this.top + "px";
		this.$bird.style.left 	= this.left + "px";
		this.$bird.style.width 	= this.width + "px";
		this.$bird.style.height = this.height + "px";
		this.$bird.style.backgroundImage = "url("+ this.background +")";

		this.$parent.appendChild(this.$bird);

		return this.$bird;
	}

	// BIRD UPDATE Y POSITION
	updateBirdPosition(){

		if(this.timeCount > 0){
		 	
		 	this.dy = -1;
		 	this.speed = 4;
		 	this.timeCount--;
		 	(this.deg <= -35) ? this.deg = -35 : this.deg -= 10;

		}
		else if( this.dy === 0){

			this.dy = 0;
			
		}else if(this.dy === 2){

			if(this.top >= ( this.$parent.clientHeight - 150 )){
				this.dy = 0;
			}

		}
		else{

			this.speed += 0.2;
			this.dy = 1;
			(this.deg >= 90) ? this.deg = 90  : this.deg -= -7;

		}
		

		this.top += this.dy * this.speed;

	}

	// BIRD MOVE POSITION
	birdFlyBird(){

		this.updateBirdPosition();
		this.$bird.style.top = this.top + "px";
		this.setBirdImage();
	}

	// BIRD TOP BOTTOM COLLISION
	birdBoundryCollision(){

		if(this.top >= ( this.$parent.clientHeight - 150 )){
 
			this.dy = 0;
			this.destroyBird();  
			end.play();
		}

		if(this.top <= 0){

			this.destroyBird();
			end.play();
		}
	}

	// FLYING BIRD UPWARDS WITH KEY
	flyBirdUpwards(keyCode){

		let FLY 	= 32;

	    switch (keyCode) {

	    	case FLY:

				this.timeCount = 10;
				// this.deg       = -35;
	    		break;
	    	
	    	default:
	      
	        	break;
		}
	}

	// CHANGE BIRD ACCORDING TO THE DIRECTION
	setBirdImage(){

		if(this.dy === -1){
			
			this.$bird.style.webkitTransform = 'rotate('+ this.deg +'deg)'; 
			this.$bird.style.backgroundImage = "url(images/flappy.gif)";
			
		}else if(this.dy === 1){

			this.$bird.style.webkitTransform = 'rotate('+ this.deg +'deg)'; 
			this.$bird.style.backgroundImage = "url(images/redbird-midflap.png)";
		}
	}

	// DESTROY BIRD IF IT STRIKE TO THE POLE
	destroyBird(){

		this.$bird.style.webkitTransform = 'rotate(90deg)'; 
		this.$bird.style.backgroundImage = "url(images/redbird-downflap.png)";	
		
		this.dy = 2;
		this.life = 0;
			
	} 

	// RESET BIRD
	resetBird(){

		this.$parent.removeChild(this.$bird);
	}

	// FOR CLICK EVENT
	flyBirdUpwardsOnClick(){

		this.timeCount = 10;
				
	}
}
