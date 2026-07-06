/**
 * =========================================
 * EMAILJS - VERSIÓN DEPURACIÓN
 * =========================================
 */

(async function() {
    'use strict';

    console.log('🔍 INICIANDO DEPURACIÓN DE EMAILJS');
    console.log('─────────────────────────────────');

    // 1. Verificar window.ENV (Vercel)
    console.log('1️⃣  Verificando window.ENV:', window.ENV ? 'EXISTE ✅' : 'NO EXISTE ❌');
    if (window.ENV) {
        console.log('   PUBLIC_KEY:', window.ENV.EMAILJS_PUBLIC_KEY ? window.ENV.EMAILJS_PUBLIC_KEY.substring(0, 10) + '...' : 'VACÍO ❌');
        console.log('   SERVICE_ID:', window.ENV.EMAILJS_SERVICE_ID ? window.ENV.EMAILJS_SERVICE_ID : 'VACÍO ❌');
        console.log('   TEMPLATE_ID:', window.ENV.EMAILJS_TEMPLATE_ID ? window.ENV.EMAILJS_TEMPLATE_ID : 'VACÍO ❌');
    }

    // 2. Verificar CONFIG (Local)
    console.log('2️⃣  Verificando CONFIG:', typeof CONFIG !== 'undefined' ? 'EXISTE ✅' : 'NO EXISTE ❌');
    if (typeof CONFIG !== 'undefined') {
        console.log('   PUBLIC_KEY:', CONFIG.EMAILJS_PUBLIC_KEY ? CONFIG.EMAILJS_PUBLIC_KEY.substring(0, 10) + '...' : 'VACÍO ❌');
    }

    // 3. Verificar EmailJS cargado
    console.log('3️⃣  Verificando emailjs:', typeof emailjs !== 'undefined' ? 'CARGADO ✅' : 'NO CARGADO ❌');

    // 4. Obtener configuración final
    let config = null;
    if (window.ENV && window.ENV.EMAILJS_PUBLIC_KEY) {
        config = window.ENV;
        console.log('4️⃣  Usando: VERCEL');
    } else if (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY && CONFIG.EMAILJS_PUBLIC_KEY.length > 10) {
        config = CONFIG;
        console.log('4️⃣  Usando: LOCAL');
    } else {
        console.log('4️⃣  ERROR: Sin configuración válida');
    }

    if (!config || typeof emailjs === 'undefined') {
        console.error('❌ No se puede continuar');
        return;
    }

    // 5. Inicializar
    emailjs.init(config.EMAILJS_PUBLIC_KEY);
    console.log('5️⃣  EmailJS inicializado');

    // 6. Verificar formulario
    const form = document.getElementById('contactForm');
    console.log('6️⃣  Formulario:', form ? 'ENCONTRADO ✅' : 'NO ENCONTRADO ❌');

    if (!form) return;

    // 7. Configurar envío
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value || 'Test';
        const email = document.getElementById('email')?.value || 'test@test.com';
        const message = document.getElementById('message')?.value || 'Mensaje de prueba';

        console.log('─────────────────────────────────');
        console.log('📧 ENVIANDO EMAIL DE PRUEBA');
        console.log('   Service ID:', config.EMAILJS_SERVICE_ID);
        console.log('   Template ID:', config.EMAILJS_TEMPLATE_ID);
        console.log('   Datos:', { name, email, message });

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;
        }

        try {
            const result = await emailjs.send(
                config.EMAILJS_SERVICE_ID,
                config.EMAILJS_TEMPLATE_ID,
                {
                    to_email: 'isaacabarcad@gmail.com',
                    from_name: name,
                    reply_to: email,
                    message: message,
                    to_name: 'Isaac'
                }
            );

            console.log('✅ RESPUESTA DE EMAILJS:');
            console.log('   Status:', result.status);
            console.log('   Text:', result.text);
            console.log('─────────────────────────────────');

            alert('✅ Email enviado! Status: ' + result.status + '\nRevisa tu bandeja de entrada Y SPAM');

            if (submitBtn) {
                submitBtn.innerHTML = '¡Enviado! ✅';
                submitBtn.style.background = '#22c55e';
            }

        } catch (error) {
            console.error('❌ ERROR COMPLETO:');
            console.error('   Status:', error.status);
            console.error('   Text:', error.text);
            console.error('   Message:', error.message);
            console.error('   Stack:', error.stack);
            console.log('─────────────────────────────────');

            alert('❌ Error: ' + (error.text || error.message));

            if (submitBtn) {
                submitBtn.innerHTML = 'Error ❌';
                submitBtn.style.background = '#ef4444';
            }
        }

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.innerHTML = 'Enviar Mensaje';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }
        }, 5000);
    });

    console.log('✅ Formulario listo para pruebas');
    console.log('─────────────────────────────────');

})();
