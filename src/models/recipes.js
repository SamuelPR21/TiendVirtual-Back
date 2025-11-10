import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
})

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructions: { type: String, required: true },
    ingredients: { type: [IngredientSchema], required: true },
    image_url: { type: String },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;