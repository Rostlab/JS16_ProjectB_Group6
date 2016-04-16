var weka_pred = JSON.parse(require('fs').readFileSync('weka_pred.json', 'utf8'));
var weka_attr_score = JSON.parse(require('fs').readFileSync('weka_rank.json', 'utf8'));

var char_plod ={};
var attr_score ={};

for (var i=0; i < weka_pred.length; i++) {
    char_plod[weka_pred[i].name] = weka_pred[i].plod;
}
for (var i=0; i < weka_attr_score.length; i++) {
    attr_score[weka_attr_score[i].feature] = weka_attr_score[i].reliefFScore;
}
console.log(char_plod)
console.log(attr_score)

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
        if (attr_score.hasOwnProperty(attr)) {
            return attr_score[attr];
        }
    },

    getAllAttrRank: function(){
        return attr_score;
    },
}
