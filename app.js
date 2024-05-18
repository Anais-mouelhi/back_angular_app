const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

//////////////////////////////////
// permettre l'accès à l'API (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token,Origin, X-Requested-With, Content, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Proxy pour rediriger les demandes météorologiques vers l'API OpenWeather
app.use('/weather', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: false,
    pathRewrite: {
        '^/weather': '/data/2.5/weather'
    }
}));

// Proxy pour rediriger les demandes d'indice de pollution de l'air vers l'API OpenWeather
app.use('/air_pollution', createProxyMiddleware({
    target: 'https://api.openweathermap.org',
    changeOrigin: false,
    pathRewrite: {
        '^/air_pollution': '/data/2.5/air_pollution/forecast'
    }
}));

app.post('/history/add', (req, res) => {
    // Code pour enregistrer les données reçues dans la requête
    res.status(200).json({ message: "Data saved successfully!" });
});

app.use((req, res) => {
    res.json({ message: "UPDATE !" }); 
});

module.exports = app;
