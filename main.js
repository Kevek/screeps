// CreepRoles
var roleHarvester=require('role.harvester');
var roleUpgrader=require('role.upgrader');
var roleBuilder=require('role.builder');
// Room
var roomSpawner=require('room.spawner');

module.exports.loop = function () {
    var harvesterCount=0;
    var upgraderCount=0;
    var builderCount=0;
    
    // Retire deceased creeps
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
        
        var creep=Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
            harvesterCount++;
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
            upgraderCount++;
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
            builderCount++;
        }
    }
    
    roomSpawner.spawn({
        harvesterCount:harvesterCount, 
        upgraderCount:upgraderCount,
        builderCount:builderCount
    });
}