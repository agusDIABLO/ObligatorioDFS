import reservationMongoRepository from "../repositories/mongo-repository/reservation-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config";

let reservationRepository;

if (process.env.DB_TYPE == baseConstant.MONGO) {
    reservationRepository = reservationMongoRepository;
}

export default reservationRepository;