const fs = require("fs");
fs.readFile('charachters_details.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   convertToARFF(data.toString());
});

function convertToARFF(json){
	json = JSON.parse(json);
	var arff = "@DATA\n";
	json.forEach(function(element,index){
		var born = "?";
		var died = "?";
		if(element["Born"] !== undefined){
			born = '"'+filterData(element["Born"])+'"';
		}
		if(element["Died"] !== undefined){
			died = '"'+filterData(element["Died"])+'"';
			//console.log(died);
		}

		var name = (element["name"] !== undefined)?('"'+filterData(element["name"])+'"'):"?";
		var culture = (element["Culture"] !== undefined)?('"'+filterData(element["Culture"])+'"'):"?";
		var allegiance = (element["Allegiance"] !== undefined)?('"'+filterData(element["Allegiance"])+'"'):"?"; 
		var race = (element["Race"] !== undefined)?('"'+filterData(element["Race"])+'"'):"?";
		var title = (element["Title"] !== undefined)?('"'+filterData(element["Title"])+'"'):"?";
		arff += name+','+culture+','+allegiance+','+born+','+died+','+race+','+title+'\n';
	});
	//console.log(arff);
	var header = "@RELATION characters\n@ATTRIBUTE name  STRING\n@ATTRIBUTE culture   STRING\n@ATTRIBUTE allegiance  STRING\n@ATTRIBUTE born  STRING\n@ATTRIBUTE died 	STRING\n@ATTRIBUTE race STRING\n@ATTRIBUTE title STRING\n";
	var filestring = header+arff;
	fs.writeFile("characters.arff",filestring,function (err, data) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("FILE SAVED.");
	});
}


//converts the provided string into a readable format
function filterData(date){
	var filtered = date.replace(/(\&\#.*?\;)|(\[.*\])/g," "); //replaces numeric interpretation of whitespace and [] with whitespace 
	filtered = filtered.replace(/"/g,''); //removes double quotes 
	filtered = filtered.replace("\n","");
	filtered = filtered.replace(/(\d(?=[a-zA-Z])|[a-zA-Z](?=(\d)))(?=(\S))/g,"$1 "); //insert whitespace between any digit and letter if ther isn't one
	filtered = filtered.replace(/\s(between|before|AC|BC|and|or|around|,|After|the)(?=(\S))/g," $1 ");	//insert withespace after all words in list if there isn't one
	return filtered;
}