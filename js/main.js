/**
 * =========================================
 * PORTFOLIO PREMIUM – ISAAC ABARCA
 * Animaciones, cursor, preloader y más.
 * =========================================
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ----- DOM ELEMENTS -----
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const typingElement = document.getElementById('typing');
    const contactForm = document.getElementById('contactForm');
    const langToggle = document.getElementById('langToggle');
    const particlesContainer = document.getElementById('particles');

    // ----- PRELOADER -----
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            document.body.classList.remove('loading');
            initParticles();
        }, 1500);
    });

    // ----- HEADER SCROLL -----
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // ----- MENU TOGGLE -----
    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav--open');
        menuToggle.classList.toggle('menu-toggle--active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
            menuToggle.classList.remove('menu-toggle--active');
            document.body.style.overflow = '';
        });
    });

    // ----- CURSOR -----
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorFollower.style.left = e.clientX - 16 + 'px';
            cursorFollower.style.top = e.clientY - 16 + 'px';
        });

        document.querySelectorAll('a, button, .project-card, .contact-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hidden');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hidden');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ----- TYPING EFFECT -----
    const roles = [
        'Desarrollador de Software',
        'Ingeniero de Machine Learning',
        'Apasionado por la IA',
        'Desarrollador Full Stack'
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        typingElement.textContent = currentRole.substring(0, charIndex);
        
        if (!isDeleting && charIndex < currentRole.length) {
            charIndex++;
            setTimeout(typeEffect, 80);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 40);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, isDeleting ? 1500 : 500);
        }
    }

    setTimeout(typeEffect, 1500);

    // ----- PARTICLES -----
    function initParticles() {
        if (!particlesContainer) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 8 + 4 + 's';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ----- SCROLL REVEAL -----
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animar barras de skills
                if (entry.target.closest('.skill-category')) {
                    entry.target.querySelectorAll('.skill-bar__fill').forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.setProperty('--target-width', width + '%');
                        bar.classList.add('animated');
                    });
                }
                
                // Animar contadores
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('[data-count]');
                    if (numberEl && !numberEl.classList.contains('counted')) {
                        numberEl.classList.add('counted');
                        animateCounter(numberEl);
                    }
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-scroll-reveal]').forEach(el => revealObserver.observe(el));

    // ----- COUNTER ANIMATION -----
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        update();
    }

    // ----- CONTACT FORM -----
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<span>¡Mensaje Enviado!</span><i class="fas fa-check"></i>';
                btn.style.background = '#22c55e';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ----- LANGUAGE TOGGLE -----
    let currentLang = 'es';
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        langToggle.querySelector('.lang-toggle__text').textContent = currentLang === 'es' ? 'EN' : 'ES';
        translatePage(currentLang);
    });

    // ----- SMOOTH SCROLL -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('✨ Portfolio premium inicializado');
});

// ----- TRANSLATIONS -----
function translatePage(lang) {
    const translations = {
        es: {},
        en: {}
    };
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang]?.[key]) {
            el.textContent = translations[lang][key];
        }
    });
}
