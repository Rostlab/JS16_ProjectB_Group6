var wikiCharRelations = JSON.parse(require('fs').readFileSync('wiki_char_relations.json', 'utf8'));
var charRelatedToDead = JSON.parse(require('fs').readFileSync('char_related_to_death.json', 'utf8'));

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
for (var property in diffInWikis) {
    if (charRelatedToDead.hasOwnProperty(property)) {
        charRelatedToDead[property] = diffInWikis[property];
    }
}

console.log(charRelatedToDead);
fs.writeFileSync('char_dead_relations.json', JSON.stringify(charRelatedToDead, null, 2) , 'utf-8');