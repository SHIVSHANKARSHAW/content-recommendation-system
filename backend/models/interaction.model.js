import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Content' },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now },
    context: {
        deviceType: String,
        networkSpeed: Number,
        location: { lat: Number, lng: Number },
        weather: String
    }
});

interactionSchema.index({ userId: 1, timestamp: -1 });

const Interaction =  mongoose.model('Interaction', interactionSchema);

export default Interaction;