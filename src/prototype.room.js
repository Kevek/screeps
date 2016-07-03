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

		var roomState = {
			numHarvesters: 0,
			numUpgraders: 0,
			numBuilders: 0,
			energyStores: [],
			sources: []
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