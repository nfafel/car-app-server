const { ApolloServer, gql } = require("apollo-server");
const fetch = require('node-fetch');
const Cars = require('./cars.model');
const Repairs = require('./repairs.model');
const {GraphQLScalarType} = require('graphql');

//Set up mongoose connection
const mongoose = require('mongoose');

var MONGODB;
if (process.env.NODE_ENV == 'test') {
    process.env['MONGODBTEST'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/myReactAppTestDb?retryWrites=true&w=majority";
    MONGODB = process.env.MONGODBTEST || "mongodb://localhost:27017";
} else {
    //DELETE LINE BELOW
    process.env['MONGODB'] = "mongodb+srv://nfafel:Pmwrestling1!@myreactapp-swhip.mongodb.net/myReactAppDb?retryWrites=true&w=majority";
    MONGODB = process.env.MONGODB || "mongodb://localhost:27017";
}

mongoose.connect(MONGODB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const myReactAppDb = mongoose.connection;
myReactAppDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Car {
        _id: ID!
        make: String!
        model: String!
        year: String!
        rating: Int!
    }
    scalar Date
    type Repair {
        _id: ID!
        car: Car!
        description: String!
        date: Date!
        cost: Int!
        progress: String!
        technician: String!
    }
    type YearsRange {
        min_year: Int!
        max_year: Int!
    }
    type Make {
        make_id: String!
        make_display: String!
        make_is_common: String!
        make_country: String!
    } 
    type Model {
        model_name: String!
        model_make_id: String!
    }
    input CarInput {
        make: String!
        model: String!
        year: Int!
        rating: Int
    }
    input RepairInput {
        car_id: ID!
        description: String!
        date: String!
        cost: Int!
        progress: String!
        technician: String!
    }
    type Query {
        cars: [Car!]!
        repairs: [Repair!]!
        repairsForCar(carId: ID!): [Repair!]!
        allYears: YearsRange!
        allMakes(year: Int!): [Make!]!
        allModels(year: Int!, make: String!): [Model!]!
    }
    type Mutation {
        createCar(input: CarInput): [Car!]!
        updateCar(id: ID!, input: CarInput): [Car!]!
        removeCar(id: ID!): [Car!]!

        createRepair(input: RepairInput): [Repair!]!
        updateRepair(id: ID!, input: RepairInput): [Repair!]!
        removeRepair(id: ID!): [Repair!]!
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        serialize(value) {
            return value.toISOString()
        }
    }),
    Query: {
        async cars(root, args, context) {
            const result = await Cars.find()
            return result;
        },
        async repairs(root, args, context) {
            const result = await Repairs.find()
            return result;
        },
        async repairsForCar(root, {carId}, context) {
            const results = await Repairs.find({car_id: carId});
            return results;
        },
        async allYears(root, args, context) {
            const response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getYears', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result.Years;
        },
        async allMakes(root, {year}, context) {
            const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=${year}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result.Makes;
        },
        async allModels(root, {year, make}, context) {
            const response = await fetch(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}&year=${year}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result.Models;
        }
    },
    Repair: {
        async car({ car_id }) {
        const result = await Cars.findById(car_id);
        return result;
        }
    },
    Mutation: {
        async createCar(root, {input}, context) {
            const newCar = new Cars(input);
            await newCar.save();
            const result = await Cars.find();
            return result;
        },
        async updateCar(root, {id, input}, context) {
            await Cars.findByIdAndUpdate(id, {'$set': input}, { runValidators: true })
            const result = await Cars.find();
            return result;
        },
        async removeCar(root, {id}, context) {
            await Cars.findByIdAndRemove(id);
            await Repairs.deleteMany({car_id: id});
            const result = await Cars.find();
            return result;
        },

        async createRepair(root, {input}, context) {
            const newRepair = new Repairs(input);
            await newRepair.save();
            const result = await Repairs.find();
            return result;
        },
        async updateRepair(root, {id, input}, context) {
            await Repairs.findByIdAndUpdate(id, {'$set': input}, { runValidators: true })
            const result = await Repairs.find();
            return result;
        },
        async removeRepair(root, {id}, context) {
            await Repairs.findByIdAndRemove(id);
            const result = await Repairs.find();
            return result;
        }
    }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});