
import React from 'react';

interface StarRatingProps {
  onChange: (rating: number) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange, initialRating = 0 }) => {
  // Create a unique ID for each star rating instance
  const id = React.useId();
  
  React.useEffect(() => {
    // Initialize the star rating with vanilla JavaScript
    initStarRating(id, onChange, initialRating);
    
    // Cleanup on unmount
    return () => {
      const container = document.getElementById(`star-rating-${id}`);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [id, onChange, initialRating]);

  return <div id={`star-rating-${id}`} className="star-rating-container"></div>;
};

// Initialize star rating with vanilla JavaScript
function initStarRating(id: string, onChange: (rating: number) => void, initialRating: number) {
  const container = document.getElementById(`star-rating-${id}`);
  if (!container) return;
  
  // Clear previous content
  container.innerHTML = '';
  
  // Create star container
  const starContainer = document.createElement('div');
  starContainer.className = 'flex';
  container.appendChild(starContainer);
  
  let currentRating = initialRating;
  
  // Create 5 stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'p-1 focus:outline-none';
    star.dataset.value = i.toString();
    
    // Star SVG without transitions
    star.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="star-icon ${(currentRating >= i) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}">
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
  function highlightStars(value: number) {
    const stars = starContainer.querySelectorAll('button');
    stars.forEach((star, index) => {
      const starIcon = star.querySelector('.star-icon') as SVGElement;
      if (starIcon) {
        const starValue = index + 1;
        if (starValue <= value) {
          starIcon.classList.add('fill-yellow-400', 'text-yellow-400');
          starIcon.classList.remove('text-gray-300', 'dark:text-gray-600');
        } else {
          starIcon.classList.remove('fill-yellow-400', 'text-yellow-400');
          starIcon.classList.add('text-gray-300', 'dark:text-gray-600');
        }
      }
    });
  }
}

export default StarRating;
