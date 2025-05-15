
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenuClose && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Handle notifications
  const notificationBell = document.querySelector('.notification-bell');
  
  if (notificationBell) {
    notificationBell.addEventListener('click', function() {
      alert('Notifications feature will be implemented here.');
      // In a real app, this would toggle a dropdown with notifications
    });
  }

  // Handle user avatar click
  const userAvatar = document.querySelector('.user-avatar');
  
  if (userAvatar) {
    userAvatar.addEventListener('click', function() {
      window.location.href = 'profile.html';
    });
  }
});
