module.exports={
	getAllCharacters: function(json){
	var characters = [];
	json.forEach(function(element,index){
		if(element["name"] != undefined){
			characters.push(element["name"]);
		} else {
		characters.push('?');
		}
	});
	characters = json.parse(characters);
			return characters;
}
}
