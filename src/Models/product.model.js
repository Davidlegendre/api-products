import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
{
    timestamps: true
})

module.exports = model('products', productoSchema)