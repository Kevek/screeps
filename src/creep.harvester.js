module.exports = {
    run: run
};

function run(creep) {
    if (creep.carry.energy === creep.carryCapacity) {
        if (Game.spawns.Spawn1.energy<Game.spawns.Spawn1.energyCapacity) {
            if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        } else {
            var extensions = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_EXTENSION }
            });
            extensions=_.filter(extensions, function(e) {
                    return e.energy<e.energyCapacity;
                })
            if (extensions.length) {
                if (creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extensions[0])
                }
            } else {
                creep.moveTo(Game.spawns.Spawn1);
            }
        }
    } else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}