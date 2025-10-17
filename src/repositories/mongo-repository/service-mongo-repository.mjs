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
    }
};

export default serviceMongoRepository;