export const validateReservationTimeMiddleware = (req, res, next) => {
    const { reservationDateTime } = req.body;
    const reservationDate = new Date(reservationDateTime);

    const now = new Date();

    if (reservationDate <= now) {
        return res.status(400).json({ error: 'La fecha y hora de la reserva deben posteriores a la actual' });
    }
    next();
};