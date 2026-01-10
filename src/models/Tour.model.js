import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    tid: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
});

const Tour = mongoose.models.tour || mongoose.model('tour', tourSchema);

export default Tour;