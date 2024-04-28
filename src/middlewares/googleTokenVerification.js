import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

export const verifyGoogleToken = async (req, res, next) => {

  const token = req.headers['authorization'].split(' ')[1];
//   console.log('Token:', token);

  if (!token) {
      return res.status(403).json({ message: 'Token non fourni.' });
  }

  try {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const userId = payload['sub']; 

      // console.log('Sub:', userId);
      req.user = { userId }; 
      next();
  } catch (err) {
      console.error('Erreur de validation du token Google:', err);
      return res.status(401).json({ message: 'Échec de l\'authentification du token Google.' });
  }
};
