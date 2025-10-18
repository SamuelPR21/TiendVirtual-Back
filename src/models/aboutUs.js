import mongoose from 'mongoose';

const AboutUsSchema = new mongoose.Schema({
    item: { type: String, required: true },
    description: { type: String, required: true },

});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
export default AboutUs