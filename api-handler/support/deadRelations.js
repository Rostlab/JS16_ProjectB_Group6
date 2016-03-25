const scraper = require("./gotWikiaScrape");

// the below character names have difference in the got wikia and awoiaf.
var diffInWikis = {
    "Aelinor Penrose": 4,
    "Alannys Harlaw": 4,
    "Asha Greyjoy": 5,
    "Baelor I Targaryen": 9,
    "Cassana Estermont": 2,
    "Catelyn Tully": 8,
    "Lysa Tully": 5,
    "Maegor I Targaryen": 5,
    "Maekar Targaryen": 5,
    "Minisa Whent": 7,
    "Robert Arryn": 7
};

/**
*Gets number of dead realtives for characters
*@param {callback} callback
*/
function getNumRelatedDead(callback){
    scraper.getDeadRelations(function(success,data,err){
        if(success){
            var distinct = new Object;
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    var relationarray = data[property];
                    if(relationarray == []){
                        console.log(relationarray);
                    }
                    relationarray.forEach(function(element,index){
                        if(distinct[element] === undefined){
                            distinct[element] = 1;
                        }else{
                            distinct[element] += 1;
                        }
                    });
                }
            }
            for (var property in diffInWikis) {
                if (distinct.hasOwnProperty(property)) {
                    distinct[property] = diffInWikis[property];
                }
            }
            callback(true,distinct);
        }else{
            callback(false,undefined,err);
        }
    });
}
/**
*Callback used by getNumRelatedDead
*@param {Boolean} success
*@param {Array} result
*@param {Error} err
*/

module.exports = {
    getNumRelatedDead : getNumRelatedDead
};
