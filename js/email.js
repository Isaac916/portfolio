/**
 * =========================================
 * EMAILJS - CARGANDO CONFIG DESDE API
 * =========================================
 */

(async function() {
    'use strict';

    // =============================================
    // CARGAR CONFIGURACIÓN DESDE LA API DE VERCEL
    // =============================================
    
    let CONFIG = null;
    
    async function loadConfig() {
        try {
            // En desarrollo local, usar config.js
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                if (typeof CONFIG !== 'undefined') {
                    console.log('✅ Usando config.js local');
                    return window.CONFIG || CONFIG;
                }
            }
            
            // En producción, cargar desde la API de Vercel
            console.log('🔄 Cargando configuración desde API...');
            const response = await fetch('/api/config');
            
            if (!response.ok) {
                throw new Error('Error al cargar configuración');
            }
            
            CONFIG = await response.json();
            console.log('✅ Configuración cargada desde Vercel');
            return CONFIG;
            
        } catch (error) {
            console.error('❌ Error cargando configuración:', error);
            
            // Fallback: intentar usar CONFIG global (definido en config.js)
            if (typeof CONFIG !== 'undefined' && CONFIG) {
                console.warn('⚠️  Usando config.js como fallback');
                return CONFIG;
            }
            
            return null;
        }
    }
    
    // Cargar configuración
    const config = await loadConfig();
    
    if (!config || !config.EMAILJS_PUBLIC_KEY) {
        console.error('❌ No se pudo cargar la configuración de EmailJS');
        return;
    }
    
    // Inicializar EmailJS
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS inicializado');
    
    // =============================================
    // RESTO DEL CÓDIGO DEL FORMULARIO...
    // (El mismo código de validación y envío de antes)
    // =============================================
    
    const contactForm = document.getElementById('contactForm');
    // ... todo el código del formulario ...
    
})();
