DIG.Entity = function Entity() {
  this.uuid = THREE.Math.generateUUID();
  DIG.Entity.prototype._count++;
  this.components = {};
  
  return this;
}

DIG.Entity.prototype._count = 0;

DIG.Entity.prototype.addComponent = function addComponent(component) {
  this.components[componentName] = component;
  
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

DIG.Entity.prototype.print = function print() {
  console.log(JSON.sringify(this, null, 4));
  return this;
}