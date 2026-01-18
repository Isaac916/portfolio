// =====================
// DOM ELEMENTS
// =====================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');
const typingElement = document.querySelector('.typing-text');

// =====================
// NAVBAR TOGGLE
// =====================
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// =====================
// HEADER SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// =====================
// ACTIVE LINK ON SCROLL
// =====================
const sections = document.querySelectorAll('section[id]');

const handleScroll = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', handleScroll);

// =====================
// TYPING EFFECT
// =====================
const roles = ['Desarrollador de Software', 'Ingeniero de Machine Learning', 'Apasionado por la IA', 'Desarrollador Full Stack'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  } else {
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }
};

// =====================
// SKILLS ANIMATION - SOLO UNA VEZ
// =====================
let skillsAnimated = false;

const animateSkills = () => {
  if (skillsAnimated) return;
  
  const skillBars = document.querySelectorAll('.skill-level');
  
  skillBars.forEach((bar, index) => {
    // Guardar el ancho original del inline style
    const originalWidth = bar.getAttribute('data-original-width') || bar.style.width;
    
    // Iniciar en 0
    bar.style.width = '0';
    bar.style.opacity = '1';
    
    // Animar al ancho original con delay escalonado
    setTimeout(() => {
      bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      bar.style.width = originalWidth;
    }, 300 + (index * 150)); // Efecto escalonado
  });
  
  skillsAnimated = true;
};

// =====================
// INITIALIZE SKILL BARS
// =====================
const initializeSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-level');
  
  skillBars.forEach(bar => {
    // Guardar el ancho original en un atributo data
    const originalWidth = bar.style.width;
    bar.setAttribute('data-original-width', originalWidth);
    
    // Ocultar inicialmente
    bar.style.opacity = '0';
    bar.style.width = '0';
  });
};

// =====================
// CHECK IF SKILLS SECTION IS VISIBLE
// =====================
const checkSkillsVisibility = () => {
  if (skillsAnimated) return;
  
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  const rect = skillsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Si la sección está visible en el viewport
  if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
    animateSkills();
  }
};

// =====================
// FORM SUBMISSION
// =====================
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el formulario
    // Por ahora solo mostraremos una alerta
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    contactForm.reset();
  });
}

// =====================
// SCROLL REVEAL ANIMATIONS (para otras secciones)
// =====================
const revealElements = () => {
  const reveals = document.querySelectorAll('.section-title:not(#skills .section-title), .project-card, .timeline-item, .education-card');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
  
  // Verificar si las habilidades son visibles
  checkSkillsVisibility();
};

// Añadir estilos para la animación de revelación
const style = document.createElement('style');
style.textContent = `
  .project-card,
  .timeline-item,
  .education-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .skill-category {
    opacity: 1;
    transform: translateY(0);
  }
  
  .skill-level {
    opacity: 0;
    transition: opacity 0.3s ease, width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

// =====================
// PAGE LOAD ANIMATION
// =====================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
    
    // Inicializar las barras de habilidades
    initializeSkillBars();
    
    // Verificar si las habilidades ya son visibles al cargar
    setTimeout(() => {
      checkSkillsVisibility();
    }, 500);
    
    // Iniciar efecto typing
    setTimeout(typeEffect, 1000);
    
    // Iniciar animaciones de revelación
    revealElements();
  }, 100);
});

// =====================
// SCROLL EVENT LISTENERS
// =====================
let scrollTimeout;
window.addEventListener('scroll', () => {
  revealElements();
  
  // Debounce para mejorar rendimiento
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    checkSkillsVisibility();
  }, 100);
});

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// =====================
// RESET ANIMATIONS ON PAGE RELOAD
// =====================
// Guardar en sessionStorage para evitar reanimación durante la misma sesión
if (performance.navigation.type === performance.navigation.TYPE_RELOAD ||
    performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
  // La página se recargó o se navegó con el botón atrás/adelante
  sessionStorage.removeItem('skillsAnimated');
}

// =====================
// INITIALIZE
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Activar sección actual en carga inicial
  handleScroll();
  
  // Cargar estado de animación desde sessionStorage
  skillsAnimated = sessionStorage.getItem('skillsAnimated') === 'true';
  
  // Si ya se animaron, establecer los valores finales
  if (skillsAnimated) {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
      const originalWidth = bar.getAttribute('data-original-width') || bar.style.width;
      bar.style.opacity = '1';
      bar.style.width = originalWidth;
      bar.style.transition = 'none'; // Sin transición
    });
  }
});