
document.addEventListener('DOMContentLoaded', function() {
  // Initialize star ratings for all containers
  const ratingContainers = {
    'work-satisfaction': 0,
    'team-collaboration': 0,
    'work-life-balance': 0,
    'growth-opportunities': 0,
    'management-support': 0
  };
  
  // Create star ratings for each container
  Object.keys(ratingContainers).forEach(containerId => {
    initStarRating(containerId, value => {
      ratingContainers[containerId] = value;
    });
  });
  
  // Handle form submission
  const form = document.getElementById('feedback-form');
  const submitBtn = document.getElementById('submit-btn');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate responses (at least 3 categories must be rated)
    const ratings = Object.values(ratingContainers);
    const validRatings = ratings.filter(rating => rating > 0).length;
    
    if (validRatings < 3) {
      showToast('Please rate at least 3 categories before submitting.', 'error');
      return;
    }
    
    // Disable button and show submitting state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Get comment value
    const comment = document.getElementById('comment').value;
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Re-enable button and reset text
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Feedback';
      
      // Show success message
      showToast('Thank you for your feedback!', 'success');
      
      // Reset form
      resetForm();
    }, 1500);
  });
  
  // Function to initialize star rating
  function initStarRating(containerId, onChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '';
    
    // Create star container
    const starContainer = document.createElement('div');
    starContainer.className = 'star-rating';
    container.appendChild(starContainer);
    
    let currentRating = 0;
    
    // Create 5 stars
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'star-button';
      star.setAttribute('data-value', i);
      
      // Star SVG
      star.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
          class="star-icon ${currentRating >= i ? 'star-filled' : 'star-empty'}">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
      
      // Click event
      star.addEventListener('click', () => {
        currentRating = i;
        onChange(currentRating);
        updateStars();
      });
      
      // Hover events
      star.addEventListener('mouseenter', () => {
        highlightStars(i);
      });
      
      star.addEventListener('mouseleave', () => {
        highlightStars(currentRating);
      });
      
      starContainer.appendChild(star);
    }
    
    // Function to update star appearance
    function updateStars() {
      highlightStars(currentRating);
    }
    
    // Function to highlight stars up to a certain value
    function highlightStars(value) {
      const stars = starContainer.querySelectorAll('button');
      stars.forEach((star, index) => {
        const starIcon = star.querySelector('.star-icon');
        if (starIcon) {
          const starValue = index + 1;
          if (starValue <= value) {
            starIcon.classList.add('star-filled');
            starIcon.classList.remove('star-empty');
          } else {
            starIcon.classList.remove('star-filled');
            starIcon.classList.add('star-empty');
          }
        }
      });
    }
  }
  
  // Function to show toast message
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = 'toast show ' + type;
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }
  
  // Function to reset the form
  function resetForm() {
    // Reset all ratings to 0
    Object.keys(ratingContainers).forEach(containerId => {
      ratingContainers[containerId] = 0;
      const container = document.getElementById(containerId);
      initStarRating(containerId, value => {
        ratingContainers[containerId] = value;
      });
    });
    
    // Clear comment field
    document.getElementById('comment').value = '';
  }
});
