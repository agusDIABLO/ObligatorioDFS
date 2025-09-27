import categoryMongoRepository from './category-mongo-repository.mjs';
import { baseConstant } from '../constants/base-constants.mjs';
import 'dotenv/config';     

let categoryRepository;

if (process.env.MONGO_BD_IN_USE ==   baseConstant.MONGO) {
    categoryRepository = categoryMongoRepository;
}   

export default categoryRepository;