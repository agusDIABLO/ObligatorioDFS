import { getAllServices } from "../../controllers/service-controller.mjs";
import Service from "../../model/service.mjs";


const serviceMongoRepository = {

    async createService(data) {
        try {
            const service = new Service(data)
            const serviceCreado = await service.save();

            return service;
        } catch (error) {
            throw new Error("error no se pudo crear el servicio en la base de datos");
        }
    },

    async getServiceById(id) {
        try {
            const service = await Service.findById(id);
            return service;
        } catch (error) {
            throw new Error("error al obtener el servicio en la base de datos");
        }
    },

    async getAllServices() {
        try {
            const services = await Service.find()
            return services;
        } catch (error) {
            throw new Error('Error al obtener todas las servicios en mongo', error);
        }
    },

};
export default serviceMongoRepository;