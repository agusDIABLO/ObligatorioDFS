export const validateReservationTimeMiddleware = (req, res, next) => {
    const { reservationDate, reservationTime } = req.body;
    const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
    const now = new Date();

    if (reservationDateTime <= now) {
        return res.status(400).json({ error: 'La fecha y hora de la reserva deben posteriores a la actual' });
    }
    next();
};