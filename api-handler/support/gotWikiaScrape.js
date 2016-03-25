"use strict";
const config = require("../config");
const request = require("request");
const env = require("jsdom").env;
const fs = require("fs");
const cheerio = require('cheerio');
const promise = require("promise");
const deadCharacters = ["Viserys II Targaryen","Tytos Lannister","Tywin Lannister","Valarr Targaryen","Visenya Targaryen","Viserys Targaryen","Viserys I Targaryen","Wilbert","Wendel Manderly","Will","Willam Dustin","Willam Wells","Willem Darry","Willam Stark","Willem Lannister","Willow Witch-eye","Woth","Wyl (guard)","Wyl Waynwood","Yellow Dick","Ygritte","Yoren","Young Henly","Joffrey Baratheon","Jon Arryn","Laenor Velaryon","Leobald Tallhart","Maegor I Targaryen","Naerys Targaryen","Quellon Greyjoy","Quentyn Ball","Quentyn Blackwood","Quort","Qyle","Quentyn Martell","Rafford","Ralf Kenning","Rast","Raymun Redbeard","Raymun Darry","Raynald Westerling","Red Alyn of the Rosewood","Red Rolfe","Reek","Renly Baratheon","Rhaegar Frey","Rhaegel Targaryen","Rhae Targaryen","Rhaegar Targaryen","Rhaego","Rhaella Targaryen","Rhaena Targaryen (daughter of Daemon)","Rhaena Targaryen (daughter of Aegon III)","Rhaenys Targaryen","Rhea Royce","Rhaenys Targaryen (daughter of Rhaegar)","Rhaenys Targaryen (daughter of Aemon)","Richard Farrow","Rickard Thorne","Rickard Karstark","Rickard Stark","Robar Royce","Robert Brax","Robb Stark","Robin Flint","Rodrik Cassel","Rodrik Greyjoy","Roger of Pennytree","Rohanne Webber","Rorge","Rowan","Rossart","Runciter","Rupert Brax","Ryam Redwyne","Ryles","Ryman Frey","Saera Targaryen","Sallor","Sandor Clegane","Sawane Botley","Senelle","Shae","Shagwell","Shiera Seastar","Shella Whent","Simon Toyne","Small Paul","Softfoot","Spotted Pate of Maidenpool","Squint","Squirrel","Stalwart Shield","Lord Staunton","Stafford Lannister","Steffon Baratheon","Steffon Darklyn","Stiv","Stone Thumbs","Styr","Stevron Frey","Sylas","Symon Silver Tongue","Syrio Forel","Symond Frey","Tanda Stokeworth","Terrence Toyne","Theo Wull","Thistle","Thoren Smallwood","Timeon","Todric","Tion Frey","Tomard","Tommard Heddle","Torwynd","Tothmure","Torrhen Karstark","Tregar","Tristifer IV Mudd","Tybolt Lannister","Tyland Lannister","Tyrek Lannister","Tytos Frey","Ulf son of Umar","Ulf the Ill","Ulf the White","Uthor Underleaf","Utt","Varamyr","Vaemond Velaryon","Vardis Egen","Varly","Vargo Hoat","Vayon Poole","Vickon Greyjoy","Viserys Plumm","Walder Frey (son of Merrett)","Wallen","Walys Flowers","Watt","Waymar Royce","Weese","Addam Osgrey","Aegon Blackfyre","Addam Velaryon","Aegon Frey (son of Stevron)","Aegon I Targaryen","Aegon II Targaryen","Aegon IV Targaryen","Aegon V Targaryen","Aegon III Targaryen","Aegon Targaryen (son of Jaehaerys I)","Aegon Targaryen (son of Aenys I)","Aegor Rivers","Aegon Targaryen (son of Rhaegar)","Aemma Arryn","Aemon Blackfyre","Aemond Targaryen","Aenys Frey","Aerion Targaryen","Aenys I Targaryen","Aggar","Aerys I Targaryen","Aladale Wynch","Aerys II Targaryen","Alebelly","Alequo Adarys","Alfyn","All-for-Joffrey","Alester Florent","Allar Deem","Allard Seaworth","Alicent Hightower","Alyn","Alyn Cockshaw","Alyn Velaryon","Alysanne Osgrey","Alyssa Blackwood","Amarei Crakehall","Alysanne Targaryen","Ambrose Butterwell","Amory Lorch","Andrey Charlton","Andros Brax","Arlan of Pennytree","Aron Santagar","Arthur Dayne","Arys Oakheart","Ashara Dayne","Baelon Targaryen (son of Viserys I)","Baelor Blacktyde","Baela Targaryen","Balman Byrch","Baelor Targaryen (son of Daeron II)","Baelor I Targaryen","Bannen","Barba Bracken","Balon Greyjoy","Barra","Barth","Ben Bushy","Benfred Tallhart","Benfrey Frey","Beric Dondarrion","Bethany Bracken","Bethany Rosby","Biter","Brandon Stark","Brown Bernarr","Bryan Fossoway","Bryen Caron","Bryce Caron","Bryen Farring","Burton Crakehall","Byam Flint","Brynden Rivers","Lord Cafferen","Craghas Drahar","Cassana Estermont","Cayn","Cedric Payne","Catelyn Stark","Chayle","Chett","Chiggen","Chiswyck","Clarent Crakehall","Cleon","Cley Cerwyn","Cleos Frey","Cletus Yronwood","Cohollo","Clubfoot Karl","Conn","Cortnay Penrose","Cragorn","Craster","Corlys Velaryon","Cressen","Criston Cole","Cregan Stark","Cyrenna Swann","Dacey Mormont","Daella Targaryen (daughter of Jaehaerys I)","Daella Targaryen (daughter of Maekar I)","Daemon I Blackfyre","Daemon II Blackfyre","Daemon Targaryen","Daenerys Targaryen (daughter of Aegon IV)","Daeron I Targaryen","Daena Targaryen","Daeron Targaryen (son of Viserys I)","Daeron Targaryen (son of Maekar I)","Daeron II Targaryen","Dalbridge","Dalla","Dale Seaworth","Damon Lannister (lord)","Dareon","Daryn Hornwood","Del","Delp","Denys Arryn","Desmond","Dick Crabb","Dick Follard","Dirk","Dobber","Domeric Bolton","Donal Noye","Donella Hornwood","Donnel Locke","Dontos Hollard","Doreah","Dormund","Dornish Dilly","Drennan","Drogo","Dykk Harlaw","Easy","Ebben","Duncan Targaryen","Eddard Karstark","Edwyd Fossoway","Eddard Stark","Edwyn Osgrey","Elbert Arryn","Elaena Targaryen","Elia Martell","Elwood","Elza","Emmon Cuy","Endrew Tarth","Eon Hunter","Eroeh","Ethan Glover","Falena Stokeworth","Farlen","Falyse Stokeworth","Fogo","Frenya","Gared","Garth of Greenaway","Garth Greyfeather","Garth of Oldtown","Gawen Swann","Gelmarr","Gawen Wylde","Gerardys","Gerion Lannister","Gevin Harlaw","Gerold Lannister","Gerold Hightower","Gladden Wylde","Glendon Flowers","Gormon Peake","Grazdan","Grazdan mo Ullhor","Gregor Clegane","Grubbs","Groleo","Guncer Sunglass","Guyard Morrigen","Gwayne Hightower","Gynir","Gyles Rosby","Haggo","Hairy Hal","Hake","Hali","Hamish the Harper","Halys Hornwood","Harghaz","Harlan Grandison","Harlen Tyrell","Harma","Harra","Harrag Sharp","Harren Hoare","Harren Botley","Harrold Westerling","Harsley","Harwood Fell","Harwin Strong","Hazzea","Helicent Uffering","Helman Tallhart","Helaena Targaryen","Hendry Bracken","Heward","Holly","Hoster Tully","Hubard Rambton","Hugh","Hugh Hammer","Hullen","Humfrey Beesbury","Humfrey Hardyng","Iggo","Jacelyn Bywater","Imry Florent","Jafer Flowers","Jaehaerys Targaryen (son of Aegon II)","Jaehaera Targaryen","Jaehaerys II Targaryen","Jaehaerys I Targaryen","Jaremy Rykker","Jarl","Jared Frey","Janos Slynt","Jason Lannister","Jasper Wylde","Jate","Jeyne Arryn","Jeor Mormont","Jeyne Lothston","Jeyne Westerling (wife of Maegor I)","Jeyne Waters","Joffrey Caswell","Joanna Lannister","Joffrey Lonmouth","Jon Umber (Smalljon)","Jon Waters","Jonothor Darry","Jory Cassel","Jyck","Kaeth","Kedry","Kenned","Khrazz","Koss","Kromm","Kurleket","Kevan Lannister","Kraznys mo Nakloz","Kurz","Kyle (brotherhood)","Kyra","Laena Velaryon","Lark","Larys Strong","Lem (Standfast)","Leo Lefford","Lharys","Lewyn Martell","Lorent Marbrand","Lorimer","Lorren","Lothar Mallery","Lucan","Lucas Inchfield","Lucas Blackwood","Lucas Roote","Luton","Luwin","Lyman Beesbury","Lyman Darry","Lyanna Stark","Lyonel Bentley","Lyonel Baratheon","Lyonel Tyrell (lord)","Lyonel Strong","Lysa Arryn","Maerie (Whore)","Mag Mar Tun Doh Weg","Maelor Targaryen","Mallador Locke","Mandon Moore","Maric Seaworth","Marillion","Mark Ryswell","Marq Grafton","Maron Greyjoy","Martyn Cassel","Matarys Targaryen","Maslyn","Masha Heddle","Mawney","Matthos Seaworth","Medgar Tully","Medger Cerwyn","Melara Hetherspoon","Melissa Blackwood","Mero","Mikken","Merrett Frey","Mirri Maz Duur","Mohor","Monford Velaryon","Mordane","Morrec","Mors Martell (brother of Doran)","Muttering Bill","Mycah","Murmison","Myles (squire)","Myles Mooton","Myrtle","Nettles","Ogo","Old Henly","Oberyn Martell","Ollo Lophand","Olyvar Oakheart","Orbert Caswell","Ordello","Orell","Ormond (knight)","Orphan Oss","Orys Baratheon","Ossifer Plumm","Oswell Whent","Othor","Ottyn Wythers","Owen Norrey","Oznak zo Pahl","Otto Hightower","Pate (Pinchbottom)","Pate of the Blue Fork","Pate (Standfast)","Petyr Frey","Polliver","Poul Pemford","Poxy Tym","Praed","Prendahl na Ghezn","Preston Greenfield","Pyg","Pycelle","Lord Commander Qorgyle","Qarlton Chelsted","Qhorin Halfhand","Qotho","Quaro"]
const rootUrl = config.urls.wiki;
var characterLinks = [];
var charRelations = new Object;
var promises = [];

