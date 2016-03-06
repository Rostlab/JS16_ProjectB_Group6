module.exports = {
        getAllAllegiances: function(json) {
            var allegiances = [];
            var house = '?';
            json.forEach(function(element, index) {
                if (element["name"] != undefined) {
                    house = element["name"];
                    house = house.replace("House ", '');
                    allegiances.push(house);
                } else {
                    allegiances.push('?');
                }

            });
            allegiances = json.parse(allegiances);
            return allegiances;
        }
}