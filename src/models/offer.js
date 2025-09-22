import mongoose from 'mongoose';


const Product_snapshotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})

const OfferSchema = new mongoose.Schema({
    name : String,
    description: String,
    discount: { type: Number, required: true },
    producto_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    producto_snapshot: {type: Product_snapshotSchema, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
})

const Offer = mongoose.model('Offer', OfferSchema);
export default Offer;