module.exports={
	getAllTitles: function(json){
		json = JSON.parse(json);
		var titles = [];
		json.forEach(function(element,index){
			if(element["title"] != undefined && titles.indexOf(element["title"]) == -1){
			titles.push(element["title"]);
			}
		});
		return titles.sort();
	}
}
