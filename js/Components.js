/*
 * this is a temporary file for the sake of testing and development
 * of fundamental systems. Post working status, each component should live
 * in its own file in a component subdirectory
 */

 //Example component
DIG.Components.componentName = function componentName(value) {
  //values should probably share component names e.g. health
  //although that would make the syntax for access e.g. DIG.Components.health.health
  value = value || 0;
  this.value = value;
  
  return this;
}
DIG.Components.componentName.prototype.name = 'componentName';

DIG.Components.collision = function collision() {
  this.collides = true;
  return this;
}
DIG.Components.collision.prototype.name = 'collision';