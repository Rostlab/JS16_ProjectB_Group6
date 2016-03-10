module.exports={
	getAllCultures: function(json){
		var cultures = [];
		json.forEach(function(element,index){
			if(element["name"] != undefined){
				cultures.push(element["name"]);
			} else {
				cultures.push('?');
			}
		});
		cultures = json.parse(cultures);
		return cultures;
	}
}
