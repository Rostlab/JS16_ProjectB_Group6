var wikiCharRelations = JSON.parse(require('fs').readFileSync('wiki_char_relations.json', 'utf8'));
var charRelatedToDead = JSON.parse(require('fs').readFileSync('char_related_to_death.json', 'utf8'));
const fs = require("fs");
for (var property in wikiCharRelations) {
    if (wikiCharRelations.hasOwnProperty(property)) {
        relationarray = wikiCharRelations[property];
        distinct = [];
        for (var i=0;i<relationarray.length;i++) {
            if (distinct.indexOf(relationarray[i]) == -1) {
                distinct.push(relationarray[i]);
            }
        }
        wikiCharRelations[property] = distinct;
    }
}

for (var property in wikiCharRelations) {
    if (wikiCharRelations.hasOwnProperty(property)) {
        relationarray = wikiCharRelations[property];
        for (var i=0;i<relationarray.length;i++) {
            if (charRelatedToDead.hasOwnProperty(relationarray[i])) {
                charRelatedToDead[relationarray[i]] +=1;
            }
        }
    }
}
console.log(charRelatedToDead);
fs.writeFileSync('char_dead_relations.json', JSON.stringify(charRelatedToDead, null, 2) , 'utf-8');