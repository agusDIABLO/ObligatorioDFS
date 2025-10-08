import jwt from 'jsonwebtoken';
import "dotenv/config";
import { validateAuth } from '../validations/validation-user.mjs';

const {JWT_SECRET} = process.env;


export const authMiddleware = (req, res, next) => {
        console.log("Esta autenticando/autorizando");
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({error: 'No se proporcionó el token de autenticación'});
        }   

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({error: 'No se proporcionó el token de autenticación'});
        }   

        const decoded = jwt.verify(token, JWT_SECRET);

        const {error, value} = validateAuth.validate(decoded, {abortEarly: false});

        if (error) {
            return res.status(401).json({errors: error.details.map(d => d.message)});
        }else { 
            
            req.user = value;
            next();
        }
    }catch (error) {    
        return res.status(401).json({error: 'Token inválido o expirado'});
    }     
}