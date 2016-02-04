/*
 * this is a temporary file for the sake of testing and development
 * of fundamental systems. Post working status, each component should live
 * in its own file in a component subdirectory
 *
 * http://frinlet.com/entities/default.js describes a different style for components
 * where they'd be written as prototypal functions on the entity doodad we got goin on
 */

 //Example component
DIG.Components.componentName = function componentName(value) {
  //values should probably share component names e.g. health
  //although that would make the syntax for access e.g. DIG.Components.health.health
  value = value || 0;
  this.value = value;
  
  return this;
};
DIG.Components.componentName.prototype.name = 'componentName';

DIG.Components.physics = function physics() {
  this.collides = true;
  this.force = {
    x: 0,
    y: 0,
    z: 0
  };
  this.velocity = {
    x: 0,
    y:0,
    z:0
  }
  return this;
};
DIG.Components.physics.prototype.name = 'physics';

