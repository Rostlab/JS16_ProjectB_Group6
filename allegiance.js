module.exports ={
getAllegiance: function (data){
		if(data.search(/^House/) < 0){
			return "?";
		}
		if(data.match(/House ([A-Z][a-z]+)/)){
			var ally = (data.match(/House ([A-Z][a-z]+)/))[1];
				return '"'+ally+'"';
		}else{
			return "?";
		}
		
	}
}

