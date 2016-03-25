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
var allRel;
var allCul1 = [];
var allHou1 = [];
var allReg1 = [];
var deadCharacters = ["Aegon III Targaryen","Aegon II Targaryen","Aegon IV Targaryen","Aegon I Targaryen","Aegon V Targaryen","Aenys I Targaryen","Aerys II Targaryen","Aerys I Targaryen","Alysanne Targaryen","Baelor I Targaryen","Balon Greyjoy","Daeron II Targaryen","Daeron I Targaryen","Harren Hoare","Jaehaerys I Targaryen","Maekar I Targaryen","Viserys I Targaryen","Jaehaerys II Targaryen","Joffrey Baratheon","Maegor I Targaryen","Robb Stark","Tristifer IV Mudd","Viserys II Targaryen"];
var smallFolk = ["Septon", "Septa", "Khal", "Bloodrider"];

to_arff();

function to_arff(){
	var proRel = proRelatedDead();
	promise.all([proRel]).then(function(values){
		var proCha = proCharacters();
		var proCul = proCultures();
		var proHou = proHouses();
		var proNam = proNames();
		var proReg = proRegions();
		var proTit = proTitles();
		promise.all([proCha, proCul, proHou, proNam, proReg, proTit]).then(function(v){
			allCul1.forEach(function(element, index){
				if(allCul.indexOf(element) == -1 && element !== ""){
					allCul.push(element);
				}
			});
			allHou1.forEach(function(element, index){
				if(allHou.indexOf(element) == -1 && element !== ""){
					allHou.push(element);
				}
			});
			head(allCha, allCul, allHou, allReg, allTit);
			fs.writeFile("characters.arff", header+arff, function (err, data) {
		   		if (err) {
		       		return console.error(err);
		   		}
		   		console.log("FILE SAVED.");
			});
		});
	}).catch(function(error){
		console.log(error);
	});;
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

function proRelatedDead(){
	return new promise(function(fulfill,reject){
		data.relatedDead(function(success,data,err){
			if(success){
				allRel = data;
				fulfill(data);
			}else{
				reject(err);
			}
		});
	});
}

function proCharacters(){
	return new promise(function (fulfill, reject){
    	data.characters(function (res){
    		arff = "@DATA\n";
    		var allRanks = [];
    		res.forEach(function(element,index){
    			if(deadCharacters.indexOf(element["name"]) == -1){
    				if(element["dateOfDeath"] !== undefined || element["placeOfDeath"] !== undefined
    					|| (time_reference - element["dateOfBirth"] >= 100) ){
						deadCharacters.push(element["name"]);
					}
				}

				if(element["pageRank"] !== undefined){
					allRanks.push(element["pageRank"]);
					
				}else{
					element["pageRank"] = 0;
					allRanks.push(0);
				}
    		});
    		var maxRank = Math.max.apply(null,allRanks);
    		var minRank = Math.min.apply(null,allRanks);
    		res.forEach(function(element,index){
    		  if(filter(element["name"])){
				var name = '"'+foo(element["name"])+'"';
				var title = (element["title"] !== undefined)?('"'+element["title"]+'"'):"?";
				var male = (element["male"] !== undefined)?((element["male"])?(1):(0)):"?";
				var culture = (element["culture"] !== undefined)?('"'+element["culture"]+'"'):"?";
				allCul1.push((element["culture"] !== undefined)?('"'+element["culture"]+'"'):"");
				var dateOfBirth = (element["dateOfBirth"] !== undefined)?(element["dateOfBirth"]):"?";

				arff += name+','+title+','+male+','+culture+','+dateOfBirth;

				var dateOfDeath = (element["dateOfDeath"] !== undefined)?(element["dateOfDeath"]):"?";
				var mother = (element["mother"] !== undefined)?('"'+foo(element["mother"])+'"'):"?";
				var father = (element["father"] !== undefined)?('"'+foo(element["father"])+'"'):"?";
				var heir = (element["heir"] !== undefined)?('"'+foo(element["heir"])+'"'):"?";
				var placeOfBirth = (element["placeOfBirth"] !== undefined)?('"'+element["placeOfBirth"]+'"'):"?";

				arff += ','+dateOfDeath+','+mother+','+father+','+heir+','+placeOfBirth;

				var placeOfDeath = (element["placeOfDeath"] !== undefined)?('"'+element["placeOfDeath"]+'"'):"?";
				var house = (element["house"] !== undefined)?('"'+element["house"]+'"'):"?";
				allHou1.push((element["house"] !== undefined)?('"'+element["house"]+'"'):"?");
				var spouse = (element["spouse"] !== undefined)?('"'+foo(element["spouse"])+'"'):"?";
				var allegiance = (element["allegiance"] !== undefined)?('"'+foo(element["allegiance"])+'"'):"?";

				arff +=	','+placeOfDeath+','+house+','+spouse+','+allegiance;

				var book1 = ((element["books"] !== undefined) && (element["books"].indexOf("A Game of Thrones") != -1))?(1):(0);
				var book2 = ((element["books"] !== undefined) && (element["books"].indexOf("A Clash of Kings") != -1))?(1):(0);
				var book3 = ((element["books"] !== undefined) && (element["books"].indexOf("A Storm of Swords") != -1))?(1):(0);
				var book4 = ((element["books"] !== undefined) && (element["books"].indexOf("A Feast for Crows") != -1))?(1):(0);
				var book5 = ((element["books"] !== undefined) && (element["books"].indexOf("A Dance with Dragons") != -1))?(1):(0);

				var placeOfLastVisit = (element["placeOfLastVisit"] !== undefined)?('"'+element["placeOfLastVisit"]+'"'):"?";
				
				arff += ','+book1+','+book2+','+book3+','+book4+','+book5+','+placeOfLastVisit;

				var isAliveMother = (element["mother"] !== undefined)?((deadCharacters.indexOf(element["mother"]) == -1)?(1):(0)):"?";
				var isAliveFather = (element["father"] !== undefined)?((deadCharacters.indexOf(element["father"]) == -1)?(1):(0)):"?";
				var isAliveHeir = (element["heir"] !== undefined)?((deadCharacters.indexOf(element["heir"]) == -1)?(1):(0)):"?";
				var isAliveSpouse = (element["spouse"] !== undefined)?((deadCharacters.indexOf(element["spouse"]) == -1)?(1):(0)):"?";
				var isAliveAllegiance = (element["allegiance"] !== undefined)?((deadCharacters.indexOf(element["allegiance"]) == -1)?(1):(0)):"?";

				arff += ','+isAliveMother+','+isAliveFather+','+isAliveHeir+','+isAliveSpouse+','+isAliveAllegiance;

				var isMarried = (element["spouse"] !== undefined)?(1):(0);
				var isNoble = (element["title"] !== undefined && smallFolk.indexOf(element["title"])== -1)?1:0;
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

				var popularity = ((element["pageRank"] - minRank)/(maxRank - minRank)).toFixed(2);
				var isPopular = (popularity >= 0.34)?(1):(0);

				var numDeadRelations = (allRel[element["name"]] !== undefined)?(allRel[element["name"]]):(0);
				var boolDeadRelations = (allRel[element["name"]] !== undefined)?(1):(0);
				
				var isAlive = (deadCharacters.indexOf(element["name"]) == -1)?(1):(0);			  
			
				arff += ','+isMarried+','+isNoble+','+age+','+numDeadRelations+','+boolDeadRelations+','+isPopular+','+popularity+','+isAlive;

				arff += '\n';	
			  }
			});
			fulfill(arff);
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
		+"@ATTRIBUTE book1 NUMERIC\n"
		+"@ATTRIBUTE book2 NUMERIC\n"
		+"@ATTRIBUTE book3 NUMERIC\n"
		+"@ATTRIBUTE book4 NUMERIC\n"
		+"@ATTRIBUTE book5 NUMERIC\n"
		+"@ATTRIBUTE placeOfLastVisit {"+allReg+"}\n"
		+"@ATTRIBUTE isAliveMother NUMERIC\n"
		+"@ATTRIBUTE isAliveFather NUMERIC\n"
		+"@ATTRIBUTE isAliveHeir NUMERIC\n"
		+"@ATTRIBUTE isAliveSpouse NUMERIC\n"
		+"@ATTRIBUTE isAliveAllegiance NUMERIC\n"
		+"@ATTRIBUTE isMarried NUMERIC\n"
		+"@ATTRIBUTE isNoble NUMERIC \n"
		+"@ATTRIBUTE age NUMERIC\n"
		+"@ATTRIBUTE numDeadRelations NUMERIC\n"
		+"@ATTRIBUTE boolDeadRelations NUMERIC\n"
		+"@ATTRIBUTE isPopular NUMERIC\n"
		+"@ATTRIBUTE popularity NUMERIC\n"
		+"@ATTRIBUTE isAlive {1,0}\n"
}

function filter(name){
	return true && (name !== undefined) && (name.search(/House/) !== 0);
}

function foo(data){
	return data.toString().replace(/"/g,"'");
}