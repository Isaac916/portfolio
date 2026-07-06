/**
 * =========================================
 * INYECTAR VARIABLES DE ENTORNO DE VERCEL
 * Se ejecuta durante el build en Vercel
 * =========================================
 */

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'js', 'env.js');

const envConfig = {
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || '',
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || '',
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || ''
};

const content = `/**
 * GENERADO POR VERCEL - NO EDITAR MANUALMENTE
 */
window.ENV = ${JSON.stringify(envConfig, null, 2)};
`;

fs.writeFileSync(outputPath, content);
console.log('✅ js/env.js generado con variables de entorno');