/**
 * =========================================
 * EMAILJS - FORMULARIO SEGURO
 * Isaac Abarca Portfolio
 * =========================================
 */

(async function() {
    'use strict';

    // =============================================
    // CONFIGURACIÓN DE SEGURIDAD
    // =============================================
    
    const SECURITY = {
        MAX_NAME_LENGTH: 100,
        MAX_EMAIL_LENGTH: 150,
        MAX_MESSAGE_LENGTH: 5000,
        MIN_MESSAGE_LENGTH: 10,
        RATE_LIMIT_MS: 10000,     // 10 segundos entre envíos
        HONEYPOT_FIELD: 'website'  // Campo trampa para bots
    };
    
    let lastSubmission = 0;
    
    // =============================================
    // CARGAR CONFIGURACIÓN
    // =============================================
    
    function getConfig() {
        if (window.ENV && window.ENV.EMAILJS_PUBLIC_KEY) return window.ENV;
        if (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY && CONFIG.EMAILJS_PUBLIC_KEY.length > 10) return CONFIG;
        return null;
    }
    
    const config = getConfig();
    if (!config || !config.EMAILJS_PUBLIC_KEY) return;
    if (typeof emailjs === 'undefined') return;
    
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } = config;
    
    // =============================================
    // SANITIZACIÓN DE INPUT
    // =============================================
    
    function sanitize(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    }
    
    function stripHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return false;
        
        // Bloquear emails temporales comunes
        const blockedDomains = ['tempmail.com', 'guerrillamail.com', '10minutemail.com', 'yopmail.com', 'mailinator.com'];
        const domain = email.split('@')[1]?.toLowerCase();
        if (blockedDomains.includes(domain)) return false;
        
        // Máximo 5 puntos en la parte local
        const localPart = email.split('@')[0];
        if ((localPart.match(/\./g) || []).length > 5) return false;
        
        return true;
    }
    
    function containsURLs(str) {
        const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/gi;
        return urlRegex.test(str);
    }
    
    function containsSQLInjection(str) {
        const sqlPatterns = /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b|\bALTER\b|\bEXEC\b)/i;
        return sqlPatterns.test(str);
    }
    
    function containsXSS(str) {
        const xssPatterns = /(<script|javascript:|on\w+\s*=|expression\s*\()/i;
        return xssPatterns.test(str);
    }
    
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
    
    // =============================================
    // VALIDACIÓN COMPLETA
    // =============================================
    
    function validate(name, email, message) {
        const errors = [];
        
        // Nombre
        if (!name || name.length < 2) {
            errors.push('Nombre (mín. 2 caracteres)');
        } else if (name.length > SECURITY.MAX_NAME_LENGTH) {
            errors.push(`Nombre (máx. ${SECURITY.MAX_NAME_LENGTH} caracteres)`);
        } else if (containsXSS(name) || containsSQLInjection(name)) {
            errors.push('Nombre contiene caracteres no permitidos');
        } else if (containsURLs(name)) {
            errors.push('El nombre no puede contener enlaces');
        }
        
        // Email
        if (!email) {
            errors.push('Email requerido');
        } else if (email.length > SECURITY.MAX_EMAIL_LENGTH) {
            errors.push(`Email (máx. ${SECURITY.MAX_EMAIL_LENGTH} caracteres)`);
        } else if (!isValidEmail(email)) {
            errors.push('Email no válido');
        }
        
        // Mensaje
        if (!message || message.length < SECURITY.MIN_MESSAGE_LENGTH) {
            errors.push(`Mensaje (mín. ${SECURITY.MIN_MESSAGE_LENGTH} caracteres)`);
        } else if (message.length > SECURITY.MAX_MESSAGE_LENGTH) {
            errors.push(`Mensaje (máx. ${SECURITY.MAX_MESSAGE_LENGTH} caracteres)`);
        } else if (containsXSS(message) || containsSQLInjection(message)) {
            errors.push('Mensaje contiene código no permitido');
        }
        
        return errors;
    }
    
    // =============================================
    // TOAST
    // =============================================
    
    function toast(message, type = 'success') {
        const old = document.querySelector('.toast');
        if (old) old.remove();
        
        const t = document.createElement('div');
        t.className = `toast toast--${type}`;
        t.setAttribute('role', 'alert');
        t.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
        document.body.appendChild(t);
        
        requestAnimationFrame(() => t.classList.add('toast--show'));
        setTimeout(() => {
            t.classList.remove('toast--show');
            setTimeout(() => t.remove(), 300);
        }, 5000);
    }
    
    // =============================================
    // RATE LIMITING
    // =============================================
    
    function isRateLimited() {
        const now = Date.now();
        if (now - lastSubmission < SECURITY.RATE_LIMIT_MS) {
            const waitSeconds = Math.ceil((SECURITY.RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
            toast(`Espera ${waitSeconds}s antes de enviar otro mensaje`, 'error');
            return true;
        }
        return false;
    }
    
    // =============================================
    // ENVIAR
    // =============================================
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Rate limiting
        if (isRateLimited()) return;
        
        // Verificar honeypot (campo oculto para bots)
        const honeypot = form.querySelector('[name="website"]');
        if (honeypot && honeypot.value) {
            // Es un bot, fingir éxito pero no enviar
            toast('¡Gracias! Te responderé pronto 🚀', 'success');
            form.reset();
            return;
        }
        
        // Obtener y sanitizar valores
        const rawName = nameInput?.value || '';
        const rawEmail = emailInput?.value || '';
        const rawMessage = messageInput?.value || '';
        
        const name = sanitize(stripHTML(rawName));
        const email = sanitize(rawEmail.toLowerCase());
        const message = sanitize(stripHTML(rawMessage));
        
        // Validar
        const errors = validate(name, email, message);
        if (errors.length > 0) {
            toast(errors.join(' · '), 'error');
            return;
        }
        
        // Actualizar última submission
        lastSubmission = Date.now();
        
        // Estado enviando
        const origHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: 'isaacabarcad@gmail.com',
                from_name: name,
                reply_to: email,
                message: message,
                to_name: 'Isaac',
                time: new Date().toLocaleString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            });
            
            submitBtn.innerHTML = '<span>¡Enviado!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = '#22c55e';
            form.reset();
            toast('¡Gracias! Te responderé pronto 🚀', 'success');
            
        } catch (err) {
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
