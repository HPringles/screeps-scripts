var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var scripts = require("scripts");
var config = require("config")
module.exports.loop = function () {
    
    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // var builders =  _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    // for(var name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     }
    // }

    // if(harvesters.length < 2) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});        
    // }
    
    // if(upgraders.length < 1) {
    //     var newName = 'Upgrader' + Game.time;
    //     console.log('Spawning new upgrader: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'upgrader'}});        
    // }
    // if(builders.length < 1) {
    //     var newName = 'Builder' + Game.time;
    //     console.log('Spawning new builder: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'builder'}});        
    // }
    
    // if(Game.spawns['Spawn1'].spawning) { 
    //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1, 
    //         Game.spawns['Spawn1'].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }

    scripts.checkSpawn(Game);
    
    tower = null;
    
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
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
            roleBuilder.run(creep)
        }
    }
}