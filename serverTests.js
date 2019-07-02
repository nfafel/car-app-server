//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Cars = require('./cars.model');
let Repairs = require('./repairs.model');

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
    * Test the /POST route with an error
    */
    describe('/POST car', () => {
        it('it should POST a car with an error', (done) => {
            let car = {
                make: "honda",
                model: "accord",
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
                  .put('/cars/' + car.id)
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

    describe('/PUT/:id car', () => {
        it('it should UPDATE a car given the id with an error', (done) => {
            let car = new Cars({make: "acura", model: "TSX", year: 2012, rating: 9})
            car.save((err, car) => {
                  chai.request(server)
                  .put('/cars/' + car.id)
                  .send({make: "acura", model: "TSX", year: 2015})
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


/*
 *
 * TESTS FOR THE REPAIR ROUTES
 * 
 */


describe('Repairs', () => {
    beforeEach((done) => { //Before each test we empty the database
        Repairs.deleteMany({}, (err) => { 
           done();           
        });        
    });
    /*
    * Test the /GET route
    */
    describe('/GET repair', () => {
        it('it should GET all the repairs', (done) => {
            chai.request(server)
                .get('/repairs')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.repairs.should.be.a('array');
                    res.body.repairs.length.should.be.eql(0);
                done();
                });
        });
    });

    
    /*
    * Test the /POST route
    */
    describe('/POST repair', () => {
        it('it should POST a repair', (done) => {
            let repair = new Repairs( {
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "rating": 9,
                    "__v": 0
                },
                description: "Cracked Windshield",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"

            } );
        chai.request(server)
            .post('/repairs')
            .send(repair)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.repairs.should.be.a('array');
                    res.body.repairs[0].car.should.be.a('object');
                    res.body.repairs[0].should.have.property('description').eql("Cracked Windshield");
                    res.body.repairs[0].should.have.property('date').eql("2019-07-03T00:00:00.000Z");
                    res.body.repairs[0].should.have.property('cost').eql(30000);
                    res.body.repairs[0].should.have.property('progress').eql("completed");
                    res.body.repairs[0].should.have.property('technician').eql("Jerry");
                done();
            });
        });
    });

    /*
    * Test the /POST route with an error
    */
    describe('/POST repair', () => {
        it('it should POST a repair with an error', (done) => {
            let repair = new Repairs( {
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "rating": 9,
                    "__v": 0
                },
                description: "Cracked Windshield",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"

            } );
        chai.request(server)
            .post('/repairs')
            .send(repair)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.repairs.should.be.a('array');
                    res.body.repairs[0].car.should.be.a('object');
                    res.body.repairs[0].should.have.property('description').eql("Cracked Windshield");
                    res.body.repairs[0].should.have.property('date').eql("2019-07-03T00:00:00.000Z");
                    res.body.repairs[0].should.have.property('cost').eql(30000);
                    res.body.repairs[0].should.have.property('progress').eql("completed");
                    res.body.repairs[0].should.have.property('technician').eql("Jerry");
                done();
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id repair', () => {
        it('it should DELETE a repair given the id', (done) => {
            let repair = new Repairs( {
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "rating": 9,
                    "__v": 0
                },
                description: "Cracked Windshield",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"

            } );            
            repair.save((err, repair) => {
                chai.request(server)
                .delete('/repairs/' + repair.id)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.repairs.should.be.a('array');
                        res.body.repairs.length.should.be.eql(0);
                    done();
                });
            });
        });
    });

    describe('/PUT/:id repair', () => {
        it('it should UPDATE a repair given the id', (done) => {
            let repair = new Repairs( {
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "rating": 9,
                    "__v": 0
                },
                description: "Cracked Windshield",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"

            } );
            repair.save((err, repair) => {
                chai.request(server)
                .put('/repairs/' + repair.id)
                .send({
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "rating": 9,
                    "__v": 0
                },
                description: "Engine",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"
                })
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.repairs.should.be.a('array');
                        res.body.repairs[0].should.have.property('description').eql('Engine');
                    done();
                  });
            });
        });
    });

    /*
    * Test the /PUT route with an error
    */
    describe('/PUT/:id repair', () => {
        it('it should UPDATE a repair given the id with an error', (done) => {
            let repair = new Repairs( {
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "rating": 9,
                    "__v": 0
                },
                description: "Cracked Windshield",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"

            } );
            repair.save((err, repair) => {
                chai.request(server)
                .put('/repairs/' + repair.id)
                .send({
                car: {
                    "_id": "5d1baa6a4d4ebc000ff358ef",
                    "make": "lamborghini",
                    "model": "Aventador",
                    "year": 2019,
                    "__v": 0
                },
                description: "Engine",
                date: "2019-07-03T00:00:00.000Z",
                cost: 30000,
                progress: "completed",
                technician: "Jerry"
                })
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.repairs.should.be.a('array');
                        res.body.repairs[0].should.have.property('description').eql('Engine');
                    done();
                });
            });
        });
    });

});