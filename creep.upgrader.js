var roomConstruction=require('room.construction');

module.exports = {
    run: function(creep) {
        // An upgrader is working if it is upgrading the controller or moving to do so
        // An upgrader is not working if it is no longer carrying energy
        
        if (creep.memory.working && creep.carry.energy === 0) {
            creep.memory.working=false;
        } else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working=true;
        }
        
        if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            // TODO: Maybe take energy from something other than source?
            var source=creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        
        roomConstruction.constructRoad(creep);
    }
};