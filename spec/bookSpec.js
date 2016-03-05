var bookConv = require("../books.js");

describe("Book converter", function() {
    it("should return an array", function() {
        expect(Array.isArray(bookConv.convert_books("dummy")))
            .toBe(
                true);
    });
});
