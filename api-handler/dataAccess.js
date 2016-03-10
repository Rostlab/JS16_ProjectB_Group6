const https = require("https");
const all = require("./getAllAllegiances");
const cha = require("./getAllCharacters");
const cul = require("./getAllCultures");
const tit = require("./getAllTitles");

module.exports = {
	allegiances: function(){
		https.get('https://got-api.bruck.me/api/houses/', function(res) {
			console.log(`Got response: ${res.statusCode}`);
			res.on('data', function(d){
				var allegiances = all.getAllAllegiances(d);
				console.log(allegiances);
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	},

	characters: function(){
		https.get('https://got-api.bruck.me/api/characters/', function(res) {
			console.log(`Got response: ${res.statusCode}`);
			res.on('data', function(d){
				var characters = cha.getAllCharacters(d);
				//console.log(characters);
			});
			
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	},

	cultures: function() {
		https.get('https://got-api.bruck.me/api/cultures/', function(res) {
			console.log(`Got response: ${res.statusCode}`);
			res.on('data', function(d){
				var cultures = cul.getAllCultures(d);
				//console.log(cultures);
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	},

	titles: function() {
		https.get('https://got-api.bruck.me/api/characters/', function(res) {
			console.log(`Got response: ${res.statusCode}`);
			res.on('data', function(d){
				var titles = tit.getAllTitles(d);
				console.log(titles);
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	}
}