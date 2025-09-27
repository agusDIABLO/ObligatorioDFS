import userMongoRepository from "./mongo-repository/user-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config";

let userRepository;

if (process.env.MONGO_BD_IN_USE ==   baseConstant.MONGO) {
    userRepository = userMongoRepository;
}

export default userRepository;