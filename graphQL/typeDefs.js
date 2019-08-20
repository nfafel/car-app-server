const { gql } = require("apollo-server");

exports.typeDefs = gql`
    type User {
        _id: ID!
        phoneNumber: String!
        password: String!
        subscribed: Boolean!
        secret: String!
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
        phoneNumber: String!
        password: String!
        subscribed: Boolean!
        secret: String!
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
        createCar(input: CarInput): Car!
        updateCar(id: ID!, input: CarInput): Car!
        removeCar(id: ID!): ID!

        createRepair(input: RepairInput): Repair!
        updateRepair(id: ID!, input: RepairInput): Repair!
        removeRepair(id: ID!): ID!

        createUser(input: UserInput): String!
        loginUser(phoneNumber: String!, password: String!): String!
    }
    type Subscription {
        carCreated: Car!
        carUpdated: Car!
        carRemoved: ID!
        repairCreated: Repair!
        repairUpdated: Repair!
        repairRemoved: ID!
    }
`;