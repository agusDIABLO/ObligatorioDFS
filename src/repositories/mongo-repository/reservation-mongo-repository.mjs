import { getAllReservations, getReservationByCategory, getReservationByUser } from "../../controllers/reservation-controller.mjs";
import Reservation from "../../model/reservation.mjs";
import Service from "../../model/service.mjs"


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
          
    async getReservationByBarberAndDate(barberId, startOfDay, endOfDay) {
        try {
            const reservations = await Reservation.find({
                barberId,
                reservationDateTime: { $gte: startOfDay, $lte: endOfDay },
                status: 'confirmed' // Solo reservas confirmadas
            }).populate('serviceId', 'duration name') // Popula solo el nombre y duración del servicio
            .lean(); // Convierte a objetos JavaScript simples
            
            return reservations;
        } catch (error) {
            console.log('Error al obtener las reservas por barbero y fecha en mongo', error);
            throw error;
        }
    },

    async getReservationsByCustomerAndDateRange(customerId, startOfDay, endOfDay) {
        try {
            const reservations = await Reservation.find({
                customerId,
                reservationDateTime: { $gte: startOfDay, $lte: endOfDay },
                status: 'confirmed' // Solo reservas confirmadas
            }).populate('serviceId', 'duration name') // Popula solo el nombre y duración del servicio
            .lean(); // Convierte a objetos JavaScript simples
            return reservations;
        } catch (error) {
            console.log('Error al obtener las reservas por cliente y fecha en mongo', error);
            throw error;
        }
    },


    async getReservationById(id) {
        try {
            const reservation = await Reservation.findById(id).populate('serviceId', 'duration name').lean();
            return reservation;
        } catch (error) {
            return new Error('Error al obtener la reserva por ID en mongo', error);
        }   
    },

    async deleteReservation(id) {
        try {
            const deletedReservation = await Reservation.findByIdAndDelete(id);
            return deletedReservation;
        } catch (error) {
             throw new Error('Error al eliminar la reserva en mongo', error);
        }
    },


    async getReservationsByCategory(id){
        try {
            const services = await Service.find({ categoryId: id }).select('_id');
            const serviceIds = services.map(s => s._id);

            const reservations = await Reservation.find({ serviceId: { $in: serviceIds }})
            .populate('serviceId', 'name duration categoryId')
            .populate('barberId', 'name email')
            .populate('customerId', 'name email');
            
            return reservations;
        } catch (error) {
            throw new Error('Error al obtener las reservas por categoría');
        }
    },

    async getReservationByCustomer(id){
        try {
            const reservations = await Reservation.find({customerId: id })
            .populate('serviceId', 'name duration categoryId')
            .populate('barberId', 'name email')
            .populate('customerId', 'name email');

            return reservations;
        } catch (error) {
            throw new Error('Error al obtener las reservas del usuario');
        }

    },

    async getReservationsByBarber(id) {
    try {
        const reservations = await Reservation.find({ barberId: id })
            .populate('serviceId', 'name duration categoryId')
            .populate('barberId', 'name email')
            .populate('customerId', 'name email');

        return reservations;
    } catch (error) {
        throw new Error('Error al obtener las reservas del barbero');
    }
},



    async getAllReservations(){
        try{
        const reservations = await Reservation.find()
        .populate('customerId', 'name email') 
        .populate('barberId', 'name email')
        .populate('serviceId', 'name duration price');

        
        return reservations;
        }catch(error){
        
        throw new Error('Error al obtener todas las reservas');
        
        }
    }


}

export default reservationMongoRepository;