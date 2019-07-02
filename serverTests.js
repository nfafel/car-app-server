//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Cars = require('./cars.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./nodeVersion');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Cars', () => {
    beforeEach((done) => { //Before each test we empty the database
        Cars.deleteMany({}, (err) => { 
           done();           
        });        
    });
    /*
    * Test the /GET route
    */
    describe('/GET car', () => {
        it('it should GET all the cars', (done) => {
            chai.request(server)
                .get('/cars')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.cars.should.be.a('array');
                    res.body.cars.length.should.be.eql(0);
                done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST car', () => {
        it('it should not POST a car', (done) => {
            let car = {
                make: "honda",
                model: "accord",
                year: 2000,
                rating: 4
            }
        chai.request(server)
            .post('/cars')
            .send(car)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id car', () => {
        it('it should DELETE a car given the id', (done) => {
            let car = new Cars({make: "honda", model: "accord", year: 2005, rating: 7})
            car.save((err, book) => {
                chai.request(server)
                .delete('/cars/' + car._id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.cars.should.be.a('array');
                        //res.body.should.have.property('message').eql('Book successfully deleted!');
                        //res.body.cars.should.have.property('ok').eql(1);
                        //res.body.cars.should.have.property('n').eql(1);
                    done();
                });
            });
        });
    });

});