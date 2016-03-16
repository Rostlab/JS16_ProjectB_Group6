var titleConv = require("../weka/title.js");
var aegon = require("./mockChars.js");

describe("Title converter", function() {
    it("should return '?' on failure", function() {
        expect(titleConv.convert_title("notATitle")).toEqual(
            "?");
    });
    it("should find title of Aegon", function() {
        expect(titleConv.convert_title(aegon.Title)).toEqual(
            '"King"');
    });
});
