import Category from "../../model/category.mjs";    



const categoryMongoRepository = {
    
    async createCategory(data) {
        try {
        const category = new Category(data);
        const categoryCreada = await category.save();
        console.log('categoryCreada', categoryCreada)      
        return categoryCreada;
        } catch (error) {
            console.log('No se pudo crear la categoria en mongo', error)
        }   
    }   

}


export default categoryMongoRepository; 