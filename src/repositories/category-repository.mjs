import categoryMongoRepository from '../repositories/mongo-repository/category-mongo-repository.mjs';   
import { baseConstant } from '../constants/base-constants.mjs';
import 'dotenv/config';     

let categoryRepository;

if (process.env.DB_TYPE ==   baseConstant.MONGO) {
    categoryRepository = categoryMongoRepository;
}   

export default categoryRepository;