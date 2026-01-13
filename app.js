// Selección de elementos del DO
import { Analytics } from "@vercel/analytics/next"
document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-bug');
    const root = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (themeToggles.length === 0) {
        console.error('No theme toggle buttons found.');
        return;
    }

    // Función para actualizar los estados visuales de todos los botones
    function syncThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            if (theme === 'dark') {
                toggle.classList.add('dark');
                toggle.classList.remove('light');
            } else {
                toggle.classList.add('light');
                toggle.classList.remove('dark');
            }
        });
    }

    // Función para establecer el tema
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        syncThemeIcons(theme);
    }

    // Función para alternar el tema
    function toggleTheme() {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Establecer el tema inicial
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const theme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
        setTheme(theme);
    }

    // Agregar event listeners a todos los toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // Inicializar el tema al cargar la página
    initializeTheme();
});


let lastScrollY = window.scrollY; // Posición inicial del scroll

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Si el usuario hace scroll hacia abajo, oculta la navbar
    navbar.classList.add('hidden');
  } else {
    // Si el usuario hace scroll hacia arriba, muestra la navbar
    navbar.classList.remove('hidden');
  }

  lastScrollY = currentScrollY; // Actualiza la posición del scroll
});

// Smooth Scroll para los enlaces de navegación
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de escritura para el typewriter
const typewriterElement = document.querySelector('.typed-text');
const phrases = ['Desarrollador Frontend','Desarrolador web' ];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Espera antes de empezar a borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500); // Espera antes de empezar la siguiente frase
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter(); // Iniciar el efecto de escritura

// Animación de los iconos de tecnología
const techItems = document.querySelectorAll('.tech-item');

function animateTechItems() {
    techItems.forEach((item, index) => {
        item.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

animateTechItems();

// Contador para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

const statCards = document.querySelectorAll('.stat-card');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.value);
            animateCounter(entry.target.querySelector('.stat-number'), target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => observer.observe(card));

// Efecto hover en las tarjetas de proyectos y hobbies
const projectCards = document.querySelectorAll('.project-card');
const hobbyCards = document.querySelectorAll('.hobby-card');

function addHoverEffect(cards) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

addHoverEffect(projectCards);
addHoverEffect(hobbyCards);


// Lazy loading para imágenes
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyImageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    lazyImageObserver.observe(img);
});



const initScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    const progressText = document.getElementById('scroll-progress-text');

    // Obtener el valor de la variable CSS usando getComputedStyle
    const rootStyles = getComputedStyle(document.documentElement);
    const colorText = rootStyles.getPropertyValue('--color-background').trim();  // Se obtiene el valor de la variable de color

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;

        // Actualizar el ancho de la barra de progreso
        progressBar.style.width = `${scrollPercentage}%`;

        // Mostrar el texto a medida que avanza la barra de progreso
        if (scrollPercentage > 0) {
            progressText.style.color = colorText; // Usamos el valor de la variable CSS
            progressText.style.width = `${scrollPercentage}%`; // El texto se dibuja gradualmente conforme avanza la barra
        } else {
            progressText.style.color = "transparent"; // Inicialmente invisible
            progressText.style.width = "0%"; // Inicialmente no visible
        }
    });
};

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});




