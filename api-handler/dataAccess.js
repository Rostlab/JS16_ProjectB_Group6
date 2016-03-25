const https = require("https");

const cha = require("./getAllCharacters");
const cul = require("./getAllCultures");
const hou = require("./getAllHouses");
const reg = require("./getAllRegions");
const tit = require("./getAllTitles");
const rel = require("./support/deadRelations");
const config = require("./config");
const url_cha = config.urls.characters;
const url_cul = config.urls.cultures;
const url_hou = config.urls.houses;
const url_reg = config.urls.regions;


/**
*Requests data from the API
*@param {String} url
*@param {callback} callback
*/function dataAccess(url, callback){
	https.get(url, function(res) {
		var data = "";
		res.on('data', function(d){
			data += d;
		});
		res.on('end', function(){
			callback(data);
		});
		res.resume();
	}).on('error', function(e) {
		console.log(`Got error: ${e.message}`);
	});
}

/**
*Callback used by dataAccess
*@param {JSON} data
*/



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
	},
	relatedDead: function(callback){
		rel.getNumRelatedDead(function(success,data,err){
			callback(success,data,err);
		});
	}
};