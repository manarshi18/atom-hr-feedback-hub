
import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  onChange: (rating: number) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange, initialRating = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear previous stars
    container.innerHTML = '';
    
    let currentRating = initialRating;
    let hoverRating = 0;
    
    // Create star container
    const starContainer = document.createElement('div');
    starContainer.className = 'flex';
    container.appendChild(starContainer);
    
    // Create 5 stars
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'p-1 focus:outline-none';
      star.dataset.value = i.toString();
      
      // Star SVG
      star.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
          class="star-icon transition-colors ${
            (currentRating >= i) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }">
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
        hoverRating = i;
        updateStars();
      });
      
      star.addEventListener('mouseleave', () => {
        hoverRating = 0;
        updateStars();
      });
      
      starContainer.appendChild(star);
    }
    
    // Function to update star appearance
    function updateStars() {
      const stars = starContainer.querySelectorAll('button');
      stars.forEach((star, index) => {
        const starIcon = star.querySelector('.star-icon') as SVGElement;
        if (starIcon) {
          const starValue = index + 1;
          if ((hoverRating || currentRating) >= starValue) {
            starIcon.classList.add('fill-yellow-400', 'text-yellow-400');
            starIcon.classList.remove('text-gray-300', 'dark:text-gray-600');
          } else {
            starIcon.classList.remove('fill-yellow-400', 'text-yellow-400');
            starIcon.classList.add('text-gray-300', 'dark:text-gray-600');
          }
        }
      });
    }
    
    // Clean up function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [onChange, initialRating]);

  return <div ref={containerRef} className="star-rating-container"></div>;
};

export default StarRating;
