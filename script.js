/* ============================================
   NAVIGATION & MENU MOBILE
   ============================================ */

// Sélection des éléments du DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle du menu mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animation du hamburger
    hamburger.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* ============================================
   SCROLL ACTIF DANS LA NAVIGATION
   ============================================ */

// Fonction pour mettre à jour le lien actif lors du scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Écouter le scroll
window.addEventListener('scroll', updateActiveLink);

/* ============================================
   NAVBAR - EFFET AU SCROLL
   ============================================ */

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 10, 31, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 10, 31, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

/* ============================================
   SMOOTH SCROLL VERS LES SECTIONS
   ============================================ */

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Compensation pour le navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Ajout de l'événement pour tous les liens de navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

/* ============================================
   MODAL - AFFICHAGE DU MESSAGE
   ============================================ */

const modal = document.getElementById('messageModal');
const closeBtn = document.querySelector('.close');

// Fonction pour afficher le modal
function showMessage() {
    modal.classList.add('show');
    // Empêcher le scroll du body quand le modal est ouvert
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer le modal
function closeModal() {
    modal.classList.remove('show');
    // Réactiver le scroll du body
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant sur le bouton X
closeBtn.addEventListener('click', closeModal);

// Fermer le modal en cliquant en dehors du contenu
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

/* ============================================
   ANIMATION DES CARTES AU SCROLL
   ============================================ */

// Observer pour animer les éléments quand ils entrent dans la vue
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Sélectionner tous les éléments à animer
const animatedElements = document.querySelectorAll('.about-card, .passion-card, .contact-card');

// Initialiser l'état des éléments
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

/* ============================================
   EFFET PARALLAXE SUR LE HERO
   ============================================ */

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

/* ============================================
   ANIMATION DES SKILLS AU HOVER
   ============================================ */

const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        const skillName = this.getAttribute('data-skill');
        this.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(59, 130, 246, 0.1))';
    });

    skill.addEventListener('mouseleave', function() {
        this.style.background = 'var(--dark-bg)';
    });
});

/* ============================================
   ANIMATION DES PASSIONS
   ============================================ */

const passionCards = document.querySelectorAll('.passion-card');

passionCards.forEach((card, index) => {
    // Délai progressif pour l'animation d'entrée
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Effet de rotation légère au hover
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.passion-icon');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease';
    });

    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.passion-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

/* ============================================
   COMPTEUR ANIMÉ (Optionnel - pour les stats)
   ============================================ */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

/* ============================================
   TYPING EFFECT (Effet machine à écrire)
   ============================================ */

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Exemple d'utilisation au chargement de la page
window.addEventListener('load', () => {
    // Animation de fade in pour tout le contenu
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

/* ============================================
   GESTION DES FORMULAIRES (si nécessaire)
   ============================================ */

// Cette fonction peut être utilisée si vous ajoutez un formulaire de contact
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(e.target);
    
    // Afficher un message de confirmation
    showMessage();
    
    // Réinitialiser le formulaire
    e.target.reset();
}

/* ============================================
   DÉTECTION DU THÈME DU SYSTÈME (Optionnel)
   ============================================ */

// Vérifier si l'utilisateur préfère le mode sombre
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Le thème est déjà sombre par défaut
    console.log('Mode sombre activé');
}

/* ============================================
   COPIE DANS LE PRESSE-PAPIER
   ============================================ */

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Afficher une notification
        showNotification('Copié dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--secondary-color);
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ============================================
   CONSOLE - MESSAGE DE DÉVELOPPEUR
   ============================================ */

console.log('%c👋 Bonjour ! ', 'font-size: 20px; color: #00ff88; font-weight: bold;');
console.log('%cCe site a été créé par Mingbeba Ouattara', 'font-size: 14px; color: #a0a0a0;');
console.log('%cPassionné par l\'informatique, la biologie, le football et la mécanique', 'font-size: 12px; color: #8b5cf6;');

/* ============================================
   PROTECTION CONTRE LE CLIC DROIT (Optionnel)
   ============================================ */

// Décommenter si vous voulez protéger les images
/*
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showNotification('Cette image est protégée');
    }
});
*/

/* ============================================
   EASTER EGG - Konami Code
   ============================================ */

let konamiCode = [];
const konamiPattern = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10); // Garder seulement les 10 dernières touches
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    showNotification('🎉 Code Konami activé ! Vous avez trouvé l\'Easter Egg !');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Ajouter l'animation rainbow au CSS si elle n'existe pas
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   FIN DU SCRIPT
   ============================================ */

console.log('%c✅ Tous les scripts sont chargés avec succès !', 'color: #00ff88; font-weight: bold;');
