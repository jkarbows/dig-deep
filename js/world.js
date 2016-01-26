//world.js
var World = {
  
  constants: {
    cameraPosY: 6,
    cameraFOV: 60,
    cameraPerspective: (window.innerWidth/window.innerHeight),
    cameraNear: 0.1,
    cameraFar: 500,
    
    fogColor: 0x000000,
    fogDensity: 0.005,
    
    rendererColor: 0x040404,
    
    lightsColor: 0xF7EFBE,
    lightsIntensity: 0.7,
    
    wallScale: 15,
	WALL_HEIGHT: 35;
    wallColor: {color: 0xE393E6}
  },
  
  scene: {},
  camera: {},
  renderer: {},
  floor: {},
  map: {},
  obstacles: [],
  
  init: function(){
    World.initCamera();
    World.initScene();
    
    World.initLights();
    World.initRenderer();
    
    World.initMap();
    Physics.init();
    
    InputHandler.addEventListeners();
    
    World.scene.add(Player.getPlayer());
    Player.entity.add(World.camera);
    
    World.render();
  },
  
  initScene: function() {
    World.scene = new THREE.Scene();
    World.scene.add(World.camera);
    World.scene.fog = new THREE.FogExp2(World.constants.fogColor, World.constants.fogDensity);
    
    //Axis helper r=+x,g=+y,b=+z
    World.scene.add(new THREE.AxisHelper(16));
  },
  
  initRenderer: function() {
    World.renderer = new THREE.WebGLRenderer();
		World.renderer.setClearColor(World.constants.rendererColor);
		World.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(World.renderer.domElement);
  },
 
  initLights: function() {
    lightFront = new THREE.DirectionalLight(World.constants.lightsColor, World.constants.lightsIntensity);
		lightFront.position.set(0.5, 1, 0.5); //coming from the right-top-front
    
		lightBack = new THREE.DirectionalLight(World.constants.lightsColor, World.constants.lightsIntensity);
		lightBack.position.set(-0.5, -1, -0.5); //coming from left-bottom-back
    
    World.scene.add(lightFront);
		World.scene.add(lightBack)
  },
 
  initCamera: function() {
    World.camera = new THREE.PerspectiveCamera(
      World.constants.cameraFOV,
      World.constants.cameraPerspective,
      World.constants.cameraNear,
      World.constants.cameraFar);
      World.camera.position.y = World.constants.cameraPosY;
  },
  
  initMap: function() { 
      //i don't like this implimentation, it should change when the Dungeon file changes. 
      //No need to have === operator when javascript truthyness exists
    map = Dungeon.GetMap();
    mapSize = Dungeon.GetSize();
    
    wallShape = new THREE.BoxGeometry(World.constants.wallScale, World.constants.WALL_HEIGHT, World.constants.wallScale);
    wallMaterial = new THREE.MeshLambertMaterial(World.constants.wallColor);
    
    //wall
    for(z = 0; z < mapSize; z++) {
      for(x = 0; x < mapSize; x++) { //add wall blocks to positions in map-array        
        if(map[x][z] === 2) {
          
          //testing
          if((x % 2 == 0) && (z % 2 == 0)){
            wall = new THREE.Mesh(wallShape, (new THREE.MeshLambertMaterial({color: 0xE6633E})));
          } else{
            wall = new THREE.Mesh(wallShape, wallMaterial);
          }//testing
          
          wall.position.x = x*World.constants.wallScale;
          wall.position.z = z*World.constants.wallScale;
          
          World.scene.add(wall);
          World.obstacles.push(wall);
        }
      }
    }
    
    //TODO: floor
  },
 
  render: function() {
    requestAnimationFrame(World.render); //calls render function again
    //Player.bBox.update();
		InputHandler.update();
		World.renderer.render(World.scene, World.camera);
  }
  
};
