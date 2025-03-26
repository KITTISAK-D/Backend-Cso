const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api"); // ✅ นำเข้า api.js (รวมทุก route)

dotenv.config();

const app = express();

connectDB()
  .then(async () => {
    app.use(morgan("dev"));
    app.use(express.json());

    // ✅ ชี้ /api ไปยัง apiRoutes ที่รวม userRoutes + robotRoutes
    app.use("/api", apiRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error);
  });
