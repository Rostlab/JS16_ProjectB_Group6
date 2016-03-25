module.exports={
	/**
	*Gets all unique regions
	*@param {JSON} json
	*@return {Array} regions
	*/
	getAllRegions: function(json){
		json = JSON.parse(json);
		var regions = [];
		json.forEach(function(element,index){
			if(element["name"] != undefined && regions.indexOf('"'+element["name"]+'"') == -1){
				regions.push('"'+element["name"]+'"');
			}
		});
		return regions.sort();
	}
}
