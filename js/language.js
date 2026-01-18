// js/language.js
const translations = {
  es: {
    // Navbar
    "Sobre mí": "Sobre mí",
    "Habilidades": "Habilidades",
    "Proyectos": "Proyectos",
    "Experiencia": "Experiencia",
    "Estudios": "Estudios",
    "Contacto": "Contacto",
    
    // Hero
    "Hola, soy": "Hola, soy",
    "Desarrollador De Software": "Desarrollador De Software",
    "Creo experiencias digitales modernas, escalables y enfocadas en resultados. Me especializo en transformar ideas en soluciones tecnológicas efectivas.": 
      "Creo experiencias digitales modernas, escalables y enfocadas en resultados. Me especializo en transformar ideas en soluciones tecnológicas efectivas.",
    "Ver Proyectos": "Ver Proyectos",
    "Contactar": "Contactar",
    
    // About
    "Sobre Mí": "Sobre Mí",
    "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.": 
      "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.",
    "Con experiencia en el desarrollo de aplicaciones web modernas utilizando tecnologías como <strong>React</strong>, <strong>Node.js</strong> y <strong>Firebase</strong>. Me enfoco en escribir código limpio, mantenible y escalable, siempre buscando las mejores prácticas y patrones de diseño.":
      "Con experiencia en el desarrollo de aplicaciones web modernas utilizando tecnologías como <strong>React</strong>, <strong>Node.js</strong> y <strong>Firebase</strong>. Me enfoco en escribir código limpio, mantenible y escalable, siempre buscando las mejores prácticas y patrones de diseño.",
    "Mi objetivo es colaborar en proyectos desafiantes donde pueda aportar valor y seguir creciendo profesionalmente, combinando la innovación técnica con un impacto tangible en los usuarios.":
      "Mi objetivo es colaborar en proyectos desafiantes donde pueda aportar valor y seguir creciendo profesionalmente, combinando la innovación técnica con un impacto tangible en los usuarios.",
    "Proyectos Completados": "Proyectos Completados",
    "Años de Experiencia": "Años de Experiencia",
    "Compromiso": "Compromiso",
    
    // Skills
    "Habilidades Técnicas": "Habilidades Técnicas",
    "Frontend": "Frontend",
    "Backend": "Backend",
    "Herramientas": "Herramientas",
    "IA": "IA",
    
    // Projects
    "Proyectos Destacados": "Proyectos Destacados",
    "Full Stack": "Full Stack",
    "Procesamiento de Datos": "Procesamiento de Datos",
    "React": "React",
    "Plataforma Inmobiliaria": "Plataforma Inmobiliaria",
    "Analisis de Contaminacion": "Analisis de Contaminacion",
    "Gacha Tracker": "Gacha Tracker",
    "Visitar Web": "Visitar Web",
    "Demo": "Demo",
    "Código": "Código",
    "Demo(Próximamente)": "Demo(Próximamente)",
    
    // Project descriptions in Spanish
    "Pagina Web con CRM integrado, gestión de propiedades y clientes/Agentes. Desarrollada con WordPress personalizado y frontend moderno.<br><br>* Mejore la captacion de clientes en un 30% gracias al SEO que implemente.<br>* Integración de un sistema CRM personalizado para gestionar clientes y propiedades.<br>* Desarrollo de un frontend atractivo y funcional utilizando tecnologías web modernas.<br>* Implementación de formularios de contacto y suscripción con gestión de correo electrónico.<br>* Optimización del rendimiento y la seguridad del sitio web. Mejore la puntuacion SEO de 70 a 98.":
      "Pagina Web con CRM integrado, gestión de propiedades y clientes/Agentes. Desarrollada con WordPress personalizado y frontend moderno.<br><br>* Mejore la captacion de clientes en un 30% gracias al SEO que implemente.<br>* Integración de un sistema CRM personalizado para gestionar clientes y propiedades.<br>* Desarrollo de un frontend atractivo y funcional utilizando tecnologías web modernas.<br>* Implementación de formularios de contacto y suscripción con gestión de correo electrónico.<br>* Optimización del rendimiento y la seguridad del sitio web. Mejore la puntuacion SEO de 70 a 98.",
    
    "Proyecto de análisis de datos de contaminación ambiental utilizando técnicas de IA generativa.<br><br>* Recopilación y limpieza de grandes conjuntos de datos ambientales.<br>* Análisis exploratorio de datos para identificar patrones y tendencias.<br>* Implementación de modelos de machine learning para predecir niveles futuros de contaminación.<br>* Visualización interactiva de datos para facilitar la interpretación de resultados.":
      "Proyecto de análisis de datos de contaminación ambiental utilizando técnicas de IA generativa.<br><br>* Recopilación y limpieza de grandes conjuntos de datos ambientales.<br>* Análisis exploratorio de datos para identificar patrones y tendencias.<br>* Implementación de modelos de machine learning para predecir niveles futuros de contaminación.<br>* Visualización interactiva de datos para facilitar la interpretación de resultados.",
    
    "Pagina Web para llevar un control de diferentes ascpectos de unos juegos, con autenticación de usuarios y almacenamiento de datos en Firebase.<br><br>* Permite a los usuarios registrar y monitorear sus tiradas en juegos tipo gacha.<br>* Eventos en tiempo real para actualizaciones instantáneas.<br>* Optimización de llamadas al servidor para mejorar el rendimiento.<br>* Uso de localStorage para mejorar la experiencia del usuario.":
      "Pagina Web para llevar un control de diferentes ascpectos de unos juegos, con autenticación de usuarios y almacenamiento de datos en Firebase.<br><br>* Permite a los usuarios registrar y monitorear sus tiradas en juegos tipo gacha.<br>* Eventos en tiempo real para actualizaciones instantáneas.<br>* Optimización de llamadas al servidor para mejorar el rendimiento.<br>* Uso de localStorage para mejorar la experiencia del usuario.",
    
    // Experience
    "Experiencia Profesional": "Experiencia Profesional",
    "Desarrollador Software": "Desarrollador Software",
    "Freelance": "Freelance",
    "Creacion de Aplicación de escritorio para un Hotel": "Creacion de Aplicación de escritorio para un Hotel",
    "Practicas Grado Superior": "Practicas Grado Superior",
    "Gestion de bases de datos en un ayuntamiento": "Gestion de bases de datos en un ayuntamiento",
    "Practicas Grado Medio": "Practicas Grado Medio",
    "Actualidad": "Actualidad",
    
    // Experience descriptions
    "Desarrollo de aplicaciones web modernas con React y Node.js": "Desarrollo de aplicaciones web modernas con React y Node.js",
    "Implementación de APIs REST y sistemas de autenticación": "Implementación de APIs REST y sistemas de autenticación",
    "Optimización de rendimiento y SEO en proyectos web": "Optimización de rendimiento y SEO en proyectos web",
    "Gestion de bases de datos MySQL": "Gestion de bases de datos MySQL",
    "Creacion de aplicacion de escritorio con Visual Studio en C#": "Creacion de aplicacion de escritorio con Visual Studio en C#",
    "Sistemas de autenticación y seguridad de la aplicación": "Sistemas de autenticación y seguridad de la aplicación",
    "Instalacion de software de productos del ayuntamiento": "Instalacion de software de productos del ayuntamiento",
    "Gestion de redes del ayuntamiento": "Gestion de redes del ayuntamiento",
    
    // Education
    "Estudios & Certificaciones": "Estudios & Certificaciones",
    "Grado medio Desarrollo de Aplicaciones": "Grado medio Desarrollo de Aplicaciones",
    "Instituto / 2023": "Instituto / 2023",
    "Formación sólida en gestión de redes, bases de datos y desarrollo de aplicaciones.":
      "Formación sólida en gestión de redes, bases de datos y desarrollo de aplicaciones.",
    "Grado superior DAM desarrollo de aplicaciones multiplataforma": "Grado superior DAM desarrollo de aplicaciones multiplataforma",
    "Presencial 2022 / 2024": "Presencial 2022 / 2024",
    "Desarrollo de aplicaciones móviles y de escritorio, bases de datos y programación avanzada.":
      "Desarrollo de aplicaciones móviles y de escritorio, bases de datos y programación avanzada.",
    "Curso de especializacion de IA y Big Data": "Curso de especializacion de IA y Big Data",
    "Curso Especializado 2024 / 2025": "Curso Especializado 2024 / 2025",
    "Formación avanzada en inteligencia artificial, machine learning y análisis de grandes volúmenes de datos.":
      "Formación avanzada en inteligencia artificial, machine learning y análisis de grandes volúmenes de datos.",
    
    // Contact
    "Contacto": "Contacto",
    "¿Interesado en colaborar o tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.":
      "¿Interesado en colaborar o tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.",
    "Email": "Email",
    "GitHub": "GitHub",
    "LinkedIn": "LinkedIn",
    "Ubicación": "Ubicación",
    "Disponible para trabajo remoto": "Disponible para trabajo remoto",
    "Tu nombre": "Tu nombre",
    "Tu email": "Tu email",
    "Tu mensaje": "Tu mensaje",
    "Enviar Mensaje": "Enviar Mensaje",
    
    // Footer
    "Desarrollando el futuro, una línea de código a la vez.": "Desarrollando el futuro, una línea de código a la vez.",
    "© 2024 Isaac Abarca. Todos los derechos reservados.": "© 2024 Isaac Abarca. Todos los derechos reservados."
  },
  
  en: {
    // Navbar
    "Sobre mí": "About Me",
    "Habilidades": "Skills",
    "Proyectos": "Projects",
    "Experiencia": "Experience",
    "Estudios": "Education",
    "Contacto": "Contact",
    
    // Hero
    "Hola, soy": "Hi, I'm",
    "Desarrollador De Software": "Software Developer",
    "Creo experiencias digitales modernas, escalables y enfocadas en resultados. Me especializo en transformar ideas en soluciones tecnológicas efectivas.": 
      "I create modern, scalable, results-focused digital experiences. I specialize in transforming ideas into effective technological solutions.",
    "Ver Proyectos": "View Projects",
    "Contactar": "Contact",
    
    // About
    "Sobre Mí": "About Me",
    "Desarrollador de Software con pasión por crear soluciones tecnológicas que marcan la diferencia.": 
      "Software Developer passionate about creating technological solutions that make a difference.",
    "Con experiencia en el desarrollo de aplicaciones web modernas utilizando tecnologías como <strong>React</strong>, <strong>Node.js</strong> y <strong>Firebase</strong>. Me enfoco en escribir código limpio, mantenible y escalable, siempre buscando las mejores prácticas y patrones de diseño.":
      "With experience in developing modern web applications using technologies like <strong>React</strong>, <strong>Node.js</strong>, and <strong>Firebase</strong>. I focus on writing clean, maintainable, and scalable code, always seeking best practices and design patterns.",
    "Mi objetivo es colaborar en proyectos desafiantes donde pueda aportar valor y seguir creciendo profesionalmente, combinando la innovación técnica con un impacto tangible en los usuarios.":
      "My goal is to collaborate on challenging projects where I can add value and continue growing professionally, combining technical innovation with tangible user impact.",
    "Proyectos Completados": "Projects Completed",
    "Años de Experiencia": "Years of Experience",
    "Compromiso": "Commitment",
    
    // Skills
    "Habilidades Técnicas": "Technical Skills",
    "Frontend": "Frontend",
    "Backend": "Backend",
    "Herramientas": "Tools",
    "IA": "AI",
    
    // Projects
    "Proyectos Destacados": "Featured Projects",
    "Full Stack": "Full Stack",
    "Procesamiento de Datos": "Data Processing",
    "React": "React",
    "Plataforma Inmobiliaria": "Real Estate Platform",
    "Analisis de Contaminacion": "Pollution Analysis",
    "Gacha Tracker": "Gacha Tracker",
    "Visitar Web": "Visit Website",
    "Demo": "Demo",
    "Código": "Code",
    "Demo(Próximamente)": "Demo (Coming Soon)",
    
    // Project descriptions in English
    "Pagina Web con CRM integrado, gestión de propiedades y clientes/Agentes. Desarrollada con WordPress personalizado y frontend moderno.<br><br>* Mejore la captacion de clientes en un 30% gracias al SEO que implemente.<br>* Integración de un sistema CRM personalizado para gestionar clientes y propiedades.<br>* Desarrollo de un frontend atractivo y funcional utilizando tecnologías web modernas.<br>* Implementación de formularios de contacto y suscripción con gestión de correo electrónico.<br>* Optimización del rendimiento y la seguridad del sitio web. Mejore la puntuacion SEO de 70 a 98.":
      "Website with integrated CRM, property and client/agent management. Developed with customized WordPress and modern frontend.<br><br>* Improved client acquisition by 30% thanks to SEO implementation.<br>* Integration of a customized CRM system to manage clients and properties.<br>* Development of an attractive and functional frontend using modern web technologies.<br>* Implementation of contact and subscription forms with email management.<br>* Optimization of website performance and security. Improved SEO score from 70 to 98.",
    
    "Proyecto de análisis de datos de contaminación ambiental utilizando técnicas de IA generativa.<br><br>* Recopilación y limpieza de grandes conjuntos de datos ambientales.<br>* Análisis exploratorio de datos para identificar patrones y tendencias.<br>* Implementación de modelos de machine learning para predecir niveles futuros de contaminación.<br>* Visualización interactiva de datos para facilitar la interpretación de resultados.":
      "Environmental pollution data analysis project using generative AI techniques.<br><br>* Collection and cleaning of large environmental datasets.<br>* Exploratory data analysis to identify patterns and trends.<br>* Implementation of machine learning models to predict future pollution levels.<br>* Interactive data visualization to facilitate result interpretation.",
    
    "Pagina Web para llevar un control de diferentes ascpectos de unos juegos, con autenticación de usuarios y almacenamiento de datos en Firebase.<br><br>* Permite a los usuarios registrar y monitorear sus tiradas en juegos tipo gacha.<br>* Eventos en tiempo real para actualizaciones instantáneas.<br>* Optimización de llamadas al servidor para mejorar el rendimiento.<br>* Uso de localStorage para mejorar la experiencia del usuario.":
      "Website to track different aspects of games, with user authentication and Firebase data storage.<br><br>* Allows users to register and monitor their pulls in gacha-type games.<br>* Real-time events for instant updates.<br>* Server call optimization to improve performance.<br>* Use of localStorage to enhance user experience.",
    
    // Experience
    "Experiencia Profesional": "Professional Experience",
    "Desarrollador Software": "Software Developer",
    "Freelance": "Freelance",
    "Creacion de Aplicación de escritorio para un Hotel": "Hotel Desktop Application Development",
    "Practicas Grado Superior": "Higher Degree Internship",
    "Gestion de bases de datos en un ayuntamiento": "Database Management at City Hall",
    "Practicas Grado Medio": "Intermediate Degree Internship",
    "Actualidad": "Present",
    
    // Experience descriptions
    "Desarrollo de aplicaciones web modernas con React y Node.js": "Development of modern web applications with React and Node.js",
    "Implementación de APIs REST y sistemas de autenticación": "Implementation of REST APIs and authentication systems",
    "Optimización de rendimiento y SEO en proyectos web": "Performance and SEO optimization in web projects",
    "Gestion de bases de datos MySQL": "MySQL database management",
    "Creacion de aplicacion de escritorio con Visual Studio en C#": "Desktop application development with Visual Studio in C#",
    "Sistemas de autenticación y seguridad de la aplicación": "Application authentication and security systems",
    "Instalacion de software de productos del ayuntamiento": "Installation of city hall software products",
    "Gestion de redes del ayuntamiento": "City hall network management",
    
    // Education
    "Estudios & Certificaciones": "Education & Certifications",
    "Grado medio Desarrollo de Aplicaciones": "Intermediate Degree in Application Development",
    "Instituto / 2023": "Institute / 2023",
    "Formación sólida en gestión de redes, bases de datos y desarrollo de aplicaciones.":
      "Solid training in network management, databases, and application development.",
    "Grado superior DAM desarrollo de aplicaciones multiplataforma": "Higher Degree in Cross-Platform Application Development",
    "Presencial 2022 / 2024": "On-site 2022 / 2024",
    "Desarrollo de aplicaciones móviles y de escritorio, bases de datos y programación avanzada.":
      "Development of mobile and desktop applications, databases, and advanced programming.",
    "Curso de especializacion de IA y Big Data": "Specialization Course in AI and Big Data",
    "Curso Especializado 2024 / 2025": "Specialized Course 2024 / 2025",
    "Formación avanzada en inteligencia artificial, machine learning y análisis de grandes volúmenes de datos.":
      "Advanced training in artificial intelligence, machine learning, and big data analysis.",
    
    // Contact
    "Contacto": "Contact",
    "¿Interesado en colaborar o tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.":
      "Interested in collaborating or have a project in mind? I'm available for new opportunities.",
    "Email": "Email",
    "GitHub": "GitHub",
    "LinkedIn": "LinkedIn",
    "Ubicación": "Location",
    "Disponible para trabajo remoto": "Available for remote work",
    "Tu nombre": "Your name",
    "Tu email": "Your email",
    "Tu mensaje": "Your message",
    "Enviar Mensaje": "Send Message",
    
    // Footer
    "Desarrollando el futuro, una línea de código a la vez.": "Building the future, one line of code at a time.",
    "© 2024 Isaac Abarca. Todos los derechos reservados.": "© 2024 Isaac Abarca. All rights reserved."
  }
};

