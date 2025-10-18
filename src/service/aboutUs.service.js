import AboutUs from "../models/aboutUs.js";
import {AboutUsResponse} from "../DTOs/AboutUs/aboutUsResponse.js"

export const createAboutUs = async (dto) => {
    try{
        const newAboutUs = new AboutUs({
            item: dto.item,
            description: dto.description
        });
    
        const savedAboutUs = await newAboutUs.save();
    
        const aboutUsResponse = new AboutUsResponse({
            id: savedAboutUs._id,
            item: savedAboutUs.item,
            description: savedAboutUs.description
        });

        return {message: 'About Us Created', aboutUs: aboutUsResponse};
    }catch(error){
        throw new Error('Error creating About Us: ' + error.message);
    }
}

export const getAboutUs = async () => {
    
        const aboutUsEntries = await AboutUs.find().lean();
        const aboutUsResponse = aboutUsEntries.map(entry => new AboutUsResponse({
            id: entry._id,
            item: entry.item,
            description: entry.description
        }));

        return aboutUsResponse;

   
}


export const getAboutUsById = async (id) => {
    try{
        const aboutUs = await AboutUs.findById(id).lean();
        if (!aboutUs) {
            throw new Error('About Us entry not found');
        }

        return new AboutUsResponse({
            id: aboutUs._id,
            item: aboutUs.item,
            description: aboutUs.description
        });
    }catch(error){
        throw new Error('Error fetching About Us by ID: ' + error.message);
    }
}


export const updateAboutUs = async (id, dto) => {
    try{
        const abotUstUpdated = await AboutUs.findByIdAndUpdate(id);
        if (!abotUstUpdated) {
            throw new Error('No existe About Us con este ID');
        }

        abotUstUpdated.item = dto.item || abotUstUpdated.item;
        abotUstUpdated.description = dto.description || abotUstUpdated.description;

        const updatedAboutUs = await abotUstUpdated.save();
       
        const aboutUsResponse =  new AboutUsResponse({
            id: updatedAboutUs._id,
            item: updatedAboutUs.item,
            description: updatedAboutUs.description
        });

        return {message: 'About Us Updated', aboutUs: aboutUsResponse};
    
    }catch(error){
        throw new Error('Error updating About Us: ' + error.message);
    }
}

export const deleteAboutUs = async (id) => {
    try{
        const deletedAboutUs = await AboutUs.findByIdAndDelete(id);
        if (!deletedAboutUs) {
            throw new Error('No existe About Us con este ID');
        }

        return {message: 'About Us Deleted'};
    }catch(error){
        throw new Error('Error deleting About Us: ' + error.message);
    }
}