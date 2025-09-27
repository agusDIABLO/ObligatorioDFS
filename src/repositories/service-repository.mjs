import serviceMongoRepository from "./mongo/service-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config";


let serviceRepository;

if (process.env.MONGO_BD_IN_USE ==   baseConstant.MONGO) {
    serviceRepository = serviceMongoRepository;
}

export default serviceRepository;