let currentLang = 'es';

function translatePage(lang) {
  currentLang = lang;
  
  // Actualizar el atributo lang del html
  document.documentElement.lang = lang;
  
  // Traducir todos los elementos de texto
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[lang][key];
      } else {
        // Para elementos que contienen HTML
        if (key.includes('<br>') || key.includes('<strong>')) {
          element.innerHTML = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    }
  });
  
  // Actualizar el texto del botón de idioma
  updateLanguageButton();
  
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLang', lang);
  
  // Mostrar mensaje de depuración
  console.log('Idioma cambiado a:', lang);
}

function updateLanguageButton() {
  const languageText = document.getElementById('languageText');
  if (languageText) {
    languageText.textContent = currentLang === 'es' ? 'EN' : 'ES';
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar mensaje de inicio
  console.log('Script de idioma cargado');
  
  // Cargar idioma guardado o usar español por defecto
  const savedLang = localStorage.getItem('preferredLang') || 'es';
  console.log('Idioma guardado:', savedLang);
  translatePage(savedLang);
  
  // Añadir evento al botón de idioma
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    console.log('Botón de idioma encontrado');
    languageToggle.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Botón clickeado');
      const newLang = currentLang === 'es' ? 'en' : 'es';
      console.log('Cambiando a idioma:', newLang);
      translatePage(newLang);
    });
  } else {
    console.error('Botón de idioma NO encontrado');
  }
});

// Exportar funciones para depuración
window.translatePage = translatePage;