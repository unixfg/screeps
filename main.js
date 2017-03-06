var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {


    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    console.log('Upgraders: ' + upgraders.length);
    console.log('Harvesters: ' + harvesters.length);
    console.log('Builders: ' + builders.length);
    
    if(builders.length < 3) {
        var newName = Game.spawns['Spawn0'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    
    if(upgraders.length < 3) {
        var newName = Game.spawns['Spawn0'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }

    if(harvesters.length < 1) {
        var newName = Game.spawns['Spawn0'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }

    if(Game.spawns['Spawn0'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn0'].spawning.name];
        Game.spawns['Spawn0'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn0'].pos.x + 1,
            Game.spawns['Spawn0'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
