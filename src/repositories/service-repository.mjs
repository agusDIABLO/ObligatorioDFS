import serviceMongoRepository from "../repositories/mongo-repository/service-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config";


let serviceRepository;

if (process.env.DB_TYPE == baseConstant.MONGO) {
    serviceRepository = serviceMongoRepository;
}

export default serviceRepository;
