const https = require("https");

const cha = require("./getAllCharacters");
const cul = require("./getAllCultures");
const hou = require("./getAllHouses");
const tit = require("./getAllTitles");

module.exports = {
	
	characters: function(callback){
		https.get('https://got-api.bruck.me/api/characters/', function(res) {
			//console.log(`Got response: ${res.statusCode}`);
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				//var characters = '"'+(cha.getAllCharacters(data)).join('" , "')+'"';
				//console.log(cha.getAllCharacters(data));
				callback(cha.getAllCharacters(data));

			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
		
	},

	cultures: function(callback) {
		https.get('https://got-api.bruck.me/api/cultures/', function(res) {
			//console.log(`Got response: ${res.statusCode}`);
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				callback(cul.getAllCultures(data));
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	},

	houses: function(callback){
		https.get('https://got-api.bruck.me/api/houses/', function(res) {
			//console.log(`Got response: ${res.statusCode}`);
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				callback(hou.getAllHouses(data));
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	},

	places: function(callback){
		callback("undefined");
	},

	titles: function(callback) {
		https.get('https://got-api.bruck.me/api/characters/', function(res) {
			//console.log(`Got response: ${res.statusCode}`);
			var data = "";
			res.on('data', function(d){
				data += d;
			});
			res.on('end', function(){
				callback(tit.getAllTitles(data));
			});
  			// consume response body
  			res.resume();
		}).on('error', function(e) {
  			console.log(`Got error: ${e.message}`);
		});
	}
}