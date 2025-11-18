import * as offertService from '../service/offert.service.js';
import { OffertsRequest } from '../DTOs/offert/offertRequest.js';
import { OffertsResponse } from '../DTOs/offert/offertResponse.js';

export const createOffert = async (req, res) => {
    try {
        const dto = new OffertsRequest(req.body);
        const result = await offertService.createOffert(dto);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getOfferts = async (req, res) => {
    try {
        const offerts = await offertService.getOfferts();
        res.json(offerts);
    }catch(err){
        res
            .status(500)
            .json({ message: 'Error listando ofertas: ', error: err.message });
    }
}

export const getOffertByProductId = async (req, res) => {
    try {
        const product_id = req.params.product_id;
        const offert = await offertService.getOffertByProductId(product_id);
        if (!offert) {
            return res.status(404).json({ message: 'No se encontró una oferta para este producto' });
        }
        res.json(offert);
    } catch (err) {
        res.json({ message: 'Error obteniendo la oferta: ', error: err.message });
    }
}

export const deleteOffertById = async (req, res) => {
    try{
        const id = req.params.id;
        await offertService.deleteOffert(id);
        res.json({message: 'Oferta eliminada'});

    }catch(err){
        res.json({ message: 'Error eliminando la oferta: ', error: err.message });
    }
}

export const updateOffert = async (req, res) => {
    try{
        const id = req.params.id;
        const dto = req.body;
        const result = await offertService.updateOffert(id, dto);
        res.json(result);
    }catch(err){
        res.json({ message: 'Error actualizando la oferta: ', error: err.message });
    }
}