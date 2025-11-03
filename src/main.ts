import './style.css';
import { initSolutionsCarousel } from './solutions-carousel';

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
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
}

initSolutionsCarousel();