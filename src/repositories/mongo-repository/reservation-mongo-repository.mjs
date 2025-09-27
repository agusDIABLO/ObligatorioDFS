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
    }
}

export default reservationMongoRepository;