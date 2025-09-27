import Service from "../model/service.mjs";


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
    }

}

export default serviceMongoRepository;