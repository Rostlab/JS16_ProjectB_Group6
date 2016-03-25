module.exports = {
    /**
    *Gets all unique houses
    *@param {JSON} json
    *@return {Array} houses
    */
    getAllHouses: function(json) {
        json = JSON.parse(json);
        var houses = [];
        var house = '?';
        json.forEach(function(element, index) {
            if (element["name"] != undefined) {
                house = element["name"];
                if (houses.indexOf('"'+house+'"') == -1) {
                    houses.push('"'+house+'"');
                }
            }

        });
        return houses.sort();
    }
}