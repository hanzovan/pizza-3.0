import { UserType } from "@/types";
import mongoose, { model, models, Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI ?? "MONGODB_URI not found");

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    name: {type: String},
    credentialAccount: {type: Boolean, default: false}, // Indicate if user sign in with credentials or not
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function (this: UserType) {
            return this.credentialAccount;
        }
    },
    avatar: {type: String},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},
    role: {type: String, default: 'user'},
    isBlocked: {type: Boolean, default: false},
    emailIsVerified: {type: Boolean, default: false}
}, {timestamps: true})

export const UserModel = models?.User || model('User', UserSchema);