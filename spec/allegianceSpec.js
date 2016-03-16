var allegiance = require("../weka/allegiance.js");
var aegon = require("./mockChars.js");

describe("Allegiance converter", function() {
    it("should find allegiance of Aegon", function() {
        expect(allegiance.getAllegiance(aegon.Allegiance)).toEqual(
            "Targaryen");
    });

    it("should return '?' indicating failure", function() {
        expect(allegiance.getAllegiance("notACharacter")).toEqual(
            "?");
    });
});
