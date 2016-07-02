// CreepRoles
var creepHarvester = require('creep.harvester');
var creepUpgrader = require('creep.upgrader');
var creepBuilder = require('creep.builder');
// Room
var roomSpawner = require('room.spawner');
// Construction
var roomConstruction = require('room.construction');
module.exports.loop = function() {
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
            harvesterCount++;
        }
        if (creep.memory.role === 'upgrader') {
            creepUpgrader.run(creep);
            upgraderCount++;
        }
        if (creep.memory.role === 'builder') {
            creepBuilder.run(creep);
            builderCount++;
        }
    }
    roomSpawner.spawn({
        harvesterCount: harvesterCount,
        upgraderCount: upgraderCount,
        builderCount: builderCount
    });
}