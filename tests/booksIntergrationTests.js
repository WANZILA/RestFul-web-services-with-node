 require('should');

 const request = require('supertest');
 //pull it in so that we leverage it just like we are any where
  //else
 const mongoose = require('mongoose');

 //creating a dummy db
 process.env.ENV = 'Tests';

 //supertests needs app to go through the motions and execute
  //it.
 const app = require('../app.js');

 const Book = mongoose.model('Book');
 //just for supertest agent runs the app
 const agent = request.agent(app);

describe('Book CRUD TEst',() =>{
  //(done) is a callback
  it('should allow a book to be posted and return read and _it',(done) =>{
   //create a package that we expect
   const bookPost = { title: 'My Book', author: 'Jon', genre:'Fiction'};
   
   //open Mocha to add things to db
   //sends a post it doesn't know how or care how it works
   agent.post('/api/books')
    .send(bookPost)
    .expect(200)
    .end((err, results) => {
      //dig thru all the results that come back and try not makes your test
        //to fail
     // console.log(results);
      
       //creating a failing test first
    //  results.body.read.should.not.equal(false);
      results.body.should.have.property('_id');
      done();
    });
  });
  // clean up the db
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });  

  //close every thing
  after((done) =>{
    mongoose.connection.close();
    app.server.close(done());
  });

});