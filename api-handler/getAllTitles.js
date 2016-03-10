module.exports={
	getAllTitles: function(json){
		var titles = [];
		json.forEach(function(element,index){
			if(element["title"] != undefined){
			titles.push(element["title"]);
			} else {
			titles.push('?');
			}
		});
		titles = json.parse(titles);
			return titles;
	}
}
