type Solution = {
    title: string;
    image: string;
};

const SOLUTIONS: Solution[] = [
    { title: 'Congressional Races', image: '/solutions/Congressional-Reel.png' },
    { title: 'Independent Expenditure Ads', image: '/solutions/IE-Reel.png' },
    { title: 'State Legislature', image: '/solutions/State-Leg-Reel.png' },
    { title: 'Local Races', image: '/solutions/Local-Reel.png' },
    { title: 'Video Production', image: '/solutions/Video-Production-Reel.png' }
];

const ROTATE_INTERVAL = 5000;
const FADE_DURATION = 300;

export function initSolutionsCarousel() {

    const titleContainer = document.querySelector('.solution-title-container');

    const contentContainer = document.querySelector('.solutions-content-container');
    
    if (!titleContainer || !contentContainer) return;

    let currentIndex = 0;

    let intervalId: number | null = null;

    const titles = SOLUTIONS.map((solution, index) => {

        const h2 = document.createElement('h2');

        h2.className = 'solution-title';

        h2.textContent = solution.title;

        if (index === 0) h2.classList.add('active');

        titleContainer.appendChild(h2);

        return h2;
    });

    const contentImage = document.createElement('img');
    
    contentImage.className = 'solution-content-image';

    contentImage.src = SOLUTIONS[0].image;

    contentImage.alt = SOLUTIONS[0].title;

    contentContainer.appendChild(contentImage);

    const switchTo = (index: number) => {
        currentIndex = index;

        titles.forEach((title, i) => {
            title.classList.toggle('active', i === index);
        });

        contentImage.classList.add('fading');
        
        setTimeout(() => {
            contentImage.src = SOLUTIONS[index].image;
            contentImage.alt = SOLUTIONS[index].title;
            contentImage.classList.remove('fading');
        }, FADE_DURATION);
    };

    const startRotation = () => {
        if (intervalId) clearInterval(intervalId);
        intervalId = window.setInterval(() => {
            switchTo((currentIndex + 1) % SOLUTIONS.length);
        }, ROTATE_INTERVAL);
    };

    titles.forEach((title, index) => {
        title.addEventListener('click', () => {
            switchTo(index);
            startRotation();
        });
    });

    startRotation();
}

