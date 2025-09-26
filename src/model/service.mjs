import mongoose from "mongoose";
import serviceSchema from "../schemas/service-schema.mjs";

const service = mongoose.model("Service", serviceSchema);   

export default service;