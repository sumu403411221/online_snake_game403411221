var express     =require("express");
var http        =require("http");
var app         =express();
var socketio = require("socket.io");
var server = http.createServer(app);
var io = socketio(server);
var bodyParser  =require("body-parser");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

require("locus");

app.get("/",function(req,res){
	res.render("index");
})

app.get("/snake",function(req,res){
	
	
	res.render("snake",{name:req.query.name});
})





io.on("connection",function(socket){
	console.log("new connected");
	socket.on("join",async function(user){
		try{
			socket.join(user);
			if(user.length==36){
				io.to(user+"hoast").emit("message","user has joined");
			}
			else{
				var t_id=user.substring(0,36);
				io.to(t_id).emit("message","user has joined");
			}
		//	io.to(user+"hoast").emit("message","user has joined")
			
		}catch(err){
			return err;
		}
	})
	
	socket.on("up",async function(up){
		try{
			if(up.id.length==36){
				io.to(up.id+"hoast").emit("up_event","up");
			}
			else{
				var t_id=up.id.substring(0,36);
				io.to(t_id).emit("up_event","up");
			}
		}catch(err){
			return err;
		}
		
	})
	socket.on("down",async function(down){
		try{
			if(down.id.length==36){
				io.to(down.id+"hoast").emit("down_event","down");
			}
			else{
				var t_id=down.id.substring(0,36);
				io.to(t_id).emit("down_event","down");
			}
			//socket.broadcast.emit("down_event","down");
		}catch(err){
			return err;
		}
		
	})
	socket.on("left",async function(left){
		try{
			if(left.id.length==36){
				io.to(left.id+"hoast").emit("left_event","left");
			}
			else{
				var t_id=left.id.substring(0,36);
				io.to(t_id).emit("left_event","left");
			}
		}catch(err){
			return err;
		}
		
	})
	socket.on("right",async function(right){
		try{
			if(right.id.length==36){
				io.to(right.id+"hoast").emit("right_event","right");
			}
			else{
				var t_id=right.id.substring(0,36);
				io.to(t_id).emit("right_event","right");
			}
		}catch(err){
			return err;
		}
		
	})
	
	
	socket.on("snake_length",async function(snake){
		try{
			if(snake.id.length==36){
				io.to(snake.id+"hoast").emit("update_online_snake",snake);
			}
			else{
				var t_id=snake.id.substring(0,36);
				io.to(t_id).emit("update_online_snake",snake);
			}
		}catch(err){
			return err;
		}
	})
	
	socket.on("winner",async function(winner){
		try{
			if(winner.id.length==36){
			    io.to(winner.id+"hoast").emit("win");
			}
			else{
				var t_id=winner.id.substring(0,36);
				io.to(t_id).emit("win");
			}
		}catch(err){
			return err;
		}
	})
})





server.listen(process.env.PORT,process.env.IP,function(){
	console.log("server started");
})
