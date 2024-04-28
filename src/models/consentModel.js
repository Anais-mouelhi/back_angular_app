import mongoose from 'mongoose';

const ConsentSchema = new mongoose.Schema({
  sub: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const ConsentModel = mongoose.model('Consent', ConsentSchema);

export default ConsentModel;