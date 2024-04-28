import ConsentModel from "../models/consentModel.js";

export const ConsentService= {

  async CheckOrStoreConsent(sub, email) {
    try {
      // on verifie l'enregistrement du consentement de l'utilisateur
      const userConsent = await ConsentModel.find({sub});
      if(userConsent.length){
         return; 
      }

      // on enregistre le consentement
      const newConsent = new ConsentModel({
      sub,
      email
      });
      await newConsent.save();
      return 1;
    } catch (err) {
        throw new Error(err.message);
    }
  }

}