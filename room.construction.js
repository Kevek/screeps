/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.construction');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    constructRoad:function(creep) {
        var structures=creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
        var constructions=creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep.pos)
        
        if(structures.length===0 && constructions.length===0) {
            var result=creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
        }
    }
};