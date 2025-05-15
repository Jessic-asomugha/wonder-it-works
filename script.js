
// Simple JavaScript for interactive elements

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
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
  
  // Add animation to feature cards on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.2
  });
  
  featureCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    fadeInObserver.observe(card);
  });
  
  // Helper function for the fade-in animation
  document.documentElement.style.setProperty('--fade-in-keyframes', `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `);
  
  // Add animation class
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
  
  // Simple mobile menu toggle (if we add a mobile menu later)
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  if (mobileMenuButton) {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
});
