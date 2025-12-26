const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Added cors
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config();
connectDB();

const app = express();

// Enable CORS for frontend origin
app.use(
  cors({
    origin: [process.env.FRONTEND_URL,"https://ayah-archive-frontend.vercel.app","http://localhost:5173"], // Allow requests from Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/verses", require("./routes/verseRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use('/api/quran', require('./routes/quranRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
