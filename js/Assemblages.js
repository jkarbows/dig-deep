/* Assemblages are like entity templates
 * Each assemblage returns an entity like a factory or w/e
 * There may be a better way to go about structuring these things
 * maybe call them families instead?
 */

DIG.Assemblages = {
    Assemblage: function Assemblage(){
        var entity = new DIG.Entity();
        entity.addComponent( new DIG.Components.componentName());
        return entity;
    }
};