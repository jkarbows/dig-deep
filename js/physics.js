//physics.js
var Physics = {
  constants: {
    buffer: 3 //distance between colliding objects
  },
  
  obstaclePositions: [],
  
  init: function() {
    objects = [...World.obstacles]; //clone array
    wallRadius = (World.constants.wallScale)/2; 
    
    for (obj of objects) {
      posX = obj.position.x;
      posZ = obj.position.z;
      
      bounds = {
        x: posX,
        z: posZ,
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
    
      /*TODO: you're on the right track
       * error being caused by the physics focusing on one collision, and not noticing the next block when the
       * palyer is wall sliding. Pass an array of every collision with doesCollide() and iterate over it from in here?
      */
      
      /* 
        instead of checking if the movement makes the situation better, maybe check that it just doesn't make it worse?
        calculate the normal of each face of the obstacle and find cross product of the direction and the normal vector
        set that to be the new *Movement? I'm exhausted. This was progress though.
        */
    
    
 
      if(collision.bool) { //if a collision was detected
      //affect movementVector
      
      playerPosX = Player.entity.position.getComponent(0);
      playerPosZ = Player.entity.position.getComponent(2);
      obstacle = Physics.obstaclePositions[collision.index];
      
      invertedRotation = new THREE.Quaternion();
      invertedRotation.copy(Player.entity.quaternion);
      invertedRotation.inverse();
      
      direction = mv.clone();
      direction.applyQuaternion(Player.entity.quaternion);
      
      normal = direction.clone();
      normal.negate();
      
      //the following is close, but misfires when the player is close to 45degrees rotated
      if( (Math.abs(playerPosX - obstacle.x) >= 9) ){
        //console.log("X");
        normal.z = 0; //collsion does not involve the z-axis
        
        if((playerPosX - obstacle.x) > 0) { //player is +x side of obstacle
          if(direction.x > 0){  //direction component is away from the obstacle
            //console.log("walking away");
            normal.x = 0;
          }
        }
        if((playerPosX - obstacle.x) < 0) { //player is -x side of obstacle
          if(direction.x < 0){  //direction component is away from the obstacle
            //console.log("walking away");
            normal.x = 0;
          }
        }
      }//x-axis
      
      if( (Math.abs(playerPosZ - obstacle.z) >= 9)) {
        //console.log("Z");
        normal.x = 0; //collision does not involve the x-axis
        
        if((playerPosZ - obstacle.z) > 0) { //player is +z side of obstacle
          if(direction.z > 0){  //direction component is away from the obstacle
            //console.log("walking away");
            normal.z = 0;
          }
        }
        if((playerPosZ - obstacle.z) < 0) { //player is -z side of obstacle
          if(direction.z < 0){  //direction component is away from the obstacle
            //console.log("walking away");
            normal.z = 0;
          }
        }
      }//z-axis 
      normal.applyQuaternion(invertedRotation); //apply inverse of rotation vector
      mv.add(normal);
      mv.normalize();
     }//collsion.bool
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