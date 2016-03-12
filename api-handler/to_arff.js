const fs = require("fs");
const data = require("./dataAccess");

to_arff();

function to_arff(){
	data.characters(process);
}

function process(res){
	var arff = "@DATA\n";
	res.forEach(function(element,index){

		var name = (element["name"] !== undefined)?('"'+element["name"]+'"'):"?";
		//console.log(name);
		var title = (element["title"] !== undefined)?(element["title"]):"?";
		//console.log(title);
		var male = (element["male"] !== undefined)?(element["male"]):"?";
		//console.log(male);
		var culture = (element["culture"] !== undefined)?(element["culture"]):"?";
		//console.log(culture);
		var dateOfBirth = (element["dateOfBirth"] !== undefined)?(element["dateOfBirth"]):"?";
		//console.log(dateOfBirth);
		var mother = (element["mother"] !== undefined)?('"'+element["mother"]+'"'):"?";
		//console.log(mother);
		var father = (element["father"] !== undefined)?('"'+element["father"]+'"'):"?";
		//console.log(father);
		var heir = (element["heir"] !== undefined)?('"'+element["heir"]+'"'):"?";
		//console.log(heir);
		var placeOfBirth = (element["placeOfBirth"] !== undefined)?(element["placeOfBirth"]):"?";
		//console.log(placeOfBirth);
		var skills = (element["skills"] !== undefined)?(element["skills"]):"?";
		//console.log(skills);
		var house = (element["house"] !== undefined)?(element["house"]):"?";
		//console.log(house);
		var isAlive = (element["dateOfDeath"] == undefined && element["placeOfDeath"] == undefined)?(1):(0);
		//console.log(isAlive);

		arff += name+','+title+','+male+','+culture+','+dateOfBirth+','
			+mother+','+father+','+heir+','+placeOfBirth+','+skills+','
			+house+','+isAlive+'\n';
	});
	
	
	var filestring = "@RELATION characters\n@ATTRIBUTE name  STRING\n@ATTRIBUTE title  {";
	fs.writeFile("characters.arff",filestring,function (err, data) {
	   	if (err) {
	       return console.error(err);
	   	}
	   	titles();
	   	console.log("FILE SAVED.");
	});

	function titles(){
	   	data.titles(function(res){
	   		res+="}\n@ATTRIBUTE male NUMERIC\n@ATTRIBUTE culture  {";
	   		fs.appendFile("characters.arff",res,function (err, data) {
	   			if (err) {
	    	   		return console.error(err);
	   			}
	   			cultures();
			});
		});
	}

	function cultures(){
	   	data.cultures(function(res){
	   		res+="}\n@ATTRIBUTE dateOfBirth  NUMERIC\n@ATTRIBUTE mother STRING\n@ATTRIBUTE father STRING\n@ATTRIBUTE heir STRING\n@ATTRIBUTE placeOfBirth {";
	   		fs.appendFile("characters.arff",res,function (err, data) {
	   			if (err) {
	    	   		return console.error(err);
	   			}
	   			places();
			});
		});
	}

	function places(){
	   	data.places(function(res){
	   		res+="}\n@ATTRIBUTE skills STRING\n@ATTRIBUTE house  {";
	   		fs.appendFile("characters.arff",res,function (err, data) {
	   			if (err) {
	    	   		return console.error(err);
	   			}
	   			houses();
			});
		});
	}

	function houses(){
	   	data.houses(function(res){
	   		res+="}\n@ATTRIBUTE isAlive NUMERIC\n"+arff;
	   		fs.appendFile("characters.arff",res,function (err, data) {
	   			if (err) {
	    	   		return console.error(err);
	   			}
			});
		});
	}
}