/*
 * Entity definition
 *
 * Entities are simple containers for components, which
 * are in turn only containers for data, nothing more
 */
 
DIG.Entity = function Entity() {
  if(!(this instanceof DIG.Entity)) {
    return new DIG.Entity();
  }
  this.uuid = THREE.Math.generateUUID();
  DIG.Entity.prototype._count++;
  this.components = {};
  
  return this;
}

DIG.Entity.prototype._count = 0;

DIG.Entity.prototype.addComponent = function addComponent(component) {
  this.components[component] = component;
  
  return this;
}

// accepts a string or a component function
DIG.Entity.prototype.removeComponent = function removeComponent(component) {
  var name = component;
  
  if(typeof component === 'function') {
    name = component.prototype.name;
  }
  
  delete this.components[name];
  return this;
}

DIG.Entity.prototype.get = function get(component) {
   return this.components[component];
}

DIG.Entity.prototype.has = function has(component) {
  var name = component;
  
  if(typeof component === 'function') {
    name = component.prototype.name;
  }
  //this might need to be set to return true or false if name === null or something
  return this.components.name;
}

// accepts an array
DIG.Entity.prototype.hasAll(components){
  for (var i = 0, j = components.length; i < j; i++) {
    var component = this.get(components[i]);
    if (typeof component === 'undefined' || component == null) {
      return false;
    }
  }

  return true;
}

DIG.Entity.prototype.print = function print() {
  console.log(JSON.stringify(this, null, 2));
  return this;
}