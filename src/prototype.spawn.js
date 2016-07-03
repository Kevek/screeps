module.exports = function() {
	StructureSpawn.prototype.considerSpawning = function(gameState) {
		var roomState = gameState.rooms[this.room.name];
		if (roomState === undefined) {
			Game.notify("massive error: expected room " + this.room.name + " in game state");
			return;
		}

		var targetHarvesters = 5;
		// Require a minimum for 300 energy to spawn a creep, 
		// Be at least 90% full before bothing to spawn a creep except if we need harvesters
		if (this.room.energyAvailable < 300 ||
			(roomState.numHarvesters >= targetHarvesters &&
				this.room.energyAvailable / this.room.energyCapacityAvailable < 0.9)) {
			return;
		}

		// 		console.log("HERE");

		var targetUpgraders = 1;
		var targetBuilders = 4;
		var bodyPartToEnergyRequired = {
			"work": 100,
			"carry": 50,
			"move": 50,
		}

		var bodyPartToPlacementPriority = {
			"work": 1,
			"carry": 2,
			"move": 3,
		}

		var role = undefined;
		var bodyParts = [];
		var remainingEnergyAvailable = this.room.energyAvailable;
		var iter = 0;
		var roleSequence = [];
		if (roomState.numHarvesters < targetHarvesters) {
			role = "harvester";
			roleSequence = [CARRY, MOVE, WORK, WORK];
		} else if (roomState.numUpgraders < targetUpgraders) {
			role = "upgrader";
			roleSequence = [CARRY, MOVE, MOVE, WORK];
		} else if (roomState.numBuilders < targetBuilders) {
			role = "builder";
			roleSequence = [CARRY, MOVE, WORK, WORK];
		}

		// Calculate the largest body we can create
		// TODO: Be smarter about these sequences -- e.g., we may not actually want
		// TODO: x/4 move parts for a harvester? This is a simplistic start.
		if (roleSequence.length > 0) {
			var nextPartEnergy = bodyPartToEnergyRequired[roleSequence[iter % roleSequence.length]];
			while (remainingEnergyAvailable >= nextPartEnergy && iter < 10) {
				//  console.log("remainingEnergyAvailable: "+remainingEnergyAvailable);
				//  console.log("nextPartEnergy: "+nextPartEnergy);

				bodyParts.push(roleSequence[iter % roleSequence.length]);
				remainingEnergyAvailable -= nextPartEnergy;
				iter++;

				// 		console.log("iter%roleSequence.length: "+iter%roleSequence.length);
				// 		console.log("roleSequence[iter%roleSequence.length]: " + roleSequence[iter%roleSequence.length]);
				nextPartEnergy = bodyPartToEnergyRequired[roleSequence[iter % roleSequence.length]];
				// 		console.log("nextPartEnergy: "+nextPartEnergy);
			}

			// console.log(JSON.stringify(bodyParts));

			if (role != undefined && bodyParts.length > 0) {
				bodyParts = _.sortBy(bodyParts, function(e) {
					return bodyPartToPlacementPriority[e];
				})
				this.createCreep(bodyParts, undefined, {
					role: role,
					working: false
				});
			}
		}
	}
}