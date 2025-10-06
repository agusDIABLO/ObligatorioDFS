import Reservation from "../../model/reservation.mjs";



const reservationMongoRepository = {
    async createReservation(data) {
        try{
        const reservation = new Reservation(data);
        const reservationCreada = await reservation.save();
        console.log('reservationCreada', reservationCreada)
        return reservationCreada;
        } catch (error) {
            console.log('No se pudo crear la reserva en mongo', error)
        }
    },
          
    async getReservationByBarberAndDate(barberId, reservationDate) {
        try {
            const startOfDay = new Date(reservationDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(reservationDate);
            endOfDay.setHours(23, 59, 59, 999);

            const reservations = await Reservation.find({
                barberId,
                reservationDate: { $gte: startOfDay, $lte: endOfDay },
                status: 'confirmed' // Solo reservas confirmadas
            }).populate('serviceId', 'duration name') // Popula solo el nombre y email del cliente
            .lean(); // Convierte a objetos JavaScript simples
            
            return reservations;
        } catch (error) {
            console.log('Error al obtener las reservas por barbero y fecha en mongo', error);
            throw error;
        }
    },

    async getReservationByCustomerAndDate(customerId, reservationDate) {
        try {
            const startOfDay = new Date(reservationDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(reservationDate);
            endOfDay.setHours(23, 59, 59, 999);

            const reservations = await Reservation.find({
                customerId,
                reservationDate: { $gte: startOfDay, $lte: endOfDay },
                status: 'confirmed' // Solo reservas confirmadas
            }).populate('serviceId', 'duration name') // Popula solo el nombre y email del cliente
            .lean(); // Convierte a objetos JavaScript simples

            return reservations;
        } catch (error) {
            console.log('Error al obtener las reservas por cliente y fecha en mongo', error);
            throw error;
        }
    }


}

export default reservationMongoRepository;