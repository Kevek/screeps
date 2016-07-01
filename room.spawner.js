module.exports = {
    spawn:function(creepNumData) {
        var minHarvesters = 5;
        var minUpgraders = 1;
        var minBuilders = 2;
        
        var name="";
        if(creepNumData.harvesterCount < minHarvesters) {
            name=Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, 
                {role : 'harvester', working: 'false'});
        } else if(creepNumData.upgraderCount < minUpgraders) {
            name=Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, 
                {role : 'upgrader', working: 'false'});
        } else if(creepNumData.builderCount < minBuilders) {
            name=Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, 
                {role : 'builder', working: 'false'});
        }
    
        // if(name!="") {
        //     console.log("Spawned new creep: " + name);
        // }
    }
};