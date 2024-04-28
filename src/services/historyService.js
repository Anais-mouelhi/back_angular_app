import HistoryModel from '../models/historyModel.js';

export const HistoryService = {

  async createWxRecord(req) {
    const { email, lat, lon, city, weather, airQuality, user } = req.body;

    try {
        // Appel au service météo pour enrichir les données
        const newRecord = new HistoryModel({
        email,
        lat,
        lon,
        city,
        weather,
        airQuality
        });
        await newRecord.save();
        return newRecord;
    } catch (err) {
        throw new Error(err.message);
    }
  },

  async retrieveUserHistory(email) {
    return HistoryModel.find({email}).sort({createdAt: -1}).limit(20);
  },

  async deleteHistory(email) {
    return HistoryModel.deleteMany({email})
  }

}