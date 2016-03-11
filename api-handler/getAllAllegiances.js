module.exports = {
        getAllAllegiances: function(json) {
            json = JSON.parse(json);
            var allegiances = [];
            var house = '?';
            json.forEach(function(element, index) {
                if (element["name"] != undefined) {
                    house = element["name"];
                    house = house.replace("House ", '');
                    allegiances.push(house);
                }

            });
            return allegiances;
        }
}