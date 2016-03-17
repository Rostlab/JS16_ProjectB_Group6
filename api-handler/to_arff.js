const fs = require("fs");
const data = require("./dataAccess");
const promise = require("promise")

const time_reference = 305;

var arff = "";
var header = "";
var allCha;
var allCul;
var allHou;
var allReg;
var allTit;
var deadCharacters = [];

to_arff();

function to_arff(){
	var proCha = proCharacters();
	var proCul = proCultures();
	var proHou = proHouses();
	var proNam = proNames();
	var proReg = proRegions();
	var proTit = proTitles();
	promise.all([proCha, proCul, proHou, proNam, proReg, proTit]).then(function(v){
		head(allCha, allCul, allHou, allReg, allTit);
		fs.writeFile("characters.arff", header+arff, function (err, data) {
	   		if (err) {
	       		return console.error(err);
	   		}
	   		console.log("FILE SAVED.");
		});
	});
}

function proCharacters(){
	return new promise(function (fulfill, reject){
    	data.characters(function (res){
    		arff = "@DATA\n";
    		res.forEach(function(element,index){
    			if(deadCharacters.indexOf(element["name"]) == -1){
    				if(element["dateOfDeath"] !== undefined || element["placeOfDeath"] !== undefined
    					|| (time_reference - element["dateOfBirth"] >= 100) ){
						deadCharacters.push(element["name"]);
					}
				}	
    		});
    		res.forEach(function(element,index){
    		  if(filter(element["name"])){
				var name = '"'+element["name"]+'"';
				//console.log(name);
				var title = (element["title"] !== undefined)?(element["title"]):"?";
				//console.log(title);
				var male = (element["male"] !== undefined)?(element["male"]):"?";
				//console.log(male);
				var culture = (element["culture"] !== undefined)?(element["culture"]):"?";
				//console.log(culture);
				var dateOfBirth = (element["dateOfBirth"] !== undefined)?(element["dateOfBirth"]):"?";
				//console.log(dateOfBirth);

				arff += name+','+title+','+male+','+culture+','+dateOfBirth;

				var dateOfDeath = (element["dateOfDeath"] !== undefined)?(element["dateOfDeath"]):"?";
				//console.log(dateOfDeath);
				var mother = (element["mother"] !== undefined)?('"'+element["mother"]+'"'):"?";
				//console.log(mother);
				var father = (element["father"] !== undefined)?('"'+element["father"]+'"'):"?";
				//console.log(father);
				var heir = (element["heir"] !== undefined)?('"'+element["heir"]+'"'):"?";
				//console.log(heir);
				var placeOfBirth = (element["placeOfBirth"] !== undefined)?(element["placeOfBirth"]):"?";
				//console.log(placeOfBirth);

				arff += ','+dateOfDeath+','+mother+','+father+','+heir+','+placeOfBirth;

				var placeOfDeath = (element["placeOfDeath"] !== undefined)?(element["placeOfDeath"]):"?";
				//console.log(placeOfDeath);
				var house = (element["house"] !== undefined)?(element["house"]):"?";
				//console.log(house);
				var spouse = (element["spouse"] !== undefined)?(element["spouse"]):"?";
				//console.log(spouse);
				var allegiance = (element["allegiance"] !== undefined)?(element["allegiance"]):"?";
				//console.log(allegiance);
				var characterPopularity = (element["characterPopularity"] !== undefined)?(element["characterPopularity"]):"?";
				//console.log(characterPopularity);

				arff +=	','+placeOfDeath+','+house+','+spouse+','+allegiance+','+characterPopularity;

				var parents = (element["parents"] !== undefined)?(element["parents"]):"?";
				//console.log(parents);
				var books = (element["books"] !== undefined)?(element["books"]):"?";
				//console.log(books);
				var placeOfLastVisit = (element["placeOfLastVisit"] !== undefined)?(element["placeOfLastVisit"]):"?";
				//console.log(placeOfLastVisit);
				var isAlive = (deadCharacters.indexOf(element["name"] == -1))?(1):(0);
				//console.log(isAlive);		
				
				arff += ','+parents+','+books+','+placeOfLastVisit+','+isAlive;

				var isAliveMother = (element["mother"] !== undefined)?((deadCharacters.indexOf(element["mother"]) == -1)?(1):(0)):"?";
				var isAliveFather = (element["father"] !== undefined)?((deadCharacters.indexOf(element["father"]) == -1)?(1):(0)):"?";
				var isAliveHeir = (element["heir"] !== undefined)?((deadCharacters.indexOf(element["heir"]) == -1)?(1):(0)):"?";
				var isAliveSpouse = (element["spouse"] !== undefined)?((deadCharacters.indexOf(element["spouse"]) == -1)?(1):(0)):"?";
				var isAliveAllegiance = (element["allegiance"] !== undefined)?((deadCharacters.indexOf(element["allegiance"]) == -1)?(1):(0)):"?";
				var isAliveParents = (element["parents"] !== undefined)?((deadCharacters.indexOf(element["parents"]) == -1)?(1):(0)):"?";

				arff += ','+isAliveMother+','+isAliveFather+','+isAliveHeir+','+isAliveSpouse+','+isAliveParents+','+isAliveAllegiance;

				var isMarried = (element["spouse"] !== undefined)?(1):(0);
				var age = "?";
				if(element["dateOfBirth"] !== undefined){
					if(element["dateOfDeath"] !== undefined){
						age = element["dateOfDeath"] - element["dateOfBirth"];
					}else if(time_reference - element["dateOfBirth"] < 100){
						age = time_reference - element["dateOfBirth"];
					}else if(time_reference - element["dateOfBirth"] >= 100){
						age = 100;
					}
				};
				
				arff += ','+isMarried+','+age;

				arff += '\n';
			  }
			});
			fulfill(arff);
  		});
	});
}

