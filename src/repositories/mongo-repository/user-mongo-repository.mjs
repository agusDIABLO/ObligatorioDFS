import User from "../../model/user.mjs";


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
    },


    async getUserByEmail(data) {
        console.log('data', data)
        return User.findOne(({ email: "roberto5@example.com" }));
    }

}

export default userMongoRepository; 