/**
*Gets all dead realtives for characters
*@param {callback} callback
*/
function getDeadRelations(callback){
    for (var i=0;i< deadCharacters.length;i++) {
         var deadchar = deadCharacters[i];
         characterLinks.push(rootUrl + deadCharacters[i].replace(/[\ ]/g, '_'));
    }

    for (var i = 0; i < deadCharacters.length ; i++) {
        var char = "";
        promises.push(new promise(function(fulfill,reject){
            request(characterLinks[i], function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    $('h2.pi-item.pi-item-spacing.pi-title').each(function(i, element){
                        char = $(this).text();
                    });
                    $('h3.pi-data-label.pi-secondary-font:contains(Family)').each(function(i, element){
                        var a = $(this).next().children();
                        a.map(function(idx, el) {
                            if(el.name === "a"){
                                var relations = (el.attribs.title);
                                if(charRelations[char] === undefined){
                                    charRelations[char] = [];
                                }
                                if(charRelations[char].indexOf(relations) === -1){
                                    charRelations[char].push(relations);
                                }
                            }
                        });
                    });
                    fulfill(true);
                }else{
                    fulfill(false);
                }
            });
        }));

    }

    promise.all(promises).then(function(values){
        callback(true,charRelations);
    }).catch(function(error){
        callback(false,undefined,error);
    });
}
/**
*Callback used by getDeadRelations
*@param {Boolean} success
*@param {Object} result
*@param {Error} err
*/

module.exports = {
    getDeadRelations : getDeadRelations
}