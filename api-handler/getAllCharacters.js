const fs = require("fs");

module.exports={
	/**
	*Gets all characters
	*@param {JSON} json
	*@return {Array} characters
	*/
	getAllCharacters: function(json){
		var characters = [];
		characters = JSON.parse(json);
		return characters;
	},

	/**
	*Gets all unique character names
	*@param {JSON} json
	*@return {Array} names
	*/
	getAllNames: function(json){
		json = JSON.parse(json);
		var names = [];
		json.forEach(function(element,index){
			var chars = ["name", "mother", "father", "heir", "spouse", "allegiance", "parents"];
			chars.forEach(function(element1, index1){
				if(element[element1] !== undefined && names.indexOf('"'+element[element1]+'"') == -1){
					var name = (element[element1]).toString().replace(/"/g, "'");
					names.push('"'+name+'"');
				};
			});
		});
		return names.sort();
	}
}

