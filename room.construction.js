module.exports = {
    constructRoad: constructRoad
};

function constructRoad(creep) {
    var structures = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
    var constructions = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep.pos)
    if (structures.length === 0 && constructions.length === 0) {
        var result = creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    }
}