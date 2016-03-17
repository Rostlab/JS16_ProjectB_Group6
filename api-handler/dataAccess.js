const https = require("https");

const cha = require("./getAllCharacters");
const cul = require("./getAllCultures");
const hou = require("./getAllHouses");
const reg = require("./getAllRegions");
const tit = require("./getAllTitles");

const url_cha = 'https://got-api.bruck.me/api/characters/';
const url_cul = 'https://got-api.bruck.me/api/cultures/';
const url_hou = 'https://got-api.bruck.me/api/houses/';
const url_reg = 'https://got-api.bruck.me/api/regions/';

function dataAccess(url, callback){
	https.get(url, function(res) {
		//console.log(`Got response: ${res.statusCode}`);
		var data = "";
		res.on('data', function(d){
			data += d;
		});
		res.on('end', function(){
			callback(data);
		});
		// consume response body
		res.resume();
	}).on('error', function(e) {
		console.log(`Got error: ${e.message}`);
	});
}

module.exports = {
	
	characters: function(callback){
		dataAccess(url_cha, function(res){
			callback(cha.getAllCharacters(res));
		});
	},

	cultures: function(callback) {
		dataAccess(url_cul, function(res){
			callback(cul.getAllCultures(res));
		});
	},

	houses: function(callback){
		dataAccess(url_hou, function(res){
			callback(hou.getAllHouses(res));
		});
	},

	names: function(callback){
		dataAccess(url_cha, function(res){
			callback(cha.getAllNames(res));
		});
	},

	regions: function(callback){
		dataAccess(url_reg, function(res){
			callback(reg.getAllRegions(res));
		});
	},

	titles: function(callback) {
		dataAccess(url_cha, function(res){
			callback(tit.getAllTitles(res));
		});
	}
}