var book1 = ["a game of thrones(pov)","a game of thrones(appear","a game of thrones(mention","a game of thrones"]
var book2 = ["a clash of kings(pov)","a clash of kings(appear","a clash of kings(mention","a clash of kings"]
var book3 = ["a storm of swords(pov)","a storm of swords(appear","a storm of swords(mention","a storm of swords"]
var book4 = ["a feast for crows(pov)","a feast for crows(appear","a feast for crows(mention","a feast for crows"]
var book5 = ["a dance with dragons(pov)","a dance with dragons(appear","a dance with dragons(mention","a dance with dragons"]

// The index of bookMentions array corresponds to the 5 books and the value represents the extent of mention in each book
// not mentioned - 0(default), bookname(pov) - 1, bookname(appear) - 2, bookname(mention) - 3, bookname - 4
var bookMentions = new Array()

module.exports ={
    convert_books: function(bookstring){

        var bookMentions = [0,0,0,0,0];
        for(var i=0;i<book1.length;i++) {
            if (bookstring.toLowerCase().indexOf(book1[i]) >= 0) {
                bookMentions[0] = 1;
                break;
            }
        }
        for(var i=0;i<book2.length;i++) {
            if (bookstring.toLowerCase().indexOf(book2[i]) >= 0) {
                bookMentions[1] = 1;
                break;
            }
        }
        for(var i=0;i<book3.length;i++) {
            if (bookstring.toLowerCase().indexOf(book3[i]) >= 0) {
                bookMentions[2] = 1;
                break;
            }
        }
        for(var i=0;i<book4.length;i++) {
            if (bookstring.toLowerCase().indexOf(book4[i]) >= 0) {
                bookMentions[3] = 1;
                break;
            }
        }
        for(var i=0;i<book5.length;i++) {
            if (bookstring.toLowerCase().indexOf(book5[i]) >= 0) {
                bookMentions[4] = 1;
                break;
            }
        }
        return bookMentions;

    },

}