import express from 'express';
import connectDB from './src/config/db.js';
import './src/models/aboutUs.js'
import './src/models/offer.js'
import './src/models/orders.js'
import './src/models/payment.js'
import './src/models/products.js'
import './src/models/recipes.js'
import './src/models/users.js'



const app = express()   
const PORT = process.env.PORT || 4000; 



app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
app.use(express.json())

connectDB();