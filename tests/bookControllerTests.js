const should = require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksControllers');

describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post',() =>{
        const Book = function (book) { this.save = () =>{}};

        const req = {
          body: {
            author: 'Jon'
          }
        };

        const res={
          status: sinon.spy(),
          send: sinon.spy(),
          json: sinon.spy()
        };

        //instance of the bookController
        const controller = bookController(Book);
        controller.post(req, res);

          //shows us that its a bad request sent
          //args means or says this is an array of each time the
          //fn and that has args each time its called 
        //this warns us with error message with details
        res.status.calledWith(400).should.equal(true,`Bad Status ${res.status.args[0][0]}`);
        //checks on send
        res.send.calledWith('Title is required').should.equal(true);
      });
  });
});