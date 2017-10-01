$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable
	//ADD isCOLL FUNCTION
	//Canvas stuff  //1:39s #8
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;
    var dust = new Image();  // dust image 
    var gravitymars;  // gravity on mars
	var planetpic = new Image();      //picture for background on each planet
    var instructions = new Image();
	var gravityneptune;                //gravity on neptune
	var select1 = new Audio("audio/plop.mp3");      //sound for selecting buttons in intro screen
    var intromusic = new Audio("audio/intromusic.mp3");       //intro music for panesART screen
    var spacemusic = new Audio("audio/space.mp3");            //spacemusic for game
	var fallsound = new Audio("audio/fallsoundeffect.mp3");      //falling sound effect on blocks
	var gamescreen;                                //gamescreen counter variable
    var spacebar;           //spacebar variables
    var prizew;             //dust width
    var meteorcollision;    //boolean for collision with meteor
    var prizeh;             //dust height
    var prizecounter_neptune, prizecounter_venus,prizecounter_mars,prizecounter_earth;       //counter for number of dusts collected
    var prizecounter_mercury,prizecounter_saturn,prizecounter_jupiter,prizecounter_uranus
	var linex =[];            //titlescreen design rectangle going across screen and back    
	var linespeed;             //speed controlling ^
    var pic2 = new Image();     // 
    var test = new RotatingObject("runleft.png","runright.png",320,0,47,64);
    var test1 = new Image();
    var selectscreen= new Image();
    var losescreen = new Image();
	var A,W,S,D;
    var playerDirection = true;
    var aside, bside, hypotenuse;
	var VelY;
    var starx=[];
    var stary=[];
    var starsx=[];
    var starw;
    var starh;
    var starpic = new Image();
	var bottom;
	var onground;
    var ballradius;
	var test_W;
    var pause;
	var climbingblocks=[];
    var introcounter;
    var intropics=[];
    var dustprize=[];
    var blowupcounter;
    var prize_checker=[];
    var p1x, p1y, p2x, p2y;
    var blowuppics=[];
    for(var i=1;i<9;i++){
        var newintropics = new Object('introimages/intro' + i + '.jpg',0,0);
        intropics.push(newintropics);
    }
    
    for(var i=1;i<6;i++){
        var newblowuppics = new Object('blowupimages/blowup' + i + '.png',0,0);
        blowuppics.push(newblowuppics);
    }
    
	for(var i=0;i< 100;i++){
		  climbingblocks[i] = new Object("blocks.png",i*Math.random()*100,h-Math.random()*100*i,40,40);
    }
	
 //culminating
	
	
	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{
		VelY=0;			//gravity
		ref_int=0;
		gamescreen=0;
        ballradius=20;
		linespeed=1;
		test_W=60;
        starw=100;
        starh=50;
        blockw=40;
        spacebar=false;
        blowupcounter=1;
        introcounter=1;
        prizew=30;
        prizeh=30;
        prizecounter_neptune=0;
        prizecounter_earth=0;
        prizecounter_mars=0;
        prizecounter_uranus=0;
        prizecounter_venus=0;
        prizecounter_jupiter=0;
        prizecounter_mercury=0;
        prizecounter_saturn=0;
        meteorcollision=false;
		A=false;
		D=false;
		S=false;
		W=false;
		onground= false;
        pause=false;
		gravityneptune = 1;	
		if(gamescreen==0){
			 intromusic.play();   
		}
        document.getElementById("freeze").addEventListener('click', function(){ 
			alert("You have used RETURN TO YOUR ROCKETSHIP");
		}, false);
		document.getElementById("bow").addEventListener('click', function(){ 
			alert("You have used Builder Kit ");
            blockw = 80;
            
		}, false);
		document.getElementById("energy").addEventListener('click', function(){ 
			alert("You have used Energy");
		}, false);
        document.getElementById("energy").addEventListener('click', function(){ 
			alert("You have used Energy");
		}, false);
	//////////
	///STATE VARIABLES
	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	init();	
	
	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function selectPlanet(){
        if(mx > 30 && mx < 130 && my < 250 && my > 100){        //mercury
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(30,100,100,150);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 270 && mx < 400 && my < 450 && my > 310){      //Uranus
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(270,310,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 520 && mx < 610 && my < 440 && my > 290){        //neptune
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(520,310,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 30 && mx < 130 && my < 440 && my > 290){        //saturn
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(30,310,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 520 && mx < 610 && my < 250 && my > 100){       //earth   
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(520,100,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 273.5 && mx < 370 && my < 250 && my > 100){     //venus
            ctx.globalAlpha=0.3;
			ctx.fillStyle='white';
            ctx.fillRect(273.5,100,96,145);
            ctx.globalAlpha=1;
            select1.play();
        }
            
        if(mx > 150 && mx < 240 && my < 330 && my > 190){     //mars
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(147.5,185,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
        if(mx > 400 && mx < 495.5 && my < 330 && my > 190){     //jupiter
            ctx.globalAlpha=0.3;
            ctx.fillStyle='white';
            ctx.fillRect(395,185,100,145);
            ctx.globalAlpha=1;
            select1.play();
        }
    }
    
    function shooters(x,y,sx){
		starx.push(x);
		stary.push(y);
		starsx.push(sx);
		for(var i=0;i < 2; i++){
            starpic.src='meteor.png';
			ctx.drawImage(starpic,starx[i],stary[i],starw,starh);
			starx[i]+= starsx[i] *linespeed;
            if(starx[i] > w || starx[i] + 400 < 0){			
                linespeed= linespeed *-1;
            }
        }
	}
    
    function prize(x,y){
        var newPrize = {
            x:x,
            y:y,
            visible:true
        }
        dustprize.push(newPrize);
        
        for(var i=0;i<5;i++){
            if(gamescreen ==4){
                dust.src="NEPTUNE_contains/neptunedust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }else if(gamescreen ==5){
                dust.src="MARS_contains/marsdust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }else if(gamescreen ==6){
                dust.src="EARTH_contains/earthdust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }else if(gamescreen ==7){
                dust.src="SATURN_contains/saturndust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);  
            }else if(gamescreen ==8){
                dust.src="JUPITER_contains/jupiterdust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }else if(gamescreen ==9){
                dust.src="MERCURY_contains/mercurydust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }else if(gamescreen ==10){
                dust.src="EARTH_contains/earthdust.png";
                ctx.drawImage(dust,dustprize[i].x,dustprize[i].y,prizew,prizeh);
            }
        }
    }
    
    function dist(p1x, p1y, p2x, p2y)
	{
  		var xs = 0;
  		var ys = 0;
 
 	 	xs = p2x - p1x;
 	 	xs = xs * xs;
 
 	 	ys = p2y - p1y;
 	 	ys = ys * ys;
 
 	 	return Math.sqrt( xs + ys );
	}
	
	function render(){
		ctx.drawImage(test.getImage(playerDirection), test.X, test.Y, test.W, test.H);
		for(var i =0;i<100;i++){
			//console.log('i: ' + i + ' x: ' + climbingblocks[i].X);
			ctx.drawImage(climbingblocks[i].Sprite, climbingblocks[i].X, climbingblocks[i].Y,climbingblocks[i].W,climbingblocks[i].H);
		}
        ctx.fillStyle='white';
        ctx.font='10pt Courier New';
        if(gamescreen ==4)ctx.fillText("Dust: " + prizecounter_neptune,550,20);
        if(gamescreen ==5)ctx.fillText("Dust: " + prizecounter_mars,550,20);
        if(gamescreen ==6)ctx.fillText("Dust: " + prizecounter_earth,550,20);
        if(gamescreen ==7)ctx.fillText("Dust: " + prizecounter_saturn,550,20);
        if(gamescreen ==8)ctx.fillText("Dust: " + prizecounter_jupiter,550,20);
        if(gamescreen ==9)ctx.fillText("Dust: " + prizecounter_mercury,550,20);
        if(gamescreen ==10)ctx.fillText("Dust: " + prizecounter_venus,550,20);
            
	}
	
	function player(){
	test.Y += VelY;		//constant gravity
	onground = false;	
    
		if(test.X <= 0 || test.X + test.H >= w){
			test.X = 300;
		}
		
		for(var i=0; i<100; i++){
			if(test.isColl(climbingblocks[i])){		//if players's feet is colliding with bottom of canvas, his feet touch the ground and
				onground = true;                    //is on ground
                test.Y = climbingblocks[i].Y - test.H;
				
			}
            if(test.Y < 0 || W == true){            //blocks move up if player wants to go up out of canvas from top
                climbingblocks[i].Y += 5;
                dustprize[i].y +=5;
                stary[i] +=5;
            }
            
            if(test.Y > h || S==true){              //blocks move down if player wants to go out of canvas from bottom
                climbingblocks[i].Y -= 5;
                dustprize[i].y -=5;
                stary[i] -=5;
            }
            if(spacebar ==true){                      //return key to player incase of player lost down under vision level
                climbingblocks[i].Y -= 50;
                dustprize[i].y -=50;
                stary[i] -=50;
                
            }
		}
        
		if(onground){                               //if player is on ground , no velocity cannot accelerate
			VelY = 0;
		}
		
		if(!onground && gamescreen == 4 ||
           !onground && gamescreen ==5||
           !onground && gamescreen == 6 ||
           !onground && gamescreen == 7||
           !onground && gamescreen ==8||
           !onground && gamescreen == 9 ||
           !onground && gamescreen == 10) { //if player not on ground, Accelerate player down to ground
			VelY += gravityneptune;
		}
		
		for(var i=0;i<100;i++){                       //for every block move left (side scrolling gamescreen by moving blocks)
			if(A){
				climbingblocks[i].X -=5;
                dustprize[i].x -=5;
                starx[i] -=5;
			}
			
			if(D){                                  //for every block move right (side scrolling gamescreen by moving blocks)
				climbingblocks[i].X +=5;
                dustprize[i].x +=5;
                starx[i] +=5;
			}
            if(W && onground){
                VelY = -10;						// (jump) go up if W is pressed and if character is on grounds
			    onground= false;			//onground is false so character cannot double jump or continue to go up
		  }
        }
		
        if(S && gamescreen == 4){                             //pushes down to ground hella fast if wanting to go down by pressing S
            gravityneptune=10;   
        }else{
            gravityneptune=1;             //if not , then gravity on neptune remains constant
        }
        if(S && gamescreen == 5){                             //pushes down to ground hella fast if wanting to go down by pressing S
            gravityneptune=2;   
        }else{
            gravityneptune=1;             //if not , then gravity on neptune remains constant
        }
        for(var i=0;i < 1 ;i++){     //if player collides with meteor/star, blow up animation function is called upon
            if(starx[i] + starw > test.X && starx[i]  < test.X + test.W && test.Y < stary[i] + starh && test.Y + test.H > stary[i]){
                blowupanimation();
                prizecounter_neptune=0;
                prizecounter_earth=0;
                prizecounter_mars=0;
                prizecounter_uranus=0;
                prizecounter_venus=0;
                prizecounter_jupiter=0;
                prizecounter_mercury=0;
                prizecounter_saturn=0;
            }
        }
        
        for(var i=0; i < 5; i++){ //collision with dust on neptune
            if (test.X <= (dustprize[i].x + prizew)&& dustprize[i].x <= (test.X + test.W ) && test.Y <= (dustprize[i].y + prizeh) && dustprize[i].y <=(test.Y + test.H)){
                dustprize.splice(i,1);
                prizecounter_neptune++;                             //splice dust collected, and add score to respective planet 
                prizecounter_mars++;
                prizecounter_earth++;
                prizecounter_venus++;
                prizecounter_mercury++;
                prizecounter_uranus++;
                prizecounter_jupiter++;
                prizecounter_saturn++; 
            }
        }
        
        if(prizecounter_uranus == 5 ||prizecounter_mars == 5 ||prizecounter_earth == 5 ||prizecounter_venus == 5 ||prizecounter_mercury == 5                       ||prizecounter_neptune == 5 ||prizecounter_jupiter == 5 ||prizecounter_saturn == 5){//To swap gamescreen to planet selection if 5 dust is     collected from any planet
        }
          
        if(test.Y > 1050){
            gamescreen=20;         //losing from falling out into the void
        }
         
	}//end of player function
	
	function Object(img,x,y, widthz, heightz){   //function declaring images,x,y,w,h positions and values respectively
        this.init = function(){         //this.init is a function in order to be called on eventually
            this.Sprite = new Image;
            this.Sprite.src=img;
            this.X = x;
            this.Y  = y;
            this.W = widthz
            this.H = heightz
            this.VelY = 0;
        }
        
        this.init();
        
		this.isColl = function (obj){
			if(obj.X > this.X + this.W) return false; 	//back of obj further forward then front of this object
			if(obj.X + obj.W < this.X) return false;	//front of this obj is farther backward the back of this object
			if(obj.Y > this.Y + this.H) return false;
			if(obj.Y + obj.H < this.Y) return false;
			return true;
		}
	}
    
	function RotatingObject(img,img2,x,y, widthz, heightz){   //to translate object or rotate the position  
		Object.apply(this, [img,x,y, widthz, heightz]);       //javascript built in function "apply"
        this.init();                                            //init function is called upon from previous function
        
        this.SpriteF = new Image();                         //img2 exists in paremeters as of now
        this.SpriteF.src=img2;
        
        this.getImage = function(flipped){                  //getImage locates if flip should be true or false
            if (flipped){
                return this.SpriteF;                        //if true then choose img1
            } else {
                return this.Sprite;                         //if false then choose img2
            }
        }
	}
    
    var bCount=0;                                       //animation for blow up effect when meteor collides
    function blowupanimation(){
        if(blowupcounter <= 7){
           ctx.drawImage(blowuppics[blowupcounter].Sprite, blowuppics[blowupcounter].X + test.X, blowuppics[blowupcounter].Y + test.Y,80,80);
            if(bCount <= 0) {
                blowupcounter++;
				bCount = 2;
            }else bCount--;
        }else{    
            ctx.drawImage(blowuppics[4].Sprite, blowuppics[4].X, blowuppics[4].Y,80,80);
        }
        setTimeout(intro,100000000/120);      
    }
    
    var sCount = 0;   //animation for intro to game
    function intro(){
        if(introcounter <= 7){
           ctx.drawImage(intropics[introcounter].Sprite, intropics[introcounter].X, intropics[introcounter].Y,w,h);
			if(sCount <= 0) {
				introcounter++;
				sCount = 0.1;
			}else sCount--;
        }else{    
            ctx.drawImage(intropics[7].Sprite, intropics[7].X, intropics[7].Y,w,h);
        }
        
       setTimeout(intro,100000000/120);
    }
	
    
	function Main(){                       //Main function for game that expresses render, player and mobs function
		render();
		player();
	}
    
    
	function paint(){
		if(gamescreen ==0){                  //gamescreen for intro animation
			ctx.fillStyle='green';
			ctx.fillRect(0,0,w,h);
            intro();
			ctx.font='10pt Courier New';
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
			ctx.fillText("click anywhere to continue...", 370,470);
			ctx.fillStyle = "rgba(255, 255, 255, 0)";
		}
		
		if(gamescreen == 1){ //////////////////////////////////////////////////////////////////////////////////////////////
			pic2.src="titlepage.jpg";				//game screen for title screen, button to play
			ctx.drawImage(pic2,0,0,w,h);
			if (mx > 450 && my > 400){
				ctx.globalAlpha=0.5;
				ctx.fillStyle='black';
				ctx.fillRect(450,430,200,50);
				ctx.globalAlpha=1;
			}
			for(var i = 0; i < 1; i++){								//rectangle across title screen
				linex.push(0);
				ctx.fillStyle = "rgba(255, 255, 255, 0.1)";		//opacity
				ctx.fillRect(linex[i],0,600,480);
				linex[i] += 60 * linespeed;						//move right
				if(linex[i] > w || linex[i] + 400 < 0){			//if line is off canvas
					linespeed= linespeed *-1;						//reverse direction
				}
			}
		}/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(gamescreen == 2){ 									//Instructions
			ctx.fillStyle='grey';
			ctx.fillRect(0,0,w,h);
            instructions.src="instructions1.jpg";
            ctx.drawImage(instructions,0,0,w,h);
			ctx.font='30pt Courier New';
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
			ctx.fillText("OFF...", 499,465);
			if (mx > 450 && my > 400){
				ctx.globalAlpha=0.5;
				ctx.fillStyle='black';
				ctx.fillRect(450,430,200,50);
				ctx.globalAlpha=1;
			} 
			
		}///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(gamescreen == 3){ //choosing planet MOUSE OVER OPACITY
            ctx.fillStyle='white';
			ctx.fillRect(0,0,w,h);
            selectscreen.src="selectpage.jpg";  
            ctx.drawImage(selectscreen,0,0,w,h);
            ctx.font='10pt Courier New';
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
			ctx.fillStyle = "red";
            selectPlanet(); //Selectplanet fuction controls mouse over for all planets on image "selectpage"
            ctx.font='15pt Courier New';
		}
 /////////////////////////////////////////////////////////////////////////////////////////       
        if(gamescreen==4){      //neptune
            if(pause){                      //pause button
                return;
            }
			ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);   
            planetpic.src="NEPTUNE_contains/neptune.jpg"                //neptune image
			ctx.drawImage(planetpic,0,0,800,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Neptune...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 11.52 m/s^2",5,30);       //gravity on neptune "realism"
            shooters(0,Math.floor((Math.random()*480)+0),5); 
            shooters(0,Math.floor((Math.random()*480)+0),5);  // Star/meteor that goes across from left to right
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust on neptune to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust on neptune to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust on neptune to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust on neptune to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust on neptune to collect
			Main();      
        }
	////////////////////////////////////////////////////////////////////////////////////
        if(gamescreen==5){      //mars
            if(pause){                      //pause button
                return;
            }
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="MARS_contains/mars.jpg"                // image for background
			ctx.drawImage(planetpic,0,0,750,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Mars...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 3.711 m/s^2",5,30);       //gravity  "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main();
        }
        if(gamescreen==6){ //////////////////////////////////////////////////////////////////////////////////////////////////////
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="EARTH_contains/earthpic.jpg";             //earth image
			ctx.drawImage(planetpic,0,0,800,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Earth...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 9.8 m/s^2",5,30);       //gravity "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main(); 
        }
        
        if(gamescreen==7){ //////////////////////////////////////////////////////////////////////////////////////////////////////
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="SATURN_contains/saturnpic.jpg";             //saturn image
			ctx.drawImage(planetpic,0,0,800,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Saturn...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 10.44 m/s^2",5,30);       //gravity  "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main(); 

        }
        
        if(gamescreen==8){ //////////////////////////////////////////////////////////////////////////////////////////////////////
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="JUPITER_contains/jupiterpic.jpg";             //jupiter image
			ctx.drawImage(planetpic,0,0,800,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Jupiter...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 24.79 m/s^2",5,30);       //gravity  "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main(); 
        }
        
        if(gamescreen==9){ //////////////////////////////////////////////////////////////////////////////////////////////////////
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="MERCURY_contains/mercurypic.jpg";             //mercury image
			ctx.drawImage(planetpic,0,0,w,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Mercury...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 24.79 m/s^2",5,30);       //gravity  "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main(); 
        }
        
        if(gamescreen==10){ //////////////////////////////////////////////////////////////////////////////////////////////////////
            ctx.fillStyle='black';           
			ctx.fillRect(0,0,w,h);  
            planetpic.src="VENUS_contains/venuspic.jpg";             //venus image
			ctx.drawImage(planetpic,0,0,w,h);         //drawing image fullscreen (fixing resolution)
            ctx.fillStyle='white';  
            ctx.font='20pt Courier New';
            ctx.fillText("Venus...",5,15);    
            ctx.font='10pt Courier New';    
            ctx.fillText("Gravity: 8.87 m/s^2",5,30);       //gravity  "realism"
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            prize(Math.floor((Math.random()*600)+0),Math.floor((Math.random()*400)+0));//random dust to collect
            Main(); 
        }
    ///////////////////////////////////////////////////////////////////////////////////////////
        if(gamescreen==20){ //losing screen
            losescreen.src="losepage.png";  
            ctx.drawImage(losescreen,0,0,w,h);
            
        }
        
        
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE

	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	
	/////////////////
	// Mouse Click
	///////////////
	canvas.addEventListener('click', function (evt){
    if(gamescreen == 0 && mx > 0 && my >0){
		gamescreen=1;
		select1.play();
        intropics=[];
        spacemusic.play();	
	}else if (gamescreen == 1 && mx > 450 && my > 400){
		ctx.globalAlpha=0.5;
		ctx.fillRect(450,430,200,50);
		ctx.globalAlpha=1;
		gamescreen=2;
		select1.play();
	}else if(gamescreen == 2 && mx > 450 && my > 400){
		select1.play();
		gamescreen=3;
    }else if(gamescreen == 3){
        if(mx > 30 && mx < 130 && my < 250 && my > 100){        //mercury
            intromusic.play();
            gamescreen=9;
        }
            
        if(mx > 270 && mx < 400 && my < 450 && my > 310){      //Uranus
            intromusic.play();
        }
            
        if(mx > 520 && mx < 610 && my < 440 && my > 290){        //neptune
            gamescreen=4;
            intromusic.play();
        }
            
        if(mx > 30 && mx < 130 && my < 440 && my > 290){        //saturn
            gamescreen=7;
            intromusic.play();
        }
            
        if(mx > 520 && mx < 610 && my < 250 && my > 100){       //earth   
            gamescreen=6;
            intromusic.play();
        }
            
        if(mx > 273.5 && mx < 370 && my < 250 && my > 100){     //venus
            intromusic.play();
            gamescreen=10;
        }
            
        if(mx > 150 && mx < 240 && my < 330 && my > 190){     //mars
            gamescreen=5;
            intromusic.play();
        }
        if(mx > 400 && mx < 495.5 && my < 330 && my > 190){     //jupiter
            intromusic.play();
            gamescreen=8;
        }  
    } /*else if(gamescreen==20 && mx > 50 && mx < 590 && my < 400 && my > 200){
        gamescreen=3;
     }*/
        
        
   
        
	}, false);

	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt) 
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
      	}
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////
	window.addEventListener('keyup', function(evt){
		var key = evt.keyCode;
		if(key ==65){   //right
			D=false;
		}
		if(key == 68){	//left
			A=false;
		}
		if(key == 87){			//up
			W=false;
		}
		
		if(key == 83){			//down
			S=false;
		}
        if(key == 32){
            spacebar = false;   //spacebar
        }
        if(key == 80){
			pause= !pause;
		}
        
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	}, false);
	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
		if(key ==65){			//right
			D=true;
            playerDirection = false;
		}
		if(key == 68){			//left
			A=true;
            playerDirection = true;
		}
		if(key == 87){			//up
			W=true;
		}
		
		if(key == 83){			//down
			S=true;
		}
        
        if(key == 32){
            spacebar = true;    //spacebar
        }
        if(key == 49){
            gamescreen=3;
        }
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	}, false);




})
