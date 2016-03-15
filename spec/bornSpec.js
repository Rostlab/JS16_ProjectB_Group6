var bornConv = require("../weka/born.js");
var aegon = require("./mockChars.js");

describe("Born converter", function() {
    it("should return a number", function() {
        expect(bornConv.convert_born(aegon.Born)).toEqual(
            jasmine.any(Number));
    });
    it("should find year born of Aegon", function() {
        expect(bornConv.convert_born(aegon.Born)).toEqual(660);
    });
});
