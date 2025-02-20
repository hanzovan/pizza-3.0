import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    extraPrice: Number
})

const MenuItemSchema = new Schema({
    image: {type: String},
    name: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "Category", required: true},
    description: {type: String},
    basePrice: {type: Number},
    sizes: {type: [ExtraPriceSchema]},
    extraIngredients: {type: [ExtraPriceSchema]}
}, {timestamps: true})

export const MenuItemModel = models?.MenuItem || model('MenuItem', MenuItemSchema);