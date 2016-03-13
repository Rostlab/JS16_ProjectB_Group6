var svm = require("node-svm");
var dataAccess = require("../api-handler/dataAccess");

createSVM();

var chars = undefined;
var titles = undefined;
var cultures = undefined;
var houses = undefined;

function createSVM(){
    dataAccess.characters(initializeChars);
}

function initializeChars(res){
    chars = res;
    dataAccess.titles(initializeTitles);    
}

function initializeTitles(res){
    titles = res;
    dataAccess.cultures(initializeCultures);
}

function initializeCultures(res){
    cultures = res;
    dataAccess.houses(initializeHouses);
}

function initializeHouses(res){
    houses = res;    
    initializeSVM();
}


function initializeSVM(){
    
    var data = [];
    var names = [];
    
	chars.forEach(function(element,index){
    	var isAlive = (element["dateOfDeath"] == undefined && element["placeOfDeath"] == undefined)?(1):(0);
    	var title = titles.indexOf(element["title"])+1;
    	var male = (element["male"])?(1):(0);
    	var culture = cultures.indexOf(element["culture"])+1;
    	var house = houses.indexOf(element["house"])+1;
    	
    	var row = [[title,male,culture,house],isAlive];
    	data.push(row);
	    names.push(element["name"]);
	    
	});
	console.log("test");
	// initialize a new predictor
    var clf = new svm.SVM({
        svmType: 'C_SVC',
        c: [0.03125, 0.125, 0.5, 2], 
        nu:	[0.01,0.125,0.5,1],
    
        // kernels parameters
        kernelType: 'POLY', 
        degree:	[2,3,4],
        gamma: [0.03125, 0.125, 0.5, 2, 8],
        r:	[0.125,0.5,0,1],
    
        // training options
        kFold: 10,               
        normalize: true,        
        reduce: true,           
        retainedVariance: 0.99, 
        eps: 1e-3,              
        cacheSize: 200,               
        shrinking : true,     
        probability : true     
    });
    
    clf.train(data).progress(function(rate){
        console.log(parseFloat(rate).toFixed(2)+"%");
    }).done(function () {
        // predict things
        data.forEach(function(ex,index){
            var prediction = clf.predictSync(ex[0]);
            console.log('%s => %d', names[index], prediction);
        });
    });
    
}

