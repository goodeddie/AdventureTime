/*

Adventure Time
with Dean and Eddie

created by goodeddie
April 30, 2012

Special thanks to Ubiquitous Entertainment Inc. / ARC for making the enchant.js engine

*/

enchant();

window.onload = function() {
	var game = new Game(320, 320); // Create the game with a width and height
	game.fps = 15; // Set the FPS
	game.preload("player.gif"); // Preload any images or audio
	
	// Set up the game assets and rules
	game.onload = function() {
		var player = new Sprite(32, 32); // Create player sprite
		player.x = 0;
		player.y = 0;
		
		//player.image = game.assets["player.gif"]; // Default method of setting sprite sheet
		var image = new Surface(96, 128); // Use new Surface to manipulate the sprite sheet (ex. cut sprite sheet into a smaller sprite sheet)
		image.draw(game.assets['player.gif'], 0, 0, 96, 128, 0, 0, 96, 128); // reduce(image, originx, originy, width, height, destinationx, destinationy, width, height)
		player.image = image;
		
		
		//player.frame = 0; // Set the sprite frame
		player.isMoving = false;
		player.direction = 0; // 0 Down, 1 left, 2 right, 3 up
		player.walking = 1; // Used for identifying sprite animation
		player.addEventListener("enterframe", function(){ // Set up rules on the start of each frame for the sprite
			this.frame = this.direction * 3 + this.walking;
			if (this.isMoving) {
				this.moveBy(this.vx, this.vy);
				
				if (!(game.frame % 3)) {
						this.walking++;
						this.walking %= 3;
				}
				if ((this.vx && (this.x) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
						this.isMoving = false;
						this.walking = 1;
				}
			} else {
				this.vx = this.vy = 0; // Set the x and y velocity to 0
				
				if (game.input.down) {
						this.direction = 0;
						this.vy = 4;
				} else if (game.input.left) {
						this.direction = 1;
						this.vx = -4;
				} else if (game.input.right) {
						this.direction = 2;
						this.vx = 4;
				} else if (game.input.up) {
						this.direction = 3;
						this.vy = -4;
				}
				
				if (this.vx || this.vy) { // If vx or vy is not 0
					this.isMoving = true;
					arguments.callee.call(this);
				}
			}
		});
		player.addEventListener("touchstart", function(){ // Set up rules for mouse click for the sprite
			game.rootScene.removeChild(player);
		});
		player.addEventListener("touchend", function(){ // Set up rules for mouse release for the sprite
			//game.rootScene.removeChild(player);
		});
		
		game.rootScene.addChild(player); // Add the sprite to the root scene
	};
	
	game.start(); // Start the game
};
