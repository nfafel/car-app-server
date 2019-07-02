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

    describe('/GET car', () => {
        it('it should GET a car by id', (done) => {
            let car = new Cars({make: "honda", model: "accord", year: 2005, rating: 7});
            car.save((err, car) => {
                chai.request(server)
                    .get('/cars/' + car.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.car.should.be.a('object');
                        res.body.car.should.have.property('make').eql('honda');
                        res.body.car.should.have.property('model').eql('accord');
                        res.body.car.should.have.property('year').eql(2005);
                        res.body.car.should.have.property('rating').eql(7);
                    done();
                });
            });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST car', () => {
        it('it should POST a car', (done) => {
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
                    res.body.cars[0].should.have.property('make').eql('honda');
                    res.body.cars[0].should.have.property('model').eql('accord');
                    res.body.cars[0].should.have.property('year').eql(2000);
                    res.body.cars[0].should.have.property('rating').eql(4);
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
            car.save((err, car) => {
                chai.request(server)
                .delete('/cars/' + car.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.cars.should.be.a('array');
                        res.body.cars.length.should.be.eql(0);
                    done();
                });
            });
        });
    });

    describe('/PUT/:id car', () => {
        it('it should UPDATE a car given the id', (done) => {
            let car = new Cars({make: "acura", model: "TSX", year: 2012, rating: 9})
            car.save((err, car) => {
                  chai.request(server)
                  .put('/cars/' + car._id)
                  .send({make: "acura", model: "TSX", year: 2015, rating: 9})
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.cars.should.be.a('array');
                        res.body.cars[0].should.have.property('year').eql(2015);
                    done();
                  });
            });
        });
    });


});