//world.js
var World = {
  
  constants: {
    cameraPos_Y: 6,
    camerFOV: 60,
    cameraPerspective: (window.innerWidth/window.innerHeight),
    cameraNear: 0.1,
    cameraFar: 500,
    
    fogColor: 0x000000,
    fogDensity: 0.005,
    
    rendererColor: 0x040404,
    
    lightsColor: 0xF7EFBE,
    lightsIntensity: 0.7,
    
  },
  
  scene: {},
  camera: {},
  renderer: {},
  lights: {},
  
  init: function(){
    World.initCamera();
    World.initScene();
    World.initLights();
    World.initRenderer();
    //World.render();
    InputHandler.addEventListeners();
    
    World.scene.add(Player.getPlayer());
    Player.entity.add(World.camera);
    World.render();
  },
  
  initScene: function() {
    World.scene = new THREE.Scene();
    World.scene.add(World.camera);
    World.scene.fog = new THREE.FogExp2(World.constants.fogColor, World.constants.fogDensity);
    
    //helper
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
		lightBack.position.set(-0.5, -1, -0.5); //coming from left-top-back
    
    World.scene.add(lightFront);
		World.scene.add(lightBack)
  },
 
  initCamera: function() {
    World.camera = new THREE.PerspectiveCamera(
      World.constants.camerFOV,
      World.constants.cameraPerspective,
      World.constants.cameraNear,
      World.constants.cameraFar);
      World.camera.position.y = World.constants.cameraPos_Y;
      //alert(World.camera instanceof THREE.Camera);
  },
 
  render: function() {
    requestAnimationFrame(World.render); //calls render function again
		InputHandler.update();
		World.renderer.render(World.scene, World.camera);
  }
  
};
