var alltitles = ["Iron King","King in the North","Hand of the King","King","Princess","Prince",
    "Lord Commander","Queen","Lady","Knight","Commander","Captain","Grand Maester","Archmaester","Maester",
    "Master","Admiral","Lord","Sword","Steward","Cupbearer","Septa","Septon","Wisdom","Shield",
    "Khal","Bloodrider","Castellan","Ser"]; //only titles with 5 or more members are used

module.exports ={
    convert_title: function(titlestring){
        //return "present";
        for(var i=0;i<alltitles.length;i++){
            if(titlestring.indexOf(alltitles[i]) >= 0){
                return '"'+alltitles[i]+'"';
            }
        }
        return "?";
    },

    alltitles: function(){
        return '"'+alltitles.join('" , "')+'"';
    }

}
