import app from "./app.js";
import 'dotenv/config';
import connectDB from "./config/db.config.js";
import cloudinaryConfig from "./config/cloudinary.config.js";

const PORT = process.env.PORT || 4000;
connectDB();
cloudinaryConfig();

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/`);
});