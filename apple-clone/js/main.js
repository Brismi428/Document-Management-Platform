// Apple.com Clone - Main JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation background opacity on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.global-nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.92)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Lazy loading for product cards (fade in on scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Simple cart counter (placeholder)
let cartCount = 0;

// Add hover effects for nav items
document.querySelectorAll('.nav-links a, .nav-icon').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

console.log('Apple clone loaded successfully! 🍎');
