 //player.js
var Player = {
    constants: {
      playerWidth: 4,
      playerHeight: 8,
      playerDepth: 4,
      
      playerPos_X: 48,
      playerPos_Y: 2,
      playerPos_Z: 96,
      
      lookAt_X: 0,
      lookAt_Y: 0,
      lookAt_Z: -1,
      
      handWidth: 1,
      handHeight: 8,
      handDepth: 4,
      handColor: {color: 0xAA724B}
    },
    
    entity: {},
    hands: {
    },
    //shovel = ,
    
    init: function() {
      Player.initPlayer();
      Player.initHands();
    },
    
    initPlayer: function() {
      playerShape = new THREE.BoxGeometry(Player.constants.playerWidth, Player.constants.playerHeight, Player.constants.playerDepth);
      playerMaterial = new THREE.MeshLambertMaterial();
      
      player = new THREE.Mesh(playerShape, playerMaterial);
      player.lookAt(new THREE.Vector3());
      
      player.position.x = Player.constants.playerPos_X;
      player.position.y = Player.constants.playerPos_Y;
      player.position.z = Player.constants.playerPos_Z;
      
      Player.entity = player;
    },
    
    initHands: function() {
      handShape = new THREE.SphereGeometry(Player.constants.handWidth, Player.constants.handHeight, Player.constants.handDepth);
      handMaterial = new THREE.MeshPhongMaterial(Player.constants.handColor);
      
      right = new THREE.Mesh(handShape, handMaterial);
      left = new THREE.Mesh(handShape, handMaterial);
            
            //dont use these magic numbers here
      right.position.x += 3;
      right.position.y += 2;
      right.position.z += -8;
      
      left.position.x += -4;
      left.position.y += 1;
      left.position.z += -8;
      
        //if Player.entity is defined, add the hands to it. Otherwise alert
      ((Player.entity) ? Player.entity.add(right) : alert("Right hand not added to the Player"));    
      ((Player.entity) ? Player.entity.add(left) : alert("Left hand not added to the Player"));

      Player.hands.right = right;
      Player.hands.left = left;      
    },
    
    
    //call this to initilize player
    getPlayer: (function() {
      Player.init();
      return Player.entity;
    })
    
		/*		
		//SHOVEL
		var triangleS = new THREE.Shape();
		triangleS.moveTo(0,0);
		triangleS.lineTo(4,8);
		triangleS.lineTo(12,8);
		triangleS.lineTo(8,2);
		var shovelGeo = new THREE.ShapeGeometry(triangleS);
		var shovelMat = new THREE.MeshPhongMaterial({color:0xFAFAD2});
		shovelMat.metal = true;
		var shovel = new THREE.Mesh(shovelGeo, shovelMat);
		var handleGeo = new THREE.CylinderGeometry(0.2,0.2,2);
		var handleMat = new THREE.MeshBasicMaterial({color:0x8B4513});
		var handle = new THREE.Mesh(handleGeo, handleMat);
		scene.add(shovel);
		scene.add(handle);
    */
    
};
