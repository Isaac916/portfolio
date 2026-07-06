/**
 * =========================================
 * SISTEMA DE TRADUCCIÓN FUNCIONAL
 * =========================================
 */

const translations = {
    es: {
        // Nav
        "Sobre mí": "Sobre mí",
        "Skills": "Skills",
        "Proyectos": "Proyectos",
        "Experiencia": "Experiencia",
        "Estudios": "Estudios",
        "Contacto": "Contacto",
        
        // Hero
        "Hola, soy": "Hola, soy",
        "Transformo ideas complejas en soluciones digitales elegantes.": "Transformo ideas complejas en soluciones digitales elegantes.",
        "Explorar proyectos": "Explorar proyectos",
        "Contactar": "Contactar",
        "Disponible para proyectos": "Disponible para proyectos",
        
        // About
        "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.": "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.",
        "Proyectos Completados": "Proyectos Completados",
        "Años de Experiencia": "Años de Experiencia",
        "Compromiso": "Compromiso",
        
        // Skills
        "Frontend": "Frontend",
        "Backend": "Backend",
        "Herramientas": "Herramientas",
        "IA & Data": "IA & Data",
        
        // Projects
        "Visitar Web": "Visitar Web",
        "Demo": "Demo",
        "Código": "Código",
        "Próximamente": "Próximamente",
        
        // Experience
        "Desarrollador Software": "Desarrollador Software",
        "Freelance": "Freelance",
        "Presente": "Presente",
        
        // Contact
        "¿Interesado en colaborar o tienes un proyecto en mente?": "¿Interesado en colaborar o tienes un proyecto en mente?",
        "Email": "Email",
        "GitHub": "GitHub",
        "LinkedIn": "LinkedIn",
        "Ubicación": "Ubicación",
        "Disponible para trabajo remoto": "Disponible para trabajo remoto",
        "Nombre": "Nombre",
        "Mensaje": "Mensaje",
        "Cuéntame sobre tu proyecto...": "Cuéntame sobre tu proyecto...",
        "Enviar Mensaje": "Enviar Mensaje",
        
        // Footer
        "Desarrollando el futuro, una línea de código a la vez.": "Desarrollando el futuro, una línea de código a la vez.",
        "© 2024 Isaac Abarca. Todos los derechos reservados.": "© 2024 Isaac Abarca. Todos los derechos reservados."
    },
    
    en: {
        // Nav
        "Sobre mí": "About Me",
        "Skills": "Skills",
        "Proyectos": "Projects",
        "Experiencia": "Experience",
        "Estudios": "Education",
        "Contacto": "Contact",
        
        // Hero
        "Hola, soy": "Hi, I'm",
        "Transformo ideas complejas en soluciones digitales elegantes.": "I transform complex ideas into elegant digital solutions.",
        "Explorar proyectos": "Explore Projects",
        "Contactar": "Contact",
        "Disponible para proyectos": "Available for projects",
        
        // About
        "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.": "Software Developer passionate about creating technological solutions that make a difference.",
        "Proyectos Completados": "Projects Completed",
        "Años de Experiencia": "Years of Experience",
        "Compromiso": "Commitment",
        
        // Skills
        "Frontend": "Frontend",
        "Backend": "Backend",
        "Herramientas": "Tools",
        "IA & Data": "AI & Data",
        
        // Projects
        "Visitar Web": "Visit Website",
        "Demo": "Demo",
        "Código": "Code",
        "Próximamente": "Coming Soon",
        
        // Experience
        "Desarrollador Software": "Software Developer",
        "Freelance": "Freelance",
        "Presente": "Present",
        
        // Contact
        "¿Interesado en colaborar o tienes un proyecto en mente?": "Interested in collaborating or have a project in mind?",
        "Email": "Email",
        "GitHub": "GitHub",
        "LinkedIn": "LinkedIn",
        "Ubicación": "Location",
        "Disponible para trabajo remoto": "Available for remote work",
        "Nombre": "Name",
        "Mensaje": "Message",
        "Cuéntame sobre tu proyecto...": "Tell me about your project...",
        "Enviar Mensaje": "Send Message",
        
        // Footer
        "Desarrollando el futuro, una línea de código a la vez.": "Building the future, one line of code at a time.",
        "© 2024 Isaac Abarca. Todos los derechos reservados.": "© 2024 Isaac Abarca. All rights reserved."
    }
};

let currentLang = 'es';

function translatePage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // Traducir elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    
    // Actualizar botón de idioma
    const langText = document.querySelector('.lang-toggle__text');
    if (langText) {
        langText.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    
    // Guardar preferencia
    localStorage.setItem('preferredLang', lang);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    
    translatePage(savedLang);
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'es' ? 'en' : 'es';
            translatePage(newLang);
        });
    }
});
