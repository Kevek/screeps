module.exports = {
    controllerUpgradeConstructions: controllerUpgradeConstructions
};

function constructRoad(creep) {
    var structures = creep.room.lookForAt(LOOK_STRUCTURES, creep.pos);
    var constructions = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, creep.pos)
    if (structures.length === 0 && constructions.length === 0) {
        var result = creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD);
    }
}

function controllerUpgradeConstructions(room) {
    constructExtensions(room);
    constructTowers(room);
}
// TODO: We should call this when the known controller level goes UP
function constructExtensions(room) {
    var controllerLevelToAmount = {
        1: 0,
        2: 5,
        3: 10,
        4: 20,
        5: 30,
        6: 40,
        7: 50,
        8: 60
    };
    var currentExtensions = room.find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_EXTENSION
        }
    });
    var extensionsToBuild = controllerLevelToAmount[room.controller.level] -
        currentExtensions.length;

    if (extensionsToBuild <= 0) {
        // We already have all the extensions we can build
        return;
    }
    var spawn = Game.spawns.Spawn1;
    var pos = spawn.pos;

    constructAroundPoint(room, pos, 50, 4, 100, extensionsToBuild, STRUCTURE_EXTENSION);
}

function constructTowers(room) {
    var controllerLevelToAmount = {
        1: 0,
        2: 0,
        3: 1,
        4: 1,
        5: 2,
        6: 2,
        7: 3,
        8: 6
    }
    var currentTowers = room.find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_TOWER
        }
    });
    var towersToBuild = controllerLevelToAmount[room.controller.level] -
        currentTowers.length;
    if (towersToBuild <= 0) {
        // Too low level to build towers or already saturated
        return;
    }
    var spawn = Game.spawns.Spawn1;
    var pos = spawn.pos;

    constructAroundPoint(room, pos, 80, 6, 100, towersToBuild, STRUCTURE_TOWER);
}

function constructAroundPoint(room, centerPosition, maxDiameter, jumpDistance, maxTries, amountToBuild, structureCode) {
    // Limit to how far we can go from center
    var width = maxDiameter;
    var height = maxDiameter;
    var x = -(width - height) / 2;
    var y = 0;
    var dx = jumpDistance;
    var dy = 0;
    var x_limit = (width - height) / 2;
    var y_limit = 0;

    var built = 0;
    var tries = 0;
    var resultCode = -1;
    while (resultCode != ERR_FULL && tries < maxTries && built < amountToBuild) {
        // go right
        if (dx > 0) {
            if (x > x_limit) {
                dx = 0;
                dy = jumpDistance;
            }
        }
        // go up
        else if (dy > 0) {
            if (y > y_limit) {
                dx = -jumpDistance * 2;
                dy = 0;
            }
        }
        // go left
        else if (dx < 0) {
            if (x < (-1 * x_limit)) {
                dx = 0;
                dy = -jumpDistance;
            }
        }
        // go down
        else if (dy < 0) {
            if (y < (-1 * y_limit)) {
                dx = jumpDistance * 2;
                dy = 0;
                x_limit += 1;
                y_limit += 1;
            }
        }
        x += dx;
        y += dy;

        if ((-width / 2 < x && x <= width / 2) && (-height / 2 < y && y <= height / 2)) {
            var newPos = new RoomPosition(centerPosition.x + x, centerPosition.y - y, room.name);
            resultCode = room.createConstructionSite(newPos, structureCode);
            if (resultCode == OK) {
                built++;
            }
        }
        tries++;
    }
}