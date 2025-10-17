import Category from "../../model/category.mjs";


const categoryMongoRepository = {
    async createCategory(data) {
        try {
            const category = new Category(data);
            const categoryCreada = await category.save();

            return categoryCreada;
        } catch (error) {
            throw new Error("error no se pudo crear la categoria en la base de datos");
        }
    },

    async getCategoryById(id) {
        try {
            const category = await Category.findById(id);
            return category;
        } catch (error) {
            throw new Error("error al obtener categoria en la base de datos");
        }
    }
}

export default categoryMongoRepository; 