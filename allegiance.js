module.exports ={
getAllegiance: function (data){
		if(data.search(/^House/) < 0){
			return "?";
		}
		var ally = data.match(/House ([A-Z][a-z]+)/);
			return ally;
		
	}
}

