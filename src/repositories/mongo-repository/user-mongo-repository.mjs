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
        return User.findOne(({ email: data }));
    },


    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (user) {
                delete user._doc.password;
            }
            return user;
        } catch (error) {
            console.log('Error al obtener el usuario por ID en mongo', error);
        }
    },


    async updateUser(id, data) {
        try {
            const userActualizado = await User.findByIdAndUpdate(id, data, { new: true });
            if (userActualizado) {
                delete userActualizado._doc.password;
            }
            return userActualizado;
        } catch (error) {
            console.log('Error al actualizar el usuario en mongo', error);
        }
    },

    async decrementLimitReservations(userId) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $inc: { limitReservations: -1 } },
                { new: true }
            )} catch (error) {
            console.log('Error al decrementar el límite de reservas en mongo', error);
        }   
    }



    


}

export default userMongoRepository; 