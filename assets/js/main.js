/**
 * Doce Morena - Landing Page
 * JavaScript principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
        }, 1000);
    });

    // Header scroll
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu mobile
    const menuMobileBtn = document.querySelector('.menu-mobile');
    const menuMobileContainer = document.querySelector('.menu-mobile-container');
    const closeMenuBtn = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuMobileBtn.addEventListener('click', function() {
        menuMobileContainer.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', function() {
        menuMobileContainer.classList.remove('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuMobileContainer.classList.remove('active');
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-header, .sobre-text, .sobre-highlight, .produto-card, .galeria-item, .contato-info, .contato-form');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger on initial load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);

    // Form validation
    const contactForm = document.getElementById('form-contato');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor, informe seu nome');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Por favor, informe seu email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, informe um email válido');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor, escreva sua mensagem');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real scenario, here we would send the form data to a server
                // For this demo, we'll just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Mensagem enviada com sucesso!</h3>
                        <p>Agradecemos seu contato. Retornaremos em breve.</p>
                    </div>
                `;
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#ff3860';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '#ddd';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to menu items based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#header .menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Add CSS styles for success message and error message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            text-align: center;
            padding: 30px;
        }
        
        .success-message i {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-family: var(--font-heading);
            color: var(--secondary);
            margin-bottom: 10px;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 0.85rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});
