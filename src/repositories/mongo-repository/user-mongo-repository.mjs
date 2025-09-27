import User from '../../models/user.mjs';


const userMongoRepository = {

    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            console.log('No se pudo crear el usuario en mongo', error)
        }
    }

}

export default userMongoRepository; 