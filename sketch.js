// Histtoria del proyecto...
/*
Nombre. Odisea en el espacio
Objetivo. EL objetivo del juego es que mediante la nave espacial puedas disparar a los meteoritos y destruirlos. 
Para proteger a la Tierra.
Historia. Eres un guardián alienígena que años atrás visitó a la Tierra, entonces te encariñaste con ella y prometiste
protegerla de las maldades y peligros del espacio. Nadie sabe que tú eres ese héroe. Pero últimamente han llegado
muchos meteoritos con rumbo fijo al planeta. Deberás destruirlos con ayuda de tu nave espacial.
Jugadores Jugables. La nave espacial es jugable porque el jugador podrá controlarla y moverla.
Jugadores No Jugables. Los meteoritos no serán jugables porque ellos tendrán una dirección aleatoria.
¿Cómo se ve el juego? El juego está en una pantalla azul marino que simula el espacio. Además, la nave espacial está del
lado izquierdo, puede subir y bajar, con el fin de disparar a los meteoritos que vienen del lado derecho.
¿Cómo planeas hacer para que sea atractivo? El juego será atractivo porque los jugadores pueden ver sus puntos y solo tienen 3 vidas. 
También, más adelante planeo incluirle sonido y un pequeño cortometraje que explique el por qué el juego es así. 


*/

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
 blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#131D5D");
  
  heading.html("Vida: "+life)
  heading.style('color:white'); 
  heading.position(150,20)

  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    

}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg)
   blast.scale=0.3
 blast.life=20
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
