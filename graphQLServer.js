const { ApolloServer, gql, PubSub } = require("apollo-server");
const fetch = require('node-fetch');
const Cars = require('./models/cars');
const Repairs = require('./models/repairs');
const Users = require('./models/users');
const {GraphQLScalarType} = require('graphql');

const pubsub = new PubSub();
 
exports.typeDefs = gql`
    type User {
        _id: ID!
        phoneNumber: String!
        password: String!
        subscribed: Boolean!
    }
    type Car {
        _id: ID!
        phoneNumber: String!
        make: String!
        model: String!
        year: Int!
        rating: Int!
    }
    scalar Date
    type Repair {
        _id: ID!
        phoneNumber: String!
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
    },
    input UserInput {
        password: String!
        subscribed: Boolean!
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
        cars (phoneNumber: String!): [Car!]!
        repairs (phoneNumber: Strng!): [Repair!]!
        user (phoneNumber: String!): User!
        repairsForCar(carId: ID!): [Repair!]!
        allYears: YearsRange!
        allMakes(year: Int!): [Make!]!
        allModels(year: Int!, make: String!): [Model!]!
    }
    type Mutation {
        createCar(input: CarInput): Car!
        updateCar(id: ID!, input: CarInput): Car!
        removeCar(id: ID!): ID!

        createRepair(input: RepairInput): Repair!
        updateRepair(id: ID!, input: RepairInput): Repair!
        removeRepair(id: ID!): ID!

        createuser(input: UserInput): User!

    }
    type Subscription {
        carChanged: [Car!]!
        repairChanged: [Repair!]!
    }
`;

// Provide resolver functions for your schema fields
exports.resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        serialize(value) {
            return value.toISOString()
        }
    }),
    Query: {
        async cars(root, {phoneNumber}, context) {
            const result = await Cars.find({ phoneNumber: phoneNumber })
            console.log(result);
            return result;
        },
        async repairs(root, {phoneNumber}, context) {
            const result = await Repairs.find({phoneNumber: phoneNumber})
            return result;
        },
        async user(root, {phoneNumber}, context) {
            const result = await Users.find({phoneNumber: phoneNumber})
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
            //pubsub.publish("CAR_CHANGED", { carChanged: result })
            return newCar;
        },
        async updateCar(root, {id, input}, context) {
            const result = await Cars.findByIdAndUpdate(id, {'$set': input}, { runValidators: true, new: true })
            const result = await Cars.find();
            //pubsub.publish("CAR_CHANGED", { carChanged: result })
            //pubsub.publish("REPAIR_CHANGED", { repairChanged: newRepairs })
            return result;
        },
        async removeCar(root, {id}, context) {
            await Cars.findByIdAndRemove(id);
            await Repairs.deleteMany({car_id: id});
            const newRepairs = await Repairs.find();
            //pubsub.publish("REPAIR_CHANGED", { repairChanged: newRepairs })
            //pubsub.publish("CAR_CHANGED", { carChanged: result })
            return id;
        },

        async createRepair(root, {input}, context) {
            const newRepair = new Repairs(input);
            await newRepair.save();
            //pubsub.publish("REPAIR_CHANGED", { repairChanged: result })
            return newRepair;
        },
        async updateRepair(root, {id, input}, context) {
            const result = await Repairs.findByIdAndUpdate(id, {'$set': input}, { runValidators: true, new: true })
            //pubsub.publish("REPAIR_CHANGED", { repairChanged: result })
            return result;
        },
        async removeRepair(root, {id}, context) {
            await Repairs.findByIdAndRemove(id);
            //pubsub.publish("REPAIR_CHANGED", { repairChanged: result })
            return id;
        }
    },
    Subscription: {
        carChanged: {
            subscribe: () => pubsub.asyncIterator("CAR_CHANGED")
        },
        repairChanged: {
            subscribe: () => pubsub.asyncIterator("REPAIR_CHANGED")
        }
    }
};