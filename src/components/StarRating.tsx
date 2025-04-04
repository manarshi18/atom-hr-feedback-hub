
import React, { useRef, useEffect } from 'react';

interface StarRatingProps {
  onChange: (rating: number) => void;
  initialRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ onChange, initialRating = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous content
    containerRef.current.innerHTML = '';
    
    let rating = initialRating;
    let hoverRating = 0;
    let stars: HTMLButtonElement[] = [];

    function updateStars() {
      for (let i = 0; i < stars.length; i++) {
        const starIcon = stars[i].querySelector('.star-icon') as SVGElement;
        if ((hoverRating || rating) >= parseInt(stars[i].dataset.value || '0')) {
          starIcon.classList.add('fill-yellow-400', 'text-yellow-400');
          starIcon.classList.remove('text-gray-300', 'dark:text-gray-600');
        } else {
          starIcon.classList.remove('fill-yellow-400', 'text-yellow-400');
          starIcon.classList.add('text-gray-300', 'dark:text-gray-600');
        }
      }
    }

    function createStarElement(index: number) {
      const star = document.createElement('button');
      star.type = 'button';
      star.className = 'p-1';
      star.dataset.value = index.toString();
      star.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
      
      star.addEventListener('click', () => {
        rating = index;
        onChange(rating);
        updateStars();
      });
      
      star.addEventListener('mouseenter', () => {
        hoverRating = index;
        updateStars();
      });
      
      star.addEventListener('mouseleave', () => {
        hoverRating = 0;
        updateStars();
      });
      
      return star;
    }

    const starContainer = document.createElement('div');
    starContainer.className = 'flex';
    
    for (let i = 1; i <= 5; i++) {
      const star = createStarElement(i);
      stars.push(star);
      starContainer.appendChild(star);
    }
    
    containerRef.current.appendChild(starContainer);
    updateStars();

    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [onChange, initialRating]);

  return <div ref={containerRef} className="star-rating-container"></div>;
};

export default StarRating;