function proCultures(){
	return new promise(function (fulfill, reject){
    	data.cultures(function (res){
    		allCul = res;
    		fulfill(res);
		});
	});
}

function proHouses(){
	return new promise(function (fulfill, reject){
    	data.houses(function (res){
    		allHou = res;
    		fulfill(res);
		});
	});
}

function proNames(){
	return new promise(function (fulfill, reject){
    	data.names(function (res){
    		allCha = res;
    		fulfill(res);
		});
	});
}

function proRegions(){
	return new promise(function (fulfill, reject){
    	data.regions(function (res){
    		allReg = res;
    		fulfill(res);
		});
	});
}
	
function proTitles(){
	return new promise(function (fulfill, reject){
   		data.titles(function (res){
   			allTit = res;
   			fulfill(res);
   		});
	});
}

function head(allCha, allCul, allHou, allReg, allTit){
	header = "@RELATION characters\n"
		+"@ATTRIBUTE name  {"+allCha+"}\n"
		+"@ATTRIBUTE title  {"+allTit+"}\n"
		+"@ATTRIBUTE male NUMERIC\n"
		+"@ATTRIBUTE culture  {"+allCul+"}\n"
		+"@ATTRIBUTE dateOfBirth  NUMERIC\n"
		+"@ATTRIBUTE dateOfDeath  NUMERIC\n"
		+"@ATTRIBUTE mother {"+allCha+"}\n"
		+"@ATTRIBUTE father {"+allCha+"}\n"
		+"@ATTRIBUTE heir {"+allCha+"}\n"
		+"@ATTRIBUTE placeOfBirth {"+allReg+"}\n"
		+"@ATTRIBUTE placeOfDeath {"+allReg+"}\n"
		+"@ATTRIBUTE house  {"+allHou+"}\n"
		+"@ATTRIBUTE spouse {"+allCha+"}\n"
		+"@ATTRIBUTE allegiance {"+allCha+"}\n"
		+"@ATTRIBUTE characterPopularity NUMERIC\n"
		+"@ATTRIBUTE parents {"+allCha+"}\n"
		+"@ATTRIBUTE books STRING\n"
		+"@ATTRIBUTE placeOfLastVisit {"+allReg+"}\n"
		+"@ATTRIBUTE isAlive NUMERIC\n"
		+"@ATTRIBUTE isAliveMother NUMERIC\n"
		+"@ATTRIBUTE isAliveFather NUMERIC\n"
		+"@ATTRIBUTE isAliveHeir NUMERIC\n"
		+"@ATTRIBUTE isAliveSpouse NUMERIC\n"
		+"@ATTRIBUTE isAliveAllegiance NUMERIC\n"
		+"@ATTRIBUTE isAliveParents NUMERIC\n"
		+"@ATTRIBUTE isMarried NUMERIC\n"
		+"@ATTRIBUTE age NUMERIC\n";
}

function filter(name){
	return true && (name !== undefined) && (name.search(/House/) !== 0);
}