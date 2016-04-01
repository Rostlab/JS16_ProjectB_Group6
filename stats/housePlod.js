var csv = require('node-csv');
lines = 0;
houseHelp = {};
csv.each('characters.csv').on('data', function(data) {
	var house = data[14];
	var plod = parseFloat(data[4].replace(',','.'));
	if(!house){
		return;
	}
	if(house in houseHelp){
		houseHelp[house][0]++;
		houseHelp[house][1] += plod;		 
	} else {
		houseHelp[house] = [1,plod];
	}
	
}).on('end', function() {
	housePlod = [];
	for(var house in houseHelp){
		housePlod.push({House:house,PLOD:(Math.round(1000*(houseHelp[house][1]/houseHelp[house][0])))/1000});
	}
	housePlod.sort(function(a, b) {
    	return b.PLOD - a.PLOD;
	});
  console.log(JSON.stringify(housePlod));
})