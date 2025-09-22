import mongoose from "mongoose";

const connectDB = async () => {
  console.log("🔌 Conectando a MongoDB...");

  try {
    await mongoose.connect("mongodb://localhost:27017/carniceria", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");

    const modelNames = Object.keys(mongoose.models);
    for (const modelName of modelNames) {
      await mongoose.models[modelName].syncIndexes();
      console.log(`🔄 Índices actualizados para el modelo: ${modelName}`);
    }

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Desconectado de MongoDB, intentando reconectar...");
      setTimeout(connectDB, 3000); // reconecta cada 3s
    });

  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
