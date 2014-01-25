/* global require: false */
/* global process: false */

var wheeler = require('./lib/wheeler');

var base = parseInt(process.argv[2]);
var move = parseInt(process.argv[3]) || 180;

console.log(wheeler.moveGValueOnYWheel(base, move));