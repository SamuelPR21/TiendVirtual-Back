import * as  aboutUsService from '../service/aboutUs.service.js';
import {AboutUsRequest} from  '../DTOs/AboutUs/aboutUsRequest.js'


export const createAboutUs = async (req, res) => {
    try{
        const dto = new AboutUsRequest(req.body);
        const result = await aboutUsService.createAboutUs(dto);
        res.status(201).json(result);
    }catch (err) {
        console.error(err);
        res.status(400).json({
          message: "Error al crear About Us",
          error: err.message
        });
      }
      
}

export const getAboutUs = async (req, res) => {
    try{
        const aboutUsEntries = await aboutUsService.getAboutUs();
        res.json(aboutUsEntries);
    }catch{
        res.status(404).json({message: 'Error al obtener About Us'});
    }
}

export const getAboutUsById = async (req, res) => {
    try{
        const id = req.params.id;
        const aboutUsEntry = await aboutUsService.getAboutUsById(id);
        res.json(aboutUsEntry);
    }catch{
        res.status(404).json({message: 'Error al obtener About Us por ID'});
    }
}

export const updateAboutUs = async (req, res) => {
    try{
        const id = req.params.id;
        const dto = req.body;
        const result = await aboutUsService.updateAboutUs(id, dto);
        res.json(result);
    }catch{
        res.status(404).json({message: 'Error al actualizar About Us'});
    }
}

export const deleteAboutUs = async (req, res) => {
    try{
        const id = req.params.id;
        await aboutUsService.deleteAboutUs(id);
        res.json({message: 'About Us eliminado'});
    }catch{
        res.status(404).json({message: 'Error al eliminar About Us'});
    }
}
