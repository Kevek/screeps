var creepUpgrader = require('creep.upgrader');
module.exports = {
    run: run
};

function run(creep, gameState) {
    if (creep.memory.working && creep.carry.energy === 0) {
        creep.memory.working = false;
    } else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
        creep.memory.working = true;
    }
    if (creep.memory.working) {
        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite === null) {
            creepUpgrader.run(creep);
            return;
        }
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite);
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