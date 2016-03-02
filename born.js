module.exports ={
	convert_born: function(date){
		if (date.search(/\d/) < 0){
			return "?";
		}
		var born = (date.search(/AC/)<date.search(/BC/))?(500+parseInt(date)):(500-parseInt(date));
		return born;
	}
}