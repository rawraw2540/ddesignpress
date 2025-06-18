// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('open');
  });
}

// Portfolio filtering
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    // Add active class to clicked button
    button.classList.add('active');

    // Get filter value
    const filter = button.dataset.filter;

    // Show/hide portfolio items
    document.querySelectorAll('.card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// FAQ Toggle Function (for onclick="toggleFAQ(this)" in HTML)
function toggleFAQ(element) {
  const faqItem = element.parentNode;
  const answer = faqItem.querySelector('.faq-answer');
  const arrow = element.querySelector('.faq-arrow');
  
  // Close all other FAQ items first
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem && item.classList.contains('active')) {
      item.classList.remove('active');
      const otherAnswer = item.querySelector('.faq-answer');
      const otherArrow = item.querySelector('.faq-arrow');
      if (otherAnswer) {
        otherAnswer.style.maxHeight = '0';
        otherAnswer.style.opacity = '0';
      }
      if (otherArrow) {
        otherArrow.style.transform = 'rotate(0deg)';
      }
    }
  });
  
  // Toggle the current FAQ item
  faqItem.classList.toggle('active');
  
  // Toggle the answer visibility
  if (faqItem.classList.contains('active')) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.opacity = '1';
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  } else {
    answer.style.maxHeight = '0';
    answer.style.opacity = '0';
    if (arrow) arrow.style.transform = 'rotate(0deg)';
  }
}

// Alternative FAQ accordion (event listener approach)
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', (e) => {
    // Prevent double triggering if both onclick and event listener are present
    if (question.hasAttribute('onclick')) return;
    
    const faqItem = question.parentNode;
    const answer = faqItem.querySelector('.faq-answer');
    const arrow = question.querySelector('.faq-arrow');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem && item.classList.contains('active')) {
        item.classList.remove('active');
        const otherAnswer = item.querySelector('.faq-answer');
        const otherArrow = item.querySelector('.faq-arrow');
        if (otherAnswer) {
          otherAnswer.style.maxHeight = '0';
          otherAnswer.style.opacity = '0';
        }
        if (otherArrow) {
          otherArrow.style.transform = 'rotate(0deg)';
        }
      }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.opacity = '1';
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
      answer.style.maxHeight = '0';
      answer.style.opacity = '0';
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile bottom navigation active state
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.bottom-nav-item');
  
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
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
  
  // Update on scroll
  if (window.innerWidth <= 768) {
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
  }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to your server
      // For now, we'll just show a success message
      alert('Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.');
      
      // Reset form
      contactForm.reset();
    });
  }
});

// Initialize FAQ styles
document.addEventListener('DOMContentLoaded', function() {
  // Add necessary CSS for FAQ animations if not already present
  if (!document.querySelector('#faq-styles')) {
    const style = document.createElement('style');
    style.id = 'faq-styles';
    style.textContent = `
      .faq-answer {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease;
        padding: 0 1rem;
      }
      
      .faq-item.active .faq-answer {
        padding: 1rem;
      }
      
      .faq-arrow {
        transition: transform 0.3s ease;
      }
      
      .faq-question {
        cursor: pointer;
        user-select: none;
      }
      
      .faq-question:hover {
        color: var(--secondary-red);
      }
    `;
    document.head.appendChild(style);
  }
});