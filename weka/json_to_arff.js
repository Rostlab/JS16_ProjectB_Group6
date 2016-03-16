const fs = require("fs");
const cultureconv = require("./culture");
const bornconv = require("./born");
const allegianceconv = require("./allegiance");
const titleconv = require("./title");
const booksconv = require("./books");
fs.readFile('charachters_details.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    convertToARFF(data.toString());
});
 
function convertToARFF(json){
	json = JSON.parse(json);
	var arff = "@DATA\n";
	var cultures = new Array();
	var houses = new Array();
	json.forEach(function(element,index){
		var born = "?";
		var isAlive= '"dead"';

		if(element["Born"] !== undefined){
			born = bornconv.convert_born(filterData(element["Born"]));
			//console.log(born);
		} else if (element["Born in"] !== undefined){
			born = bornconv.convert_born(filterData(element["Born in"]));
			//console.log(born);
		}

		if(element["Died"] == undefined && element["Died in"] == undefined) {
			isAlive = '"alive"';
		}

		var name = (element["name"] !== undefined)?('"'+filterData(element["name"])+'"'):"?";
		var culture = (element["Culture"] !== undefined)?(cultureconv.convert_culture(filterData(element["Culture"]))):"?";
		//console.log(culture);
		var allegiance = (element["Allegiance"] !== undefined)?(allegianceconv.getAllegiance(filterData(element["Allegiance"]))):"?";
		//houses.push(allegiance);
		var title = (element["Title"] !== undefined)?(titleconv.convert_title(element["Title"])):((element["Other Titles"] !== undefined) && (element["Title"] == undefined))?(titleconv.convert_title(element["Other Titles"])):"?";
		//console.log(title);
		var books = (element["Book(s)"] !== undefined)?(booksconv.convert_books(element["Book(s)"])):"0,0,0,0,0";

		arff += name+','+culture+','+allegiance+','+born+','+title+','+books.toString()+','+isAlive+'\n';
	});

	//var header = "@RELATION characters\n@ATTRIBUTE name  STRING\n@ATTRIBUTE culture  {"+cultureconv.allcultures()+"}\n@ATTRIBUTE allegiance  {"+allegianceconv.allAllegiances()+"}\n@ATTRIBUTE born  NUMERIC\n@ATTRIBUTE title  {"+titleconv.alltitles()+"}\n@ATTRIBUTE isAlive {'dead','alive'}\n";
	var header = "@RELATION characters\n@ATTRIBUTE name  STRING\n@ATTRIBUTE culture  {"+cultureconv.allcultures()+"}\n@ATTRIBUTE allegiance  {"+allegianceconv.allAllegiances()+"}\n@ATTRIBUTE born  NUMERIC\n@ATTRIBUTE title  {"+titleconv.alltitles()+"}\n@ATTRIBUTE book1 NUMERIC\n@ATTRIBUTE book2 NUMERIC\n@ATTRIBUTE book3 NUMERIC\n@ATTRIBUTE book4 NUMERIC\n@ATTRIBUTE book5 NUMERIC\n@ATTRIBUTE isAlive {'dead','alive'}\n";


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

