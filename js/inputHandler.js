//inputHandler.js
//TODO: Major todo: all movement must go through the physics filter before being applied. Mark the "apply to player" function as such
var InputHandler = {
  constants: {
    movementSpeed: 1.0,
    rollSpeed: 0.022
  },
  
  movementVector: new THREE.Vector3(0, 0, 0),
  rotationVector: new THREE.Vector3(0, 0, 0),

  moveState: {
    left: 0, right: 0,
    forward: 0, backward: 0,
    turnUp: 0, turnDown: 0,
    turnLeft: 0, turnRight: 0
  },
  
  
  update: function() {    
    InputHandler.updateMovementVector();
    InputHandler.updateRotationVector();
    
    //translation
    //TODO: handle through physics
      InputHandler.movementVecter = Physics.stopCollision(InputHandler.movementVector);
      Player.entity.translateX(InputHandler.movementVector.x);
      Player.entity.translateZ(InputHandler.movementVector.z);
      
    //rotation
    Player.entity.quaternion.multiply(
      new THREE.Quaternion(
        InputHandler.rotationVector.x, 
        InputHandler.rotationVector.y, 
        InputHandler.rotationVector.z, 
        1)
        .normalize());
  },
  
  updateMovementVector: function() {
    InputHandler.movementVector.x = InputHandler.constants.movementSpeed*(-InputHandler.moveState.left + 
      InputHandler.moveState.right);
      
    InputHandler.movementVector.z = InputHandler.constants.movementSpeed*(-InputHandler.moveState.forward + 
      InputHandler.moveState.backward);
  },
  
  updateRotationVector: function() {
    InputHandler.rotationVector.y = InputHandler.constants.rollSpeed*(-InputHandler.moveState.turnRight + InputHandler.moveState.turnLeft );
    //TODO: handle the lookup + lookdown
  },
  
  _keydown: function(event) {
    switch(event.keyCode) {
      case 18: /* altkey */ return; break;

			case 87: /*W*/ InputHandler.moveState.forward = 1; break;
			case 83: /*S*/ InputHandler.moveState.backward = 1; break;

			case 65: /*A*/ InputHandler.moveState.left = 1; break;
			case 68: /*D*/ InputHandler.moveState.right = 1; break;

			case 38: /*up*/ InputHandler.moveState.turnUp = 1; break;
			case 40: /*down*/ InputHandler.moveState.turnDown = 1; break;

			case 37: /*left*/ InputHandler.moveState.turnLeft = 1; break;
			case 39: /*right*/ InputHandler.moveState.turnRight = 1; break;
    }
  },
  
  _keyup: function(event) {
    switch(event.keyCode) {
      case 18: /* altkey */ return; break;

			case 87: /*W*/ InputHandler.moveState.forward = 0; break;
			case 83: /*S*/ InputHandler.moveState.backward = 0; break;

			case 65: /*A*/ InputHandler.moveState.left = 0; break;
			case 68: /*D*/ InputHandler.moveState.right = 0; break;

			case 38: /*up*/ InputHandler.moveState.turnUp = 0; break;
			case 40: /*down*/ InputHandler.moveState.turnDown = 0; break;

			case 37: /*left*/ InputHandler.moveState.turnLeft = 0; break;
			case 39: /*right*/ InputHandler.moveState.turnRight = 0; break;
    }
  },
  
  addEventListeners: function() {
    window.addEventListener('keydown', InputHandler._keydown, false);
    window.addEventListener('keyup',   InputHandler._keyup, false);
  }
};
