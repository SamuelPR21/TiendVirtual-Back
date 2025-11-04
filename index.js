import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './src/config/db.js';
import './src/models/aboutUs.js';
import './src/models/offerts.js';
import './src/models/orders.js';
import './src/models/payment.js';
import './src/models/products.js';
import './src/models/recipes.js';
import './src/models/users.js';
import routes from './src/routes/indexRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;



app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.use(express.json())
app.use(cookieParser());



// 3) Rutas
app.use('/carniceria', routes);
app.get('/', (_req, res) => {
  res.send('¡Bienvenio al servidor backend de carnicería!');
});

// 4) Conexión DB y listen
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
