var cultureConv = require("../culture.js");
var aegon = require("./mockChars.js");

describe("Culture converter", function() {
    it("should return '?' on failure", function() {
        expect(cultureConv.convert_culture("notACulture")).toEqual(
            "?");
    });
    it("should find culture of Aegon", function() {
        expect(cultureConv.convert_culture(aegon.Culture)).toEqual(
            '"valyrian"');
    });
});
