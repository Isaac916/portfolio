/**
 * =========================================
 * EMAILJS - FORMULARIO DE CONTACTO
 * Isaac Abarca Portfolio
 * =========================================
 */

(function() {
    'use strict';

    // =============================================
    // CONFIGURACIÓN - CARGAR DESDE CONFIG.JS
    // =============================================
    
    // Esperar a que el DOM y las dependencias estén listas
    function initContactForm() {
        
        // Verificar que CONFIG existe (cargado desde config.js)
        if (typeof CONFIG === 'undefined') {
            console.error('❌ Configuración no encontrada. Asegúrate de que js/config.js existe.');
            console.error('   Copia js/config.example.js a js/config.js y añade tus claves.');
            showFormError('Error de configuración. Contacta con el administrador.');
            return;
        }

        const { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } = CONFIG;

        // Verificar que las claves existen
        if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
            console.error('❌ Claves de EmailJS incompletas. Revisa js/config.js');
            showFormError('Error de configuración. Contacta con el administrador.');
            return;
        }

        // Verificar que EmailJS está disponible
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS no está cargado. Verifica el script en index.html');
            showFormError('Error al cargar el servicio de email. Intenta de nuevo más tarde.');
            return;
        }

        // =============================================
        // INICIALIZAR EMAILJS
        // =============================================
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS inicializado correctamente');

        // =============================================
        // REFERENCIAS DEL DOM
        // =============================================
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

        // Si no hay formulario, salir
        if (!contactForm) {
            console.warn('⚠️  Formulario de contacto no encontrado en la página');
            return;
        }

        // =============================================
        // VALIDACIONES
        // =============================================

        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            return regex.test(email);
        }

        function validateForm(name, email, message) {
            const errors = [];

            if (!name || name.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
            }

            if (!email || !isValidEmail(email)) {
                errors.push('Introduce un email válido (ej: nombre@dominio.com)');
            }

            if (!message || message.trim().length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
            }

            return errors;
        }

        // =============================================
        // NOTIFICACIONES TOAST
        // =============================================

        function showNotification(message, type = 'success') {
            // Eliminar notificación existente
            const existing = document.querySelector('.notification');
            if (existing) {
                existing.remove();
            }

            // Crear notificación
            const notification = document.createElement('div');
            notification.className = `notification notification--${type}`;
            
            const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';
            
            notification.innerHTML = `
                <span class="notification__icon">${icon}</span>
                <span class="notification__text">${message}</span>
                <button class="notification__close" aria-label="Cerrar notificación">×</button>
            `;

            document.body.appendChild(notification);

            // Animar entrada
            requestAnimationFrame(() => {
                notification.classList.add('notification--show');
            });

            // Botón de cerrar
            const closeBtn = notification.querySelector('.notification__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    hideNotification(notification);
                });
            }

            // Auto-ocultar después de 6 segundos
            const timeout = setTimeout(() => {
                hideNotification(notification);
            }, 6000);

            // Guardar timeout en el elemento para limpiarlo si se cierra antes
            notification._timeout = timeout;
        }

        function hideNotification(notification) {
            if (!notification) return;
            
            // Limpiar timeout si existe
            if (notification._timeout) {
                clearTimeout(notification._timeout);
            }

            notification.classList.remove('notification--show');
            
            // Eliminar después de la animación
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }

        // =============================================
        // MOSTRAR ERRORES EN EL FORMULARIO
        // =============================================

        function showFormErrors(errors) {
            // Eliminar errores anteriores
            const existingErrors = contactForm.querySelector('.form-errors');
            if (existingErrors) {
                existingErrors.remove();
            }

            // Crear lista de errores
            const errorsContainer = document.createElement('div');
            errorsContainer.className = 'form-errors';
            errorsContainer.setAttribute('role', 'alert');
            
            errorsContainer.innerHTML = `
                <div class="form-errors__header">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>Por favor, corrige lo siguiente:</span>
                </div>
                <ul class="form-errors__list">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            `;

            // Insertar antes del botón
            submitBtn.parentNode.insertBefore(errorsContainer, submitBtn);

            // Scroll a los errores
            errorsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Eliminar después de 8 segundos
            setTimeout(() => {
                if (errorsContainer.parentNode) {
                    errorsContainer.style.opacity = '0';
                    errorsContainer.style.transform = 'translateY(-10px)';
                    setTimeout(() => errorsContainer.remove(), 300);
                }
            }, 8000);
        }

        function showFormError(message) {
            showFormErrors([message]);
        }

        // =============================================
        // RESETEAR ESTADO DEL BOTÓN
        // =============================================

        function resetButton(btn, originalHTML, delay = 3000) {
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.disabled = false;
            }, delay);
        }

        // =============================================
        // ENVIAR EMAIL
        // =============================================

        async function sendEmail(name, email, message) {
            const templateParams = {
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
            };

            try {
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams
                );

                console.log('✅ Email enviado exitosamente:', response.status, response.text);
                return { success: true };
                
            } catch (error) {
                console.error('❌ Error al enviar email:', error);
                
                // Mensaje de error amigable según el tipo
                let errorMessage = 'Error al enviar el mensaje. Intenta de nuevo.';
                
                if (error.text?.includes('service not found')) {
                    errorMessage = 'Error de configuración del servicio. Contacta con el administrador.';
                } else if (error.text?.includes('template not found')) {
                    errorMessage = 'Error en la plantilla de email. Contacta con el administrador.';
                } else if (error.text?.includes('invalid key')) {
                    errorMessage = 'Error de autenticación. Contacta con el administrador.';
                } else if (error.text?.includes('network')) {
                    errorMessage = 'Error de conexión. Verifica tu internet e intenta de nuevo.';
                }
                
                return { success: false, message: errorMessage };
            }
        }

        // =============================================
        // MANEJAR ENVÍO DEL FORMULARIO
        // =============================================

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Eliminar errores anteriores
            const existingErrors = contactForm.querySelector('.form-errors');
            if (existingErrors) existingErrors.remove();

            // Obtener valores
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Validar
            const errors = validateForm(name, email, message);
            if (errors.length > 0) {
                showFormErrors(errors);
                
                // Destacar campos con error
                if (!name || name.length < 2) nameInput?.classList.add('input-error');
                if (!email || !isValidEmail(email)) emailInput?.classList.add('input-error');
                if (!message || message.length < 10) messageInput?.classList.add('input-error');
                
                // Quitar destacado al escribir
                setTimeout(() => {
                    nameInput?.classList.remove('input-error');
                    emailInput?.classList.remove('input-error');
                    messageInput?.classList.remove('input-error');
                }, 3000);
                
                return;
            }

            // Guardar HTML original del botón
            const originalHTML = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;

            // Estado: Enviando
            submitBtn.innerHTML = `
                <span>Enviando</span>
                <span class="sending-dots">
                    <span class="sending-dot"></span>
                    <span class="sending-dot"></span>
                    <span class="sending-dot"></span>
                </span>
            `;
            submitBtn.disabled = true;

            // Enviar email
            const result = await sendEmail(name, email, message);

            if (result.success) {
                // Éxito
                submitBtn.innerHTML = '<span>¡Mensaje Enviado!</span><i class="fas fa-check"></i>';
                submitBtn.style.background = '#22c55e';
                
                // Limpiar formulario
                contactForm.reset();
                
                // Notificación
                showNotification(
                    '¡Gracias por tu mensaje! Te responderé lo antes posible. 🚀',
                    'success'
                );

                // Resetear botón
                resetButton(submitBtn, originalHTML, 4000);
                
            } else {
                // Error
                submitBtn.innerHTML = '<span>Error al enviar</span><i class="fas fa-exclamation-triangle"></i>';
                submitBtn.style.background = '#ef4444';
                
                // Notificación
                showNotification(
                    result.message || 'Error al enviar. Intenta de nuevo o escríbeme directamente.',
                    'error'
                );

                // Resetear botón
                resetButton(submitBtn, originalHTML, 4000);
            }
        });

        // =============================================
        // LIMPIAR ERRORES AL ESCRIBIR
        // =============================================

        [nameInput, emailInput, messageInput].forEach(input => {
            if (!input) return;
            
            input.addEventListener('input', () => {
                input.classList.remove('input-error');
                
                // Eliminar mensaje de errores si existe
                const formErrors = contactForm.querySelector('.form-errors');
                if (formErrors) {
                    formErrors.style.opacity = '0';
                    formErrors.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (formErrors.parentNode) formErrors.remove();
                    }, 300);
                }
            });
        });

        console.log('✅ Formulario de contacto listo');
    }

    // =============================================
    // INICIAR CUANDO TODO ESTÉ LISTO
    // =============================================

    // Verificar si EmailJS ya está cargado
    if (typeof emailjs !== 'undefined') {
        // EmailJS ya cargado, iniciar directamente
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initContactForm);
        } else {
            initContactForm();
        }
    } else {
        // Esperar a que EmailJS se cargue
        window.addEventListener('load', () => {
            // Dar un pequeño delay para asegurar que todo está listo
            setTimeout(initContactForm, 500);
        });
    }

})();
