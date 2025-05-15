
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animated entrance for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  if ('IntersectionObserver' in window) {
    const featureObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      featureObserver.observe(card);
    });
  }
  
  // Add CSS for animation
  const style = document.createElement('style');
  style.textContent = `
    .fadeIn {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});
