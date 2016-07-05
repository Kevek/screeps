// CreepRoles
var creepHarvester = require('creep.harvester');
var creepUpgrader = require('creep.upgrader');
var creepBuilder = require('creep.builder');
// Spawn
require('prototype.spawn')();
// Construction
var roomConstruction = undefined;
// State
var gameState = require('game.state');
// Room
require('prototype.room')();

module.exports.loop = function() {
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;

    // Go through each room and build state
    for (let name in Game.rooms) {
        var room = Game.rooms[name];
        room.checkState(gameState);
    }

    // Run each creep
    for (let name in Memory.creeps) {
        // If a creep has expired, delete it from memory
        var creep = Game.creeps[name];
        if (creep === undefined) {
            delete Memory.creeps[name];
            continue;
        }
        if (creep.memory.role === 'harvester') {
            creepHarvester.run(creep, gameState);
            gameState.rooms[creep.room.name].numHarvesters += 1;
            harvesterCount++;
        }
        if (creep.memory.role === 'upgrader') {
            creepUpgrader.run(creep, gameState);
            gameState.rooms[creep.room.name].numUpgraders += 1;
        }
        if (creep.memory.role === 'builder') {
            creepBuilder.run(creep, gameState);
            gameState.rooms[creep.room.name].numBuilders += 1;
        }
    }

    Game.spawns.Spawn1.considerSpawning(gameState);
}