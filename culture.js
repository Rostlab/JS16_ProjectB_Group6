var allcultures = ["ironborn","northmen","freefolk",
					"braavosi","valyrian","ghiscari","dothraki",
					"dornish","westeros","mountainclans","tyroshi",
					"qaren","ironmen"]; //only cultures with 5 or more members are used
module.exports ={
	convert_culture: function(culturestring){
		for(var i=0;i<allcultures.length;i++){
			if(culturestring.toLowerCase().replace(/the/g,"").replace(/\s/g,"").indexOf(allcultures[i]) >= 0){
				return '"'+allcultures[i]+'"';
			}
		}
		return "?";
	},

	allcultures: function(){
		return '"'+allcultures.join('" , "')+'"';
	}

}
