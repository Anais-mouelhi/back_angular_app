import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  email: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  city: {type: String, required: true},
  weather: { type: Object },
  airQuality: { type: Object },
}, { timestamps: true });

const HistoryModel = mongoose.model('History', historySchema);

export default HistoryModel;
