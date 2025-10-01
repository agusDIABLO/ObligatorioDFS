import userMongoRepository from "./mongo-repository/user-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constants.mjs";
import "dotenv/config";

let userRepository;

if (process.env.DB_TYPE == baseConstant.MONGO) {
    userRepository = userMongoRepository;
}

export default userRepository;