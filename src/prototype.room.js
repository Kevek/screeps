module.exports = function() {
	Room.prototype.checkState = function(gameState) {
		if (this.memory.knownControllerLevel != undefined) {
			// We've increased in controller level. It's time to build some construction sites.
			if (this.memory.knownControllerLevel < this.controller.level) {
				var roomConstruction = require('room.construction');
				roomConstruction.controllerUpgradeConstructions(this);
			}
		}
		this.memory.knownControllerLevel = this.controller.level;
		this.memory.sourceInfos = undefined;
		if (this.memory.sourceInfos === undefined) {
			var sources = this.find(FIND_SOURCES);
			var keeperLairs = this.find(FIND_STRUCTURES, {
				filter: function(e) {
					return e.structureType === STRUCTURE_KEEPER_LAIR;
				}
			});

			var sourceInfos = [];
			for (let i in sources) {
				var source = sources[i];
				var sourceInfo = {
					id: source.id,
					pos: source.pos,
					assigned: 0
				}

				if (keeperLairs.length > 0) {
					var nearbyKeeperLairs = keeperLairs === undefined ? undefined : _.filter(keeperLairs, function(e) {
						return Math.sqrt(Math.pow(e.pos.x - source.pos.x, 2),
							Math.pow(e.pos.x - source.pos.x, 2)) < 20;
					});
					// For now, make the router totally ignorant of sources guarded by a keeper
					if (nearbyKeeperLairs === undefined || nearbyKeeperLairs === 0) {
						sourceInfos.push(sourceInfo);
					}
				} else {
					sourceInfos.push(sourceInfo);
				}
			}
			this.memory.sourceInfos = JSON.stringify(sourceInfos);
		}

		var roomState = {
			numHarvesters: 0,
			numUpgraders: 0,
			numBuilders: 0,
			energyStores: [],
			sourceInfos: JSON.parse(this.memory.sourceInfos)
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
		gameState.rooms[this.name] = roomState;
	}
}