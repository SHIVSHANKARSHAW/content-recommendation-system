import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    tags: [{ type: String }],
    contentUrl: String,
    lowResUrl: String,
    metadata: { type: Object },
    createdAt: { type: Date, default: Date.now }
});

contentSchema.index({ tags: 1 });


const Content = mongoose.model('Content', contentSchema);

export default Content;