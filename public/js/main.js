//game constants
	var socket = io();
	var connection = document.getElementById("connection").textContent;
	let snake = [
	   // {x:140,y:160},
	   {x:150,y:150}
	]
	
	let snake1 = [
		{x:150,y:150}
	]

	let inputDir = {x:0,y:0};
	let inputDir1 = {x:0,y:0};
	let direction = null;
	let direction1 = null;

	let food = {x:400,y:200};
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	var body = document.getElementById("body");
	let speed = 10;
	let lastPaintTime = 0;
	let my_score = document.getElementById("your");  
	let opponent_score = document.getElementById("opponent");  

	//game functions
	
	socket.emit("join",connection);
	
	
	socket.on("message",function(message){
		alert("user has joined");
	})

	function main(ctime){
		window.requestAnimationFrame(main);
		if((ctime-lastPaintTime)/1000 < 1/speed){
			return;
		}
		lastPaintTime = ctime; 
		//console.log(ctime);
		gameEngine();
	}

	function gameEngine(){
		//part 1: updating the snake array;
		if(isCollide(snake)){
			inputDir = {x:0, y:0};
			//alert("game over");
			socket.emit("winner",{id:connection});
			alert("game over");
			
			snake = [
			   {x:150,y:150}
			]
		}
		// if you have eaten the food regenerate the food
		if(snake[0].y === food.y && snake[0].x === food.x){

			//increase the score of mine
			let prev_score=Number(my_score.textContent);
			my_score.textContent = ++prev_score;

			snake.unshift({x:snake[0].x + inputDir.x,y:snake[0].y + inputDir.y});
			//pass length of snake
			socket.emit("snake_length",{snake:snake,id:connection,score:my_score.textContent});
			
			let a = 50;
			let b = 60;
			let temp = {x: Math.round(2+(100-2+1)*Math.random())*10,y: Math.round(2+(70-2+1)*Math.random())*10};
			food = {x:temp.x, y:temp.y};
			
		}

		//moving the snake;
		for(let i=snake.length-2;i>=0;i--){
			snake[i+1] = {...snake[i]};
		}

		snake[0].x += inputDir.x;
		snake[0].y += inputDir.y;
		
		//moving snake1(online snake)
		for(let j=snake1.length-2;j>=0;j--){
			snake1[j+1] = {...snake1[j]};
		}

		snake1[0].x += inputDir1.x;
		snake1[0].y += inputDir1.y;
		



		//drawFood();
		
		
		//online snake moving

	




		

		//part 2: render the snake and food
		drawSnakeandFood();
	}


    function isCollide(snake){
		// if snake collides itself
		for(var i=1;i<snake.length;i++){
			if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
				return true;
			}
			if(snake[0].x >1000 || snake[0].x<0 || snake[0].y>700 || snake[0].y<0){
				return true;
			}
		}
    	return false;
    }



	

	function drawSnakeandFood(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		ctx.strokeRect(food.x,food.y,10,10);
		ctx.stroke();
    	for(i=0;i<snake.length;i++){
    		ctx.beginPath();
    		if(i==0){
    			ctx.strokeStyle = "blue";
			    ctx.fillStyle = "blue";
    		}
    		else{
    			ctx.strokeStyle = "red";
			    ctx.fillStyle = "red";
			}
			// Draw the outline of a square

			ctx.strokeRect(snake[i].x,snake[i].y,10,10);
			ctx.stroke();

		}
		
		//online snake
		
		for(i=0;i<snake1.length;i++){
    		ctx.beginPath();
    		if(i==0){
    			ctx.strokeStyle = "brown";
			    ctx.fillStyle = "brown";
    		}
    		else{
    			ctx.strokeStyle = "red";
			    ctx.fillStyle = "red";
			}
			// Draw the outline of a square

			ctx.strokeRect(snake1[i].x,snake1[i].y,10,10);
			ctx.stroke();

		}
		
	}
   inputDir = {x:0, y:0}; 

	window.addEventListener('keydown',e =>{
		
		if(e.key==="ArrowUp" && direction!=="down"){
			socket.emit("up",{move:"ArrowUp",id:connection});
			inputDir.x = 0;
			inputDir.y = -10;
			direction="up";
			console.log(inputDir);
		    console.log(direction);
			
		}
		else if(e.key==="ArrowDown" && direction!=="up"){
		
			socket.emit("down",{move:"ArrowDown",id:connection});
			inputDir.x = 0;
			inputDir.y = 10;
			direction="down";
			console.log(inputDir);
		    console.log(direction);
		
		}
		else if(e.key==="ArrowLeft" && direction!=="right"){
			socket.emit("left",{move:"ArrowLeft",id:connection});
			inputDir.x = -10;
			inputDir.y = 0;
			direction="left";
			console.log(inputDir);
		    console.log(direction);
			
		}
		else if(e.key==="ArrowRight" && direction!=="left"){
			socket.emit("right",{move:"ArrowRight",id:connection});
			inputDir.x = 10;
			inputDir.y = 0;
			direction="right";
			console.log(inputDir);
		    console.log(direction);
		
		}
	})

	window.requestAnimationFrame(main);
	
	
	// work of socket
	
	socket.on("up_event",function(up){
		console.log(up);
	})
	
	
	socket.on("up_event",function(up){
		console.log("shfvwhjvb");
		inputDir1.x = 0;
		inputDir1.y = -10;
		direction1="up";
	})
	
	socket.on("down_event",function(down){
		inputDir1.x = 0;
		inputDir1.y = 10;
		direction1="down";
	})
	
	socket.on("left_event",function(left){
		inputDir1.x = -10;
		inputDir1.y = 0;
		direction1="left";
	})
	
	socket.on("right_event",function(right){
		inputDir1.x = 10;
		inputDir1.y = 0;
		direction1="right";
	})
	
	
	socket.on("update_online_snake",function(snake){
		console.log(snake);
		snake1=snake.snake;
		
		opponent_score.textContent=snake.score;
	})
	
	socket.on("win",function(){
		alert("YOU WIN THE GAME");
	})

	