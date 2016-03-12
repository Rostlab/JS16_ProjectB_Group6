module.exports = {
        getAllHouses: function(json) {
            json = JSON.parse(json);
            var houses = [];
            var house = '?';
            json.forEach(function(element, index) {
                if (element["name"] != undefined) {
                    house = element["name"];
                    house = house.replace("House ", '');
                    houses.push(house);
                }

            });
            //*****
            return houses.sort();
        }
}