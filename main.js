// CreepRoles
var creepHarvester = require('creep.harvester');
var creepUpgrader = require('creep.upgrader');
var creepBuilder = require('creep.builder');
// Room
var roomSpawner = require('room.spawner');
module.exports.loop = function() {
    var harvesterCount = 0;
    var upgraderCount = 0;
    var builderCount = 0;
    // Retire deceased creeps
    for (let name in Memory.creeps) {
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