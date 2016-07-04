// CreepRoles
var creepHarvester = require('creep.harvester');
var creepUpgrader = require('creep.upgrader');
var creepBuilder = require('creep.builder');
// Spawn
require('prototype.spawn')();
// Construction
var roomConstruction = require('room.construction');
// State
var gameState=require('game.state');

// PROFILER
var profiler = require('screeps-profiler');
profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function() {
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;

    // Go through each room and build state
    for (let name in Game.rooms) {
        var room=Game.rooms[name];
        if (room.memory.knownControllerLevel != undefined) {
            // We've increased in controller level. It's time to build some construction sites.
            if (room.memory.knownControllerLevel < room.controller.level) {
                roomConstruction.constructExtensions(room);
            }
        }
        room.memory.knownControllerLevel=room.controller.level;

        // TODO: Does this allocate a new room state? Is this the right way to do this???
        var roomState={
        	numHarvesters: 0,
        	numUpgraders: 0,
        	numBuilders: 0,
        	energyStores: []
        };
        // var structures=room.find(FIND_MY_STRUCTURES);
        // // TODO: Do I need to get the name and parse???
        // for (let structure in structures) {
        //     // TODO: Account for other types of structures...
        //     if (structure.structureType === STRUCTURE_EXTENSION ||
        //         structure.structureType === STRUCTURE_SPAWN ||
        //         structure.structureType === STRUCTURE_STORAGE) {
        //         roomState.energyStores.push({
        //             id: structure.id,
        //             availableCapacity: structure.energyCapacity - structure.energy
        //         })
        //     }
        // }
        gameState.rooms[name]=roomState;
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
            creepHarvester.run(creep);
            gameState.rooms[creep.room.name].numHarvesters+=1;
            harvesterCount++;
        }
        if (creep.memory.role === 'upgrader') {
            creepUpgrader.run(creep);
            gameState.rooms[creep.room.name].numUpgraders+=1;
        }
        if (creep.memory.role === 'builder') {
            creepBuilder.run(creep);
            gameState.rooms[creep.room.name].numBuilders+=1;
        }
    }
    
    // console.log(JSON.stringify(gameState));
    // console.log(harvesterCount);

// TODO: Do this for all spawns
    Game.spawns.Spawn1.considerSpawning(gameState);
    });
}