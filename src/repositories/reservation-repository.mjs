import reservationMongoRepository from "../repositories/mongo/reservation-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config"; 

let reservationRepository;

if (process.env.MONGO_BD_IN_USE ==   baseConstant.MONGO) {
    reservationRepository = reservationMongoRepository;
}   

export default reservationRepository;