
document.addEventListener('DOMContentLoaded', function() {
  // Filter tips by category
  const categoryButtons = document.querySelectorAll('.category-btn');
  const tipCards = document.querySelectorAll('.tip-card');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      
      // Filter tip cards
      tipCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle load more button
  const loadMoreButton = document.querySelector('.load-more-btn');
  
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function() {
      // In a real app, this would load more tips from an API
      this.textContent = 'Loading...';
      
      setTimeout(() => {
        // Simulating API response delay
        this.textContent = 'No more tips available';
        this.disabled = true;
        this.style.opacity = '0.5';
      }, 1500);
    });
  }
});
