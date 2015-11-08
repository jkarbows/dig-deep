/*
 * input handler
 */
 var mouse = new THREE.Vector2();

input = function(object, domElement){
	this.object = object;
		
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	if (domElement) this.domElement.setAttribute( 'tabindex', - 1 );
	
	this.movementSpeed = 1.0;
	this.rollSpeed = 1.0;
	
	this.autoForward = false;
	
	this.col = 0;
	
	this.tmpQuaternion = new THREE.Quaternion();
	
	this.mouseStatus = 0;
	
	this.moveState = {
		left: 0, right: 0,
		forward: 0, back: 0,
		lookUp: 0, lookDown: 0,
		lookLeft: 0, lookRight: 0
	};
	this.moveVector = new THREE.Vector3(0,0,0);
	this.rotationVector = new THREE.Vector3(0,0,0);
	
	this.handleEvent = function(event){
		if (typeof this[event.type]=='function'){
			this[event.type](event);
		}
	};
	
	this.keydown = function(event){
		if(event.altKey){
			return;
		}
		
		switch(event.keyCode){
		
			case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/ this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 38: /*up*/ this.moveState.lookUp = 1; break;
			case 40: /*down*/ this.moveState.lookDown = 1; break;

			case 37: /*left*/ this.moveState.lookLeft = 1; break;
			case 39: /*right*/ this.moveState.lookRight = 1; break;
			
		}
		moving = true;
		this.updateMovementVector();
		this.updateRotationVector();
	};
	
	this.keyup = function(event){
		switch(event.keyCode){
		
			case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

			case 87: /*W*/ this.moveState.forward = 0; break;
			case 83: /*S*/ this.moveState.back = 0; break;

			case 65: /*A*/ this.moveState.left = 0; break;
			case 68: /*D*/ this.moveState.right = 0; break;

			case 38: /*up*/ this.moveState.lookUp = 0; break;
			case 40: /*down*/ this.moveState.lookDown = 0; break;

			case 37: /*left*/ this.moveState.lookLeft = 0; break;
			case 39: /*right*/ this.moveState.lookRight = 0; break;

		}
		moving = false;
		this.updateMovementVector();
		this.updateRotationVector();
	};
	
	this.mousedown = function(event){
		if(this.domElement!==document){
			this.domElement.focus();
			mouse.x = (event.pageX);
			mouse.y = (event.pageY);
		}
		
		event.preventDefault();
		event.stopPropagation();
		
		click(mouse.x,mouse.y);
	};
	
	this.mousemove = function(event){
		//normalize coords
		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		
		//needs look code
		
		//console.log("mouse: ("+mouse.x+","+mouse.y+")");
	};
	
	this.mouseup = function(event){
		event.preventDefault();
		event.stopPropagation();
	};
	
	this.update = function(delta){
		var moveMult = delta*this.movementSpeed;
		var rotMult = delta*this.rollSpeed;
		
		var oldX = this.object.position.x;
		var oldZ = this.object.position.z;
		
		this.object.translateX(this.moveVector.x*moveMult);
		this.object.translateY(this.moveVector.y*moveMult);
		this.object.translateZ(this.moveVector.z*moveMult);
		
		//collision
		var boundLeft = ~~bBox.object.position.x;
		var boundTop = ~~bBox.object.position.z;
		//console.log(boundLeft);console.log(boundTop);
		if(map[~~(boundLeft/10)][Math.abs(~~(boundTop/10)-1)] === 1){//north collision
			var colBox = new THREE.Box3(new THREE.Vector3(boundLeft,0,boundTop),
				new THREE.Vector3(boundLeft+10,10,boundTop+10));
			if(bBox.box.isIntersectionBox(colBox)){
				this.object.position.z += this.object.position.z-boundTop;//oldZ;
				//this.moveVector.z = 0;
				this.col = 1;
				console.log("north");
			}
		}
		if(map[~~(boundLeft/10)][~~(boundTop/10)+1] === 1){//south collision
			var colBox = new THREE.Box3(new THREE.Vector3(boundLeft,0,boundTop),
				new THREE.Vector3(boundLeft+10,10,boundTop+10));
			if(bBox.box.isIntersectionBox(colBox)){
				this.object.position.z += -(this.object.position.z-(boundTop+10));//oldZ;
				//this.moveVector.setZ(0);
				this.col = 2;
				console.log("south");
				console.log(map[~~(boundLeft/10)][~~(boundTop/10+1)]);
			}
		}
		if(map[~~(boundLeft/10)+1][~~(boundTop/10)] === 1){//east collision
			var colBox = new THREE.Box3(new THREE.Vector3(boundLeft,0,boundTop),
				new THREE.Vector3(boundLeft+10,10,boundTop+10));
			if(bBox.box.isIntersectionBox(colBox)){
				this.col = 3;
				this.object.position.x += this.object.position.x-(boundLeft+10);//oldX;
				//this.moveVector.x = 0;
				console.log("east");
			}
		}
		if(map[Math.abs(~~(boundLeft/10)-1)][~~(boundTop/10)] === 1){//west collision
			var colBox = new THREE.Box3(new THREE.Vector3(boundLeft-10,0,boundTop),
				new THREE.Vector3(boundLeft,10,boundTop+10));
			if(bBox.box.isIntersectionBox(colBox)){
				this.col = 4;
				this.object.position.x += -(this.object.position.x-boundLeft);//oldX;
				//this.moveVector.x = 0;
				console.log("west");
			}
		}
		
		this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
		this.object.quaternion.multiply(this.tmpQuaternion);
		
		// expose the rotation vector for convenience
		this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );
	};
	
	this.updateMovementVector = function(){
		var forward = ( this.moveState.forward || ( this.autoForward && ! this.moveState.back ) ) ? 1 : 0;
		
		this.moveVector.x = (-this.moveState.left + this.moveState.right );
		this.moveVector.y = (-this.moveState.down + this.moveState.up );
		this.moveVector.z = (-forward + this.moveState.back );
		
		//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
	};
	
	this.updateRotationVector = function() {
		//this.rotationVector.x = (-this.moveState.lookDown + this.moveState.lookUp );
		this.rotationVector.y = (-this.moveState.lookRight  + this.moveState.lookLeft );

		//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );
	};
	
	function bind(scope, fn){
		return function(){
			fn.apply(scope, arguments);
		};
	};
	
	function contextmenu(event){
		event.preventDefault();
	};
	
	this.dispose = function() {
		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _mousedown, false );
		this.domElement.removeEventListener( 'mousemove', _mousemove, false );
		this.domElement.removeEventListener( 'mouseup', _mouseup, false );

		window.removeEventListener( 'keydown', _keydown, false );
		window.removeEventListener( 'keyup', _keyup, false );
	};

	var _mousemove = bind(this, this.mousemove);
	var _mousedown = bind(this, this.mousedown);
	var _mouseup = bind(this, this.mouseup);
	var _keydown = bind(this, this.keydown);
	var _keyup = bind(this, this.keyup);

	this.domElement.addEventListener('contextmenu', contextmenu, false);

	this.domElement.addEventListener('mousemove', _mousemove, false);
	this.domElement.addEventListener('mousedown', _mousedown, false);
	this.domElement.addEventListener('mouseup',   _mouseup, false);

	window.addEventListener('keydown', _keydown, false);
	window.addEventListener('keyup',   _keyup, false);

	this.updateMovementVector();
	this.updateRotationVector();
};

function click(x, y){
	console.log("Mouse click at ("+x+","+y+")");
};