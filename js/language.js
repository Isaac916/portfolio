/**
 * =========================================
 * SISTEMA DE TRADUCCIÓN – ISAAC ABARCA
 * =========================================
 */

const translations = {
    es: {},
    en: {}
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'es';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        langToggle.querySelector('.lang-toggle__text').textContent = lang === 'es' ? 'EN' : 'ES';
    }
    
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'es' ? 'en' : 'es');
    });
    
    setLanguage(currentLang);
});
