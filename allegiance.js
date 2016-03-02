module.exports ={
getAllegiance: function (data){
		if(data.search(/^House/) < 0){
			return "?";
		}
<<<<<<< HEAD
		var ally = (date.match(/House ([A-Z][a-z]+)/))[1];
=======
		var ally = data.match(/House ([A-Z][a-z]+)/);
>>>>>>> 6bedc21433a3c0874250f6a278a710066e427f33
			return ally;
		
	}
}

