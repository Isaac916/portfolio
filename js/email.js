/**
 * =========================================
 * EMAILJS - VERCEL + LOCAL
 * =========================================
 */

(async function() {
    'use strict';

    // =============================================
    // CARGAR CONFIGURACIÓN
    // =============================================
    
    function getConfig() {
        // 1. Vercel: variables inyectadas en window.ENV
        if (window.ENV && window.ENV.EMAILJS_PUBLIC_KEY) {
            console.log('☁️  Usando variables de Vercel');
            return window.ENV;
        }
        
        // 2. Local: variable global CONFIG de config.js
        if (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY && CONFIG.EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_REAL_AQUI') {
            console.log('🏠 Usando config.js local');
            return CONFIG;
        }
        
        // 3. Error
        console.error('❌ No se encontró configuración');
        return null;
    }
    
    const config = getConfig();
    
    if (!config || !config.EMAILJS_PUBLIC_KEY) {
        console.error('❌ EmailJS no configurado');
        console.error('   Vercel: Añade variables en Settings → Environment Variables');
        console.error('   Local:  Crea js/config.js desde js/config.example.js');
        return;
    }
    
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no cargado');
        return;
    }
    
    // Inicializar
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS listo');
    
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } = config;
    
    // =============================================
    // FORMULARIO
    // =============================================
    
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!submitBtn) return;
    
    // Validar
    function validate(name, email, message) {
        const errors = [];
        if (!name || name.trim().length < 2) errors.push('Nombre (mín. 2 caracteres)');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.push('Email válido');
        if (!message || message.trim().length < 10) errors.push('Mensaje (mín. 10 caracteres)');
        return errors;
    }
    
    // Toast
    function toast(message, type = 'success') {
        const old = document.querySelector('.toast');
        if (old) old.remove();
        
        const t = document.createElement('div');
        t.className = `toast toast--${type}`;
        t.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
        document.body.appendChild(t);
        
        requestAnimationFrame(() => t.classList.add('toast--show'));
        setTimeout(() => {
            t.classList.remove('toast--show');
            setTimeout(() => t.remove(), 300);
        }, 5000);
    }
    
    // Enviar
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';
        
        const errors = validate(name, email, message);
        if (errors.length > 0) {
            toast(errors.join(' · '), 'error');
            return;
        }
        
        const origHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name,
                reply_to: email,
                message: message,
                to_name: 'Isaac'
            });
            
            submitBtn.innerHTML = '<span>¡Enviado!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = '#22c55e';
            form.reset();
            toast('¡Gracias! Te responderé pronto 🚀', 'success');
            
        } catch (err) {
            console.error(err);
            submitBtn.innerHTML = '<span>Error</span><i class="fas fa-times"></i>';
            submitBtn.style.background = '#ef4444';
            toast('Error. Intenta de nuevo o escríbeme directamente.', 'error');
        }
        
        setTimeout(() => {
            submitBtn.innerHTML = origHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
})();
