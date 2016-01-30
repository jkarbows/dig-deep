/*
 * this is a temporary file for the sake of testing and development
 * on fundamental systems. Post working, each component should live
 * in its own file in a component subdirectory
 */
DIG.Components.componentName = function componentName(value) {
  //values should probably share component names e.g. health
  //although that would make the syntax for access e.g. DIG.Components.health.health
  value = value || 0;
  this.value = value;
  
  return this;
}

DIG.Components.componentName.prototype.name = componentName;