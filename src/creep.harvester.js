module.exports = {
    run: run
};

function run(creep, gameState) {
    if (creep.carry.energy === creep.carryCapacity) {
        creep.memory.destinationId = undefined;
        if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
            if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
            }
        } else {
            var extensions = creep.room.find(FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_EXTENSION
                }
            });
            extensions = _.filter(extensions, function(e) {
                return e.energy < e.energyCapacity;
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
        if (creep.memory.destinationId === undefined) {
            var randomIndex = Math.floor((Math.random() * gameState.rooms[creep.room.name].sourceInfos.length));            
            var newDestination = gameState.rooms[creep.room.name].sourceInfos[randomIndex];
            creep.memory.destinationId = newDestination.id
        }
        // TODO: How should I record that we've taken a particular destination?
        // gameState.rooms[ceep.room.name].sourceInfos[]
        var destination = Game.getObjectById(creep.memory.destinationId);
        if (creep.harvest(destination) === ERR_NOT_IN_RANGE) {
            creep.moveTo(destination);
        }
    }
}