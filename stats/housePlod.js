var csv = require('node-csv');
lines = 0;
houseHelp = {};
csv.each('characters.csv').on('data', function(data) {
	var house = data[14];
	var houseName = house.match(/House ([^ ]+)/);
	var isAlive = data[32];
	var age = data[27];
	if(houseName){
		house = houseName[0];
	}
	if(isAlive != 0){
	var plod = parseFloat(data[4].replace(',','.'));
	} else if(age != undefined && age < 100){
	plod = 1;
	} else {
		return;
	}
	var isPopular = data[30];	
	if(!house){
		return;
	}
	if(house in houseHelp){
		houseHelp[house][0]++;
		houseHelp[house][1] += plod;
		houseHelp[house][2] += isPopular;		 
	} else {
		houseHelp[house] = [1,plod,isPopular];
	}
	
}).on('end', function() {
	housePlod = [];
	for(var house in houseHelp){
	 	if(houseHelp[house][2] > 0){
		housePlod.push({House:house,plod:(Math.round(1000*(houseHelp[house][1]/houseHelp[house][0])))/1000});
		}
	}
	housePlod.sort(function(a, b) {
    	return b.plod - a.plod;
	});
  console.log(JSON.stringify(housePlod));
})