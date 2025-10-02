import mongoose from "mongoose";
import categorySchema from "../model/schemas/category-schema.mjs";

const category = mongoose.model("Category", categorySchema);

export default category;