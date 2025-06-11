// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Focus on name field if scrolling to contact
            if (this.getAttribute('href') === '#contact') {
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 1000);
            }
        }
    });
});

// Bottom Navigation Active State
function updateBottomNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.bottom-nav-item');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
}

// Update active state on scroll
window.addEventListener('scroll', updateBottomNavActiveState);

// Update active state on page load
document.addEventListener('DOMContentLoaded', updateBottomNavActiveState);

// FAQ Accordion
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Bitte gib eine gültige E-Mail-Adresse ein.');
            return false;
        }
        
        // Create email body
        let emailBody = `Hi Daniel,\n\nich interessiere mich für ein Projekt mit dir. Hier ein paar Infos dazu:\n\n`;
        emailBody += `Name: ${name}\n`;
        emailBody += `E-Mail: ${email}\n`;
        if (company) emailBody += `Unternehmen: ${company}\n`;
        if (budget) emailBody += `Budget: ${budget}\n`;
        emailBody += `\nProjektbeschreibung:\n${message}\n\n`;
        emailBody += `Viele Grüße\n${name}`;
        
        // Create mailto link
        const subject = encodeURIComponent('Anfrage');
        const body = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:daniel.doerrer@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
    });
}

// Add animation on scroll
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

// Observe elements
document.querySelectorAll('.service-card, .price-card, .showcase-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});