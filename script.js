// Particle background effect with reduced particles
const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    document.body.prepend(particlesContainer);

    // Reduced number of particles for minimalist effect
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.2;
        particlesContainer.appendChild(particle);
    }
};

createParticles();

// Smooth scrolling with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle with monochrome colors
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
let isDarkMode = true;

const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        root.style.setProperty('--bg-color', '#000000');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.03)');
        root.style.setProperty('--secondary-color', '#888888');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.03)');
        root.style.setProperty('--secondary-color', '#666666');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    document.body.style.transition = 'background-color 0.5s ease';
};

themeToggle.addEventListener('click', toggleTheme);

// Subtle scroll reveal animations
const reveal = () => {
    const reveals = document.querySelectorAll('.project-card, .skill-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }
    });
};

// Initialize elements with subtle starting positions
document.querySelectorAll('.project-card, .skill-card').forEach(element => {
    element.style.transform = 'translateY(30px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', reveal);
reveal();

// Minimal typing effect for hero section
const createTypingEffect = () => {
    const text = document.querySelector('.hero h2').textContent;
    const element = document.querySelector('.hero h2');
    element.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 80);
};

window.addEventListener('load', createTypingEffect);

// Enhanced form handling with validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Form validation
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateForm = () => {
    let isValid = true;
    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('input[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (name.length < 2) {
        showError('Please enter a valid name');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        isValid = false;
    }

    if (subject.length < 2) {
        showError('Please enter a subject');
        isValid = false;
    }

    if (message.length < 10) {
        showError('Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
};

const showError = (message) => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    contactForm.appendChild(errorMessage);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);
};

const showSuccess = (message) => {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    // Remove any existing success messages
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
};

// Form input animation
formInputs.forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    input.addEventListener('focus', () => {
        wrapper.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            wrapper.classList.remove('focused');
        }
    });
});

// Form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to your server
    // For demonstration, we'll just show a success message
    try {
        // Simulate sending data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccess('Message sent successfully! I will get back to you soon.');
        this.reset();
        
        // Reset input wrappers
        document.querySelectorAll('.input-wrapper').forEach(wrapper => {
            wrapper.classList.remove('focused');
        });
    } catch (error) {
        showError('Something went wrong. Please try again later.');
    }
});

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Subtle navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.opacity = '0';
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});
