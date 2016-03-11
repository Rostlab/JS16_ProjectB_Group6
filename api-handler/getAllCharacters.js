module.exports={
	getAllCharacters: function(json){
	var characters = [];
	characters = JSON.parse(json);
			return characters;
	}
}
