import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true}
}, {timestamps: true})

export const CategoryModel = models?.Category || model('Category', CategorySchema);