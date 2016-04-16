module.exports={
	/**
	*Gets all unique titles
	*@param {JSON} json
	*@return {Array} titles
	*/
	getAllTitles: function(json){
		json = JSON.parse(json);
		var titles = [];
		json.forEach(function(element,index){
			var title = element["titles"][0];
			if(element["titles"] != undefined && titles.indexOf('"'+title+'"') == -1){
			titles.push('"'+title+'"');
			}
		});
		return titles.sort();
	}
}
