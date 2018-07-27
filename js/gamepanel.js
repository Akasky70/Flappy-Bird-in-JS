'use strict';

class GamePanel{

	constructor(props){
		this.lastScore = 0;
		this.scrollX 	= 0;
		this.dx			= -1;
		this.speed 		= 10;
		this.id			= props.id;
		this.class 		= props.class;
		this.$parent 	= props.parent;
		this.width 		= props.width || 20;
		this.height 	= props.height || 60;
		this.background = props.background || 40;
		this.$gamePanel = document.createElement("div");
	
	}

	// INITIALISE THE GAME PANEL
	initPanel(){

		this.$gamePanel.className = this.class;
		this.$gamePanel.setAttribute("id",this.id);
		this.$gamePanel.style.width = this.width + "px";
		this.$gamePanel.style.height = this.height + "px";
		this.$gamePanel.style.backgroundImage = "url("+ this.background +")";

		this.$parent.appendChild(this.$gamePanel);

		return this.$gamePanel;
	}

	// UPDTE BG POSITION FOR SCROLLING
	updateBgPosition(){

		this.scrollX += this.dx * this.speed;
	}

	// SCROLL BG IMAGE
	animateBg($bgPanel){
		// console.log(scrollX);
		this.$gamePanel.style.backgroundPosition = this.scrollX+"px 100%";
		this.updateBgPosition();

		if(speedIncrement >= 8 && speedIncrement <= 8.4) this.changeBackground($bgPanel);
	}

	// ADD START GAME TEXT
	addGamePanelText(){

		this.$gamePanel.innerHTML = "<p>PRESS SPACE TO</p><h1> START </h1>";
	}

	// REMOVE START GAME TEXT
	removeGamePanelText(){

		this.$gamePanel.innerHTML = "";
		// this.$gamePanel.style.transition = "50s";
	}

	// GAME OVER TEXT
	gameOverText(){

		this.$gamePanel.innerHTML = "<p>Your score is "+ Math.ceil(this.lastScore) +"</p><h1>GAME OVER</h1>";
		return 1;
	}

	// RESETTING PANELS
	resetPanel() {

		this.$parent.removeChild(this.$gamePanel);
	}
	
	// SHOW SCORES 
	showScore(score){

		this.lastScore = score;
		this.$gamePanel.innerHTML = "<h1 style='margin-top:20%;'>" +Math.ceil(this.lastScore) + "<h1>"

	}

	// CHANGES BG AT CERTAIN INTERVAL
	changeBackground($bgPanel) {
		$bgPanel.style.backgroundImage = "url('images/background-night.png')";
	}
}
