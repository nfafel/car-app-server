const { PubSub } = require("apollo-server");
const fetch = require('node-fetch');
const Cars = require('../models/cars');
const Repairs = require('../models/repairs');
const Users = require('../models/users');
const {GraphQLScalarType} = require('graphql');
const jwt = require('jsonwebtoken')
const randomWords = require('random-words');

const { AuthenticationError } = require ('apollo-server')

const pubsub = new PubSub();

const checkAuthentication = (context) => {
    if (!context.authenticationVerified) {
        console.log("Unauthenticated");
        throw new AuthenticationError("Unauthenticated");
    }
}

// Provide resolver functions for your schema fields
exports.resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        serialize(value) {
            return value.toISOString()
        }
    }),
    Query: {
        async cars(root, args, context) {
            checkAuthentication(context);
            const result = await Cars.find({ phoneNumber: context.phoneNumber });
            return result;
        },
        async repairs(root, args, context) {
            checkAuthentication(context);
            const result = await Repairs.find({ phoneNumber: context.phoneNumber })
            return result;
        },
        async repairsForCar(root, {carId}, context) {
            checkAuthentication(context);
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
            checkAuthentication(context);
            input.phoneNumber = context.phoneNumber;
            const newCar = new Cars(input);
            await newCar.save();
            pubsub.publish("CAR_CREATED", { carCreated: newCar })
            return newCar;
        },
        async updateCar(root, {id, input}, context) {
            checkAuthentication(context);
            input.phoneNumber = context.phoneNumber;
            const result = await Cars.findByIdAndUpdate(id, {'$set': input}, { runValidators: true, new: true });
            pubsub.publish("CAR_UPDATED", { carUpdated: result })
            return result;
        },
        async removeCar(root, {id}, context) {
            checkAuthentication(context);
            await Cars.findByIdAndRemove(id);
            await Repairs.deleteMany({car_id: id});
            pubsub.publish("CAR_REMOVED", { carRemoved: id });
            return id;
        },

        async createRepair(root, {input}, context) {
            checkAuthentication(context);
            input.phoneNumber = context.phoneNumber;
            const newRepair = new Repairs(input);
            await newRepair.save();
            pubsub.publish("REPAIR_CREATED", { repairCreated: newRepair })
            return newRepair;
        },
        async updateRepair(root, {id, input}, context) {
            checkAuthentication(context);
            input.phoneNumber = context.phoneNumber;
            const result = await Repairs.findByIdAndUpdate(id, {'$set': input}, { runValidators: true, new: true })
            pubsub.publish("REPAIR_UPDATED", { repairUpdated: result })
            return result;
        },
        async removeRepair(root, {id}, context) {
            checkAuthentication(context);
            await Repairs.findByIdAndRemove(id);
            pubsub.publish("REPAIR_REMOVED", { repairRemoved: id })
            return id;
        },

        async createUser(root, {input}, context) {
            input.secret = randomWords();
            try {
                const newUser = new Users(input);
                await newUser.save();
                
                const payload = {
                    phoneNumber: newUser.phoneNumber,
                    subscribed: newUser.subscribed
                }
                var token = jwt.sign({
                    payload: payload
                }, newUser.secret, { expiresIn: '12h' });
                return token

            } catch(err) {
                throw new Error("Error creating user")
            }
            
        },
        async loginUser(root, {phoneNumber, password}, context) {
            var user;
            try {
                user = await Users.findOne({phoneNumber: phoneNumber});
            } catch(err) {
                throw new Error("Error logging in user")
            }

            if (user === null || user.password !== password) {
                throw new Error("Invalid Credentials");
            } else {
                const payload = {
                    phoneNumber: user.phoneNumber,
                    subscribed: user.subscribed
                }
                var token = jwt.sign({
                    payload: payload
                }, user.secret, { expiresIn: '12h' });
                return token;
            }
        }

    },
    Subscription: {
        carCreated: {
            subscribe: () => pubsub.asyncIterator("CAR_CREATED")
        },
        carUpdated: {
            subscribe: () => pubsub.asyncIterator("CAR_UPDATED")
        },
        carRemoved: {
            subscribe: () => pubsub.asyncIterator("CAR_REMOVED")
        },
        repairCreated: {
            subscribe: () => pubsub.asyncIterator("REPAIR_CREATED")
        },
        repairUpdated: {
            subscribe: () => pubsub.asyncIterator("REPAIR_UPDATED")
        },
        repairRemoved: {
            subscribe: () => pubsub.asyncIterator("REPAIR_REMOVED")
        },
    }
};