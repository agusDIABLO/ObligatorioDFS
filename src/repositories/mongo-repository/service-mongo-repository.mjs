import Service from "../../model/service.mjs";


const serviceMongoRepository = {

    async createService(data) {
        try {
            const service = new Service(data)
            const serviceCreado = await service.save();
            console.log('service', serviceCreado)
            return service;
        } catch (error) {
            console.log('No se pudo crear el servicio en mongo', error)
        }
    },

    async getServiceById(id) {
        try {
            const service = await Service.findById(id);
            return service;
        } catch (error) {
            console.log('Error al obtener el servicio por ID en mongo', error);
        }   


}

}; 
export default serviceMongoRepository;