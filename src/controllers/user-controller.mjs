import userRepository from '../repositories/user-repository.mjs';   
import bcrypt from 'bcrypt';    
import jwt from 'jsonwebtoken';
import "dotenv/config"; 


export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const {password, email} = user;
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        const userCreado = await userRepository.createUser(user);
        const token = jwt.sign({id: userCreado._id, email: email, role: userCreado.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
       
//probar eso de usuario ---->         <----
        res.status(201).json({User: userCreado, token});
    } catch (error) {
        res.status(500).json({error: 'No se pudo crear el usuario'});           
    }

}


export const loginUser = async (req, res) => {
    try {   
        const {email, password} = req.body;
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({error: 'Credenciales inválidas'});
        }
        const {password: hashPassword} = user;
        const isPasswordValid = await bcrypt.compare(password, hashPassword);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Credenciales inválidas'});
        }else {
            const token = jwt.sign({id: user._id,email: email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.status(200).json({token});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'No se pudo iniciar sesión'});
    } 
}