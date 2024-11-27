// Inject Header Carousel
function setupCarousel() {
    const carousel = document.getElementById('carousel');
    data.header.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-content">
                <h1>${item.title}</h1>
                <p>${item.description}</p>
            </div>
        `;
        carousel.appendChild(slide);
    });
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    // Function to switch slides
    function updateSlide(step = 1) {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + step + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
    }
    // Auto-play functionality
    setInterval(() => {
        updateSlide(1); // Move to the next slide every 5 seconds
    }, 5000);
    // Manual navigation
    document.getElementById('prev-btn').onclick = () => updateSlide(-1);
    document.getElementById('next-btn').onclick = () => updateSlide(1);
}
// Inject Categories
function setupCategories() {
    const categoriesContainer = document.getElementById('categories');
    data.categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.innerHTML = `
            <div class="category-title">
                <span>${category.title}</span>
                <button class="view-all">View All</button>
            </div>
            <div class="category-items">
                ${category.items
                    .map(item => `<div class="category-item" onclick="showDetails('${item.title}', '${item.image}')">
                                    <img src="${item.image}" alt="${item.title}">
                                    <p>${item.title}</p>
                                  </div>`)
                    .join('')}
            </div>
        `;
        categoriesContainer.appendChild(categoryElement);
    });
}
// Show Modal with Movie Details
function showDetails(title, image) {
    const modal = document.getElementById('movieModal');
    modal.style.display = 'flex';
    document.getElementById('movieTitle').textContent = title;
    document.getElementById('movieImage').src = image;
}
// Close Modal
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('movieModal').style.display = 'none';
};
// Initialize Page
setupCarousel();
setupCategories();











