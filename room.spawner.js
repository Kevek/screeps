module.exports = {
    spawn: spawn
};

function spawn(creepNumData) {
    var targetHarvesters = 5;
    var targetUpgraders = 1;
    var targetBuilders = 2;
    var name = "";
    if (creepNumData.harvesterCount < targetHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'harvester',
            working: 'false'
        });
    } else if (creepNumData.upgraderCount < targetUpgraders) {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {
            role: 'upgrader',
            working: 'false'
        });
    } else if (creepNumData.builderCount < targetBuilders) {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {
            role: 'builder',
            working: 'false'
        });
    }
    // if(name!="") {
    //     console.log("Spawned new creep: " + name);
    // }
}