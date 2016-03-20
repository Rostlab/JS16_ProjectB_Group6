const fs = require("fs");
const promise = require("promise")

var allChars = new Object;

/*
	callback(success,data,err)
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
							allChars[charname] = score;
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
				Object.keys(allChars).map(function(element){
					allChars[element] = (allChars[element] - minscore)/(maxscore - minscore);
				});
				callback(true,allChars);
			}).catch(function(err){
				console.log(err.stack);
				callback(false);
			});
			
		}else{
			callback(false,undefined,err);
		}
	});
}

module.exports = {
	getPopularity : normalizePopularity
};


