const fs = require("fs");
const promise = require("promise")

var allChars = [];

/*
	callback(success,data,err)
*/
function getPopularity(charactername,callback){
	if(allChars.length === 0){
		normalizePopularity(function(success,err){
			if(success){
				getPopularity(charactername,callback);
			}else{
				callback(false,undefined,err);
			}
		});
	}else{
		var scoreObj = allChars.filter(function(character){
			return character.name === charactername;
		})[0]; 
		if(scoreObj !== undefined){
			callback(true,scoreObj.score);
		}else{
			callback(false,undefined,"This character has no popularity");
		}
	}
}

/*
	callback(success,err)
*/
function normalizePopularity(callback){
	fs.readdir("../pagerank",function(err,files){
		if(!err){
			var promises = [];
			files.forEach(function(element,index){
				promises.push(new promise(function(fullfil,reject){
					fs.readFile("../pagerank/"+element,"utf8",function(err,data){
						if(!err){
							var charname = element.substr(0,element.indexOf("_data")).replace(/_/g," ");
							var score = data.slice(data.indexOf("'score': ")+9,data.indexOf(",")); 
							var currentchar ={"name":charname,"score":score};
							allChars.push(currentchar);
							fullfil(score);
						}else{
							reject(err);
						}
					});

				}));
			});
			promise.all(promises).then(function(values){
				var maxscore = Math.max.apply(null, values);
				var minscore = Math.min.apply(null,values);
				allChars.map(function(element){
					element.score = (element.score - minscore)/(maxscore - minscore);
				});
				callback(true);
			});
			
		}else{
			callback(false,err);
		}
	});
}

/*
	callback(success,data,err)
*/

function isPopular(charactername,callback){
	if(allChars.length === 0){
		normalizePopularity(function(success,err){
			if(success){
				isPopular(charactername,callback);
			}else{
				callback(false,undefined,err);
			}
		});
	}else{
		var scoreObj = allChars.filter(function(character){
			return character.name === charactername;
		})[0]; 
		if(scoreObj !== undefined){
			var popular = scoreObj.score > 0.34;
			callback(true,popular);
		}else{
			callback(false,undefined,"This character has no popularity");
		}
	}	
}

module.exports = {
	getPopularity : getPopularity,
	isPopular:isPopular
};


