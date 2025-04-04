
// Changed to use vanilla JavaScript instead of React

const StarRating = ({ onChange, initialRating = 0 }) => {
  let rating = initialRating;
  let hoverRating = 0;
  let stars = [];

  function createStarElement(index) {
    const star = document.createElement('button');
    star.type = 'button';
    star.className = 'p-1';
    star.dataset.value = index;
    star.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"></svg>`;
    
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

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      const starIcon = stars[i].querySelector('.star-icon');
      if ((hoverRating || rating) >= parseInt(stars[i].dataset.value)) {
        starIcon.classList.add('fill-yellow-400', 'text-yellow-400');
        starIcon.classList.remove('text-gray-300', 'dark:text-gray-600');
      } else {
        starIcon.classList.remove('fill-yellow-400', 'text-yellow-400');
        starIcon.classList.add('text-gray-300', 'dark:text-gray-600');
      }
    }
  }

  function renderStars(container) {
    const starContainer = document.createElement('div');
    starContainer.className = 'flex';
    
    for (let i = 1; i <= 5; i++) {
      const star = createStarElement(i);
      stars.push(star);
      starContainer.appendChild(star);
    }
    
    container.appendChild(starContainer);
    updateStars();
  }

  // This is still a React component to maintain compatibility with the rest of the app,
  // but internally uses vanilla JS to handle star rating
  return {
    render: (container) => {
      renderStars(container);
    }
  };
};

export default StarRating;
