import User from "../../model/user.mjs";


const userMongoRepository = {
    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            throw new Error("no se pudo crear el usuario en la base de datos");
        }
    },

    async getUserByEmail(data) {
        try {
            return User.findOne(({ email: data }));

        } catch (error) {
            throw new Error("error al obtener usuario por email en la base de datos");
        }
    },

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (user) {
                delete user._doc.password;
            }
            return user;
        } catch (error) {
            throw new Error("error al obtener usuario en la base de datos");
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
            throw new Error("error al borrar usuario en la base de datos");
        }
    },

    async decrementLimitReservations(userId) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $inc: { limitReservations: -1 } },
                { new: true }
            )
        } catch (error) {
            throw new Error("error al decrementar las reservas");

        }
    }
}

export default userMongoRepository; 