import { model, models, Schema } from "mongoose";

const ExtraIngredientSchema = new Schema({
    name: {type: String, required: true},
    extraPrice: {type: Number, required: true}
})

const SizeSchema = new Schema({
    name: {type: String, required: true},
    extraPrice: {type: Number, required: true}
})

const CartProductSchema = new Schema({
    _id: {type: String, required: false},
    name: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    basePrice: {type: Number, required: true},
    image: {type: String, required: true},
    size: SizeSchema,
    extra: [ExtraIngredientSchema]
})

const OrderSchema = new Schema({
    userEmail: String,
    phone: String,
    streetAddress: String,
    postalCode: String,
    city: String,
    country: String,
    cartProducts: [CartProductSchema],
    paid: {type: Boolean, default: false},
}, {timestamps: true})

export const OrderModel = models?.Order || model("Order", OrderSchema);