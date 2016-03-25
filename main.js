var weka_pred = JSON.parse(require('fs').readFileSync('weka_pred.json', 'utf8'));
var weka_rank = JSON.parse(require('fs').readFileSync('weka_rank.json', 'utf8'));

var char_plod ={};
var attr_rank ={};

for (var i=0; i < weka_pred.length; i++) {
    char_plod[weka_pred[i].name] = weka_pred[i].plod;
}
for (var i=0; i < weka_rank.length; i++) {
    attr_rank[weka_rank[i].name] = weka_rank[i].ranking;
}

module.exports={
    getCharPLOD: function(char_name){
        if (char_plod.hasOwnProperty(char_name)) {
            return char_plod[char_name];
        }
    },

    getAllCharPLOD: function(){
        return char_plod;
    },

    getAttrRank: function(attr){
        if (attr_rank.hasOwnProperty(attr)) {
            return attr_rank[attr];
        }
    },

    getAllAttrRank: function(){
        return attr_rank;
    },
}
