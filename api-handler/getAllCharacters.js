const fs = require("fs");

module.exports={
	getAllCharacters: function(json){
		var characters = [];
		characters = JSON.parse(json);
		return characters;
	},

	getAllNames: function(json){
		json = JSON.parse(json);
		var names = [];
		json.forEach(function(element,index){
			if(element["name"] != undefined && names.indexOf('"'+element["name"]+'"') == -1){
				names.push('"'+element["name"]+'"');
			}
		});
		return names.sort();
	}
}

