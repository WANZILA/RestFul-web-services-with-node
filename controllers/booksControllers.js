function booksController(Book){
  function post(req, res){
    const book = new Book(req.body);

    //make sure that the tests are passing
    if(!req.body.title){
      res.status(400);
      return res.send('Title is required');
    }

    book.save();
    res.status(201)
    return res.json(book);
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      //adding hypermedia
      const returnBooks = books.map((book) => {
        //taking a copy of a book and strip out all the mongoose things
        const newBook = book.toJSON();
        //adding an object called links just an empty array
        newBook.links = {};
        //adding links to newBook using self coz it doesn't exist
        newBook.links.self =`http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }

  return {post, get};
}

module.exports = booksController;