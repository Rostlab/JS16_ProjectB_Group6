module.exports ={
	convert_born: function(date){
		if (date.search(/\d/) < 0){
			return "?";
		}
		var end = (date.search(/AC/)<date.search(/BC/))?(date.search(/AC/)):(date.search(/BC/);
		date = date.slice(date.search(/\d/),end+2);
		var born = (date.search(/AC/)>=0)?(500+parseInt(date)):(500-parseInt(date));
		return born;
	}
}