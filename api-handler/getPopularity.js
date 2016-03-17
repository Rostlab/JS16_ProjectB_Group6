const fs = require("fs");

function getPopularity(charactername,callback){
	var filename = charactername.replace(" ","_")
	fs.access("../pagerank/"+filename+"_data", fs.R_OK, function(err){
		if(!err){
			fs.readFile("../pagerank/"+filename+"_data","utf8",function(err,data){
				if(!err){
					var score = data.slice(data.indexOf("'score': ")+9,data.indexOf(","));
					callback(true,score);
				}else{
					callback(false);
				}
			});
		}else{
			callback(false);
		}
	});
}

module.exports = {
	getPopularity : getPopularity
};

getPopularity("Addam Frey",function(success,result){
	if(success){
		console.log(result);
	}else{
		console.log(success);
	}
});

