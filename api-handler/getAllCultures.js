module.exports={
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
