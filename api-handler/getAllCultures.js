module.exports={
	/**
	*Gets all unique cultures
	*@param {JSON} json
	*@return {Array} cultures
	*/
	getAllCultures: function(json){
		json = JSON.parse(json);
		var cultures = [];
		json.forEach(function(element,index){
			if(element["name"] != undefined && cultures.indexOf('"'+element["name"]+'"') == -1){
				cultures.push('"'+element["name"]+'"');
			}
		});
		return cultures.sort();
	}
}
