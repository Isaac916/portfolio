/**
 * =========================================
 * API CONFIG - VERCEL SERVERLESS FUNCTION
 * api/config.js
 * =========================================
 */

export default function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Devolver configuración (las variables de entorno están seguras en el servidor)
    res.status(200).json({
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID
    });
}
