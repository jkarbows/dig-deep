//physics.js
var Physics = {
  constants: {
    buffer: 6 //distance between colliding objects
  },
  
  obstaclePositions: [],
  
  init: function() {
    objects = [...World.obstacles]; //clone array
    wallRadius = (World.constants.wallScale)/2; 
    
    for (obj of objects) {
      posX = obj.position.x;
      posZ = obj.position.z;
      
      bounds = {
        front: posZ + wallRadius,
        back: posZ - wallRadius,
        left: posX - wallRadius,
        right: posX + wallRadius
      }
      
      Physics.obstaclePositions.push(bounds);
    }    
  },
  
  stopCollision: function(mv) {
    collision = Physics.doesCollide();
    
    if(collision.bool) {
      //affect movementVector
      //console.log("made it: " + Physics.obstaclePositions[collision.index].front);
      //mv.negate(); //testing
      
      playerPosX = Player.entity.position.getComponent(0);
      playerPosZ = Player.entity.position.getComponent(2);
      i = collision.index;
      
      //we already know that there is a collision with this block
      
      /*TODO: this currently works, as long as you are using the left-right arrows to get out of a x-axis lock
       * and the up-down arrows to get out of a z-axis lock
       * there's bound to be an elegant way to make either arrow work.
       * look at how the translateX and translateZ methods in the InputHandler are implimented. It may help
       * it also doesn't work it you do a 180 degree turn
       * you're on the right track
       * MAJOR TODO: Clean this entire file up. It stinks of desperation
      */
      
      
      if((playerPosX > Physics.obstaclePositions[i].left - Physics.constants.buffer) &&
          (playerPosX < Physics.obstaclePositions[i].right + Physics.constants.buffer)){
          
            console.log("Player x: " + playerPosX + ", z: " + playerPosZ);
            console.log("PosZ: " + (playerPosZ + mv.getComponent(2)));
            console.log("Wall zB: " + (Physics.obstaclePositions[i].back - Physics.constants.buffer) + ", zF: " + (Physics.obstaclePositions[i].front + Physics.constants.buffer));
          
          
            zMovement = mv.getComponent(2);
            mv.z = 0;
         
            if((playerPosZ + zMovement < Physics.obstaclePositions[i].back - Physics.constants.buffer) ||
                 (playerPosZ + zMovement > Physics.obstaclePositions[i].front + Physics.constants.buffer)){
                    mv.z = zMovement;
            }

          //maybe not else if?
      if((playerPosZ > Physics.obstaclePositions[i].back - Physics.constants.buffer) &&
                (playerPosZ < Physics.obstaclePositions[i].front + Physics.constants.buffer)){
                  
                  
                  console.log("Player x: " + playerPosX + ", z: " + playerPosZ);
                  console.log("PosX: " + (playerPosX + mv.getComponent(0)));
                  console.log("Wall xL: " + (Physics.obstaclePositions[i].left - Physics.constants.buffer) + ", xR: " + (Physics.obstaclePositions[i].right + Physics.constants.buffer));
                  
                  
                  
                  xMovement = mv.getComponent(0);
                  mv.x = 0;
                  
                 if((playerPosX + xMovement < Physics.obstaclePositions[i].left - Physics.constants.buffer) ||
                 (playerPosX + xMovement > Physics.obstaclePositions[i].right + Physics.constants.buffer)){
                    mv.x = xMovement;
            } 
          
          
          
      }
          
          //console.log("Wall x: " + (Physics.obstaclePositions[i].left - Physics.constants.buffer) + ", z: " + (Physics.obstaclePositions[i].back - Physics.constants.buffer));
      }
    }
  },
  
  doesCollide: function(){
    /*
    * Since the player is looking forward and has the hands in front of them
    * the left, right, and rear collision detection may have a smaller buffer
    * than the front collision detection
    */
       
    pos = {x: Player.entity.position.getComponent(0), z: Player.entity.position.getComponent(2)};
    len = Physics.obstaclePositions.length;
    
    
     for(i = 0; i < len; i += 1){ 
      if((pos.x > Physics.obstaclePositions[i].left - Physics.constants.buffer) && //tests the x-axis
          (pos.x < Physics.obstaclePositions[i].right + Physics.constants.buffer)) {
            //console.log("will hit X"); //testing
            
            if((pos.z > Physics.obstaclePositions[i].back - Physics.constants.buffer) && //then the z-axis
                (pos.z < Physics.obstaclePositions[i].front + Physics.constants.buffer)){
                  //console.log("will hit block");
                  return {bool: true, index: i};
                }
      }
     }
    return {bool: false};
  },
  
  moveHands: function() {
    
  }
};
