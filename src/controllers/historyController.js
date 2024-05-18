import ConsentModel from '../models/consentModel.js';
import { HistoryService } from '../services/historyService.js';
import { ConsentService } from '../services/consentService.js';

export const createHistory = async (req, res) => {
    const sub = req.user.userId;
    try {
        // on vérifie que le consentement de l'utilisateur
        // est enregistré sinon on l'enregistre.
        await ConsentService.CheckOrStoreConsent(sub, req.body.email);
        
        // on enregistre les données météo
        try {
            const newRecord = await HistoryService.createWxRecord(req);
            res.status(201).json(newRecord);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getHistory = async (req, res) => {
    const email = req.body.email;
    try {
        const userHistory = await HistoryService.retrieveUserHistory(email);
        res.status(200).json(userHistory);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteHistory = async (req, res) => {
    const email = req.body.email;
    try {
        await HistoryService.deleteHistory(email);
        res.status(200).json({message: "User history removed"});
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}