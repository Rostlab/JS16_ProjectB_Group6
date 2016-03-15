var bookConv = require("../weka/books.js");
var aegon = require("./mockChars.js");

describe("Book converter", function() {
    it("should return an array", function() {
        expect(Array.isArray(bookConv.convert_books("dummy")))
            .toBe(
                true);
    });
    it("should find mentions of Aegon", function() {
        expect(bookConv.convert_books(aegon["Book(s)"])).toEqual(
            [1, 1, 1, 1, 1]);
    });
});
