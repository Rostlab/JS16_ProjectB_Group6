const https = require("https");
const all = require("./getAllAllegiances");
const cha = require("./getAllCharacters");
const cul = require("./getAllCultures");
const tit = require("./getAllTitles");

module.exports = {
	allegiances: function(){
		https.get('https://got-api.bruck.me/api/houses/', function(res) {
			console.log(`Got response: ${res.statusCode}`);
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				var allegiances = all.getAllAllegiances(data);
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
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				var characters = cha.getAllCharacters(data);
				console.log(characters);
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
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				var cultures = cul.getAllCultures(data);
				console.log(cultures);
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
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				var titles = tit.getAllTitles(data);
				console.log(titles);
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	}
}