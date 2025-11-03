import './style.css';

const header = document.querySelector('header');
const navContainer = document.querySelector('.nav-container');
const videoHero = document.querySelector('.video-hero-container');

if (header && navContainer && videoHero) {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const videoHeight = videoHero.getBoundingClientRect().height;
        
        if (scrollY < videoHeight) {
            navContainer.classList.add('glass-effect');
        } else {
            navContainer.classList.remove('glass-effect');
        }
    };
    
    // Check on initial load
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
}