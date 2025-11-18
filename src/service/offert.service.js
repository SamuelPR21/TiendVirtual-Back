import Offer from "../models/offerts.js";
import Product from "../models/products.js";
import {OffertsResponse} from "../DTOs/offert/offertResponse.js"

export const createOffert = async (dto) => {
    try{
        const existOffert = await Offer.findOne({ producto_id: dto.producto_id });
            if (existOffert) {
                throw new Error('Ya existe una oferta para este producto');
            }

        
        const newOffert = new Offer({
            name: dto.name,
            description: dto.description,
            discount: dto.discount,
            producto_id:dto.producto_id,
            producto_snapshot: dto.producto_snapshot,
            start_date: dto.start_date,
            end_date: dto.end_date
        });
    
        const savedOffert = await newOffert.save();
    
        const offertResponse = new OffertsResponse({
            id: savedOffert._id,
            name: savedOffert.name,
            description: savedOffert.description,
            discount: savedOffert.discount,
            producto_id:savedOffert.producto_id,
            producto_snapshot: savedOffert.producto_snapshot,
            start_date: savedOffert.start_date,
            end_date: savedOffert.end_date
        });

        return {message: 'Oferta Creada', offer: offertResponse};
    }catch(error){
        throw new Error('Error al crear la oferta: ' + error.message);
    }
   
}

export const getOfferts = async () =>  {
        const offerts = await Offer.find().lean();
    
        const result = await Promise.all(
            offerts.map(async (offert) => {
                const product = await Product.findById(offert.producto_id).lean();
    
                return {
                    id: offert._id,
                    name: offert.name,
                    description: offert.description,
                    discount: offert.discount,
                    producto_id: offert.producto_id,
                    producto_snapshot: offert.producto_snapshot,
                    start_date: offert.start_date,
                    end_date: offert.end_date,
                    image_url: product?.image_url || null
                };
            })
        );
        return result;
    }

export const getOffertByProductId = async (product_id) => {
    try{
        const offert = await Offer.findOne({producto_id: product_id}).lean();
        if (!offert) {
            throw new Error('No existe una oferta para este producto');
        }

        const offertResponse = new OffertsResponse({
            id: offert._id,
            name: offert.name,
            description: offert.description,
            discount: offert.discount,
            producto_id:offert.producto_id,
            producto_snapshot: offert.producto_snapshot,
            start_date: offert.start_date,
            end_date: offert.end_date
        });

        return offertResponse;

    }catch(error){
        throw new Error('Error al obtener la oferta por ID de producto: ' + error.message);
    }
}
export const updateOffert = async (id, dto) => {
    try{
        const  offert = await Offer.findById(id);
        if (!offert) {
            throw new Error('No existe una oferta con este ID');
        }

        offert.name = dto.name || offert.name;
        offert.description = dto.description || offert.description;
        offert.discount = dto.discount || offert.discount;
        offert.producto_id = dto.producto_id || offert.producto_id;
        offert.producto_snapshot = dto.producto_snapshot || offert.producto_snapshot;
        offert.start_date = dto.start_date || offert.start_date;
        offert.end_date = dto.end_date || offert.end_date;

        const updatedOffert = await offert.save();
        
        const offertResponse = new OffertsResponse({
            id: updatedOffert._id,
            name: updatedOffert.name,
            description: updatedOffert.description,
            discount: updatedOffert.discount,
            producto_id:updatedOffert.producto_id,
            producto_snapshot: updatedOffert.producto_snapshot,
            start_date: updatedOffert.start_date,
            end_date: updatedOffert.end_date
        });

        return {message: 'Oferta Actualizada', offer: offertResponse};

    }catch(error){
        throw new Error('Error al actualizar la oferta: ' + error.message);
    }
}


export const deleteOffert = async (id) => {
    try{
        const deletedOffert = await Offer.findByIdAndDelete(id);
        if (!deletedOffert) {
            throw new Error('No existe una oferta con este ID');
        }
        return {message: 'Oferta eliminada'};
    }catch(error){
        throw new Error('Error al eliminar la oferta: ' + error.message);
    }
}

