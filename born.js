module.exports ={
	convert_born: function(date){
		var ac = date.search(/AC/);
		var bc = date.search(/BC/);
		if (date.search(/\d/) < 0 | (ac<0 && bc<0)){
			return "?";
		}
		var end;
		if (ac>=0 && bc>=0){
			end = (ac<bc)?(ac):(bc);
		} else if (ac>=0){
			end = ac;
		} else {
			end = bc;
		}
		date = date.slice(date.search(/\d/),end+2);
		var born = (end==ac)?(500+parseInt(date)):(500-parseInt(date));
		return born;
	}
}
