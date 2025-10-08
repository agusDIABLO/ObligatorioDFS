import { createError } from "../error/create-error.mjs";
import reservationRepository from "../repositories/reservation-repository.mjs";
import userRepository from "../repositories/user-repository.mjs";
import serviceRepository from "../repositories/service-repository.mjs";




export const createReservation = async (req, res, next) => {   
    try {
        const { barberId, serviceId, reservationDateTime, status } = req.body;
        const customerId = req.user.id; // del token
        
        

        const customer = await userRepository.getUserById(customerId);
        if (!customer || !customer.role.includes('customer')) {
        return next(createError(400, 'Cliente no válido'));
        }
        
        const barber = await userRepository.getUserById(barberId);
        if (!barber || !barber.role.includes('barber')) {
        return next(createError(400, 'Barbero no válido'));
        }

        const service = await serviceRepository.getServiceById(serviceId);
        if (!service) {
            return next(createError(400, 'Servicio no válido'));
        }


        const nuevaReserva = await reservationRepository.createReservation({
            customerId,
            barberId,
            serviceId,
            reservationDateTime,
            status
        });


        res.status(201).json(nuevaReserva);
    } catch (error) {
        next(createError(500, 'No se pudo crear la reserva'));
    }
}


export const deleteReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const reservation = await reservationRepository.getReservationById(id);
        if (!reservation) {
            return next(createError(404, 'Reserva no encontrada'));
        }   
        if (reservation.customerId.toString() != req.user.id && !req.user.role.includes('admin')) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta reserva' });
        }
        await reservationRepository.deleteReservation(id);
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        next(createError(500, 'No se pudo eliminar la reserva'));
    }
};


export const getReservationByCategory = async (req, res, next) => {
    try {
        const { id } = req.params; // id de categoria
        const reservations = await reservationRepository.getReservationsByCategory(id)

        if (!reservations || reservations.length == 0) {
            return res.status(404).json({message: 'No hay reservas para esta categoría'});
        }

        res.status(200).json(reservations)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener las reservas por categoría'})
    }

};



export const getReservationByUser = async (req, res) => {
    try {
        let reservations;

        if (req.user.role.includes('admin')) {
                // Si el admin pasa un userId en params, busca solo las reservas de ese usuario

            const userId = req.params.id;
            if (userId) {
                // Podría ser un cliente o barber, lo dejamos por el momento con cliente
                reservations = await reservationRepository.getReservationsByCustomer(userId);
            } else {
                return res.status(400).json({ message: 'Debe proporcionar un userId para buscar' });
            }
        
        } else if (req.user.role.includes('barber')) {
            if (req.user.id == req.params. id) {
                reservations = await reservationRepository.getReservationsByBarber(req.user.id);   
            }else{
                
            return res.status(403).json({ message: 'Rol no autorizado' });
            }
            
        } else if (req.user.role.includes('customer')) {
            // Solo puede ver sus propias reservas
            if (req.user.id == req.params. id) {
                reservations = await reservationRepository.getReservationsByCustomer(req.user.id);                
            }else{

            return res.status(403).json({ message: 'Rol no autorizado' });
            }
        } else {
            return res.status(403).json({ message: 'Rol no autorizado' });
        }

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: 'No hay reservas para este usuario' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas por usuario 500' });
    }
};




export const getAllReservations = async (req, res) => {
    try {
      const reservations = await reservationRepository.getAllReservations();

      if (!reservations || reservations.length == 0) {
        return res.status(400).json({ message: 'No hay reservas registradas' });
      }
        return res.status(200).json(reservations); 
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }

}


export const updateReservation = async (req, res) =>{
    try {
        const {id} = req.params;
        const updatedData = req.body;
        const userId = req.user.id;
        const reservation = await reservationRepository.getReservationById(id);
        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        if (req.user.role == 'customer' && reservation.customerId.toString() !== userId ) {
            return res.status(403).json({ message: "No tienes permiso para modificar esta reserva" });
        }

        const updatedReservation = await reservationRepository.updateReservation(id, updatedData);

        if (!updatedReservation) {
        return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva actualizada correctamente", updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva" });
    }

}


export const parcialUpdateReservation = async (req, res) =>{
    try {
        const {id} = req.params;
        const updateBody = req.body;
        const userId = req.user.id;

        const reservation = await reservationRepository.getReservationById(id)
        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        if (req.user.role == 'customer' && reservation.customerId.toString() !== userId) {
            return res.status(403).json({ message: "No tienes permiso para modificar esta reserva" });
        }

        const updateReservation = await reservationRepository.patchReservation(id, updateBody);
        res.status(200).json({
        message: "Reserva actualizada",
        updateReservation,
    });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar parcialmente la reserva" });
    }



}