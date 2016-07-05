module.exports = {
    run: run
};

function run(creep, gameState) {
    // An upgrader is working if it is upgrading the controller or moving to do so
    // An upgrader is not working if it is no longer carrying energy

    if (creep.memory.working && creep.carry.energy === 0) {
        creep.memory.working = false;
    } else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
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