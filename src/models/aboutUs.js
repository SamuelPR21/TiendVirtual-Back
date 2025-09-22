import mongoose from 'mongoose';

const AboutUsSchema = new mongoose.Schema({
    Item: { type: String, required: true },
    Description: { type: String, required: true },

});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
export default AboutUs