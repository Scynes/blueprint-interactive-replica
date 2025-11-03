type Solution = {
    title: string;
    image: string;
    video: string;
};

const SOLUTIONS: Solution[] = [
    { title: 'Congressional Races', image: './solutions/Congressional-Reel.png', video: './solutions/videos/BLU2451_Congressional-Reel-2024_1920x1080.mp4' },
    { title: 'Independent Expenditure Ads', image: './solutions/IE-Reel.png', video: './solutions/videos/BLU2451_IE-Reel-2024_1920x1080.mp4' },
    { title: 'State Legislature', image: './solutions/State-Leg-Reel.png', video: './solutions/videos/BLU2451_State-Leg-Reel-2024_1920x1080.mp4' },
    { title: 'Local Races', image: './solutions/Local-Reel.png', video: './solutions/videos/BLU2451_Local-Reel-2024_1920x1080.mp4' },
    { title: 'Video Production', image: './solutions/Video-Production-Reel.png', video: './solutions/videos/BLU2451_Video-Production-Reel-2024_1920x1080.mp4' }
];

const ROTATE_INTERVAL = 5000;
const FADE_DURATION = 300;

export function initSolutionsCarousel() {
    const titleContainer = document.querySelector('.solution-title-container');
    const contentContainer = document.querySelector('.solutions-content-container');
    if (!titleContainer || !contentContainer) return;

    let currentIndex = 0;
    let intervalId: number | null = null;
    let isVideoPlaying = false;

    // Create titles
    const titles = SOLUTIONS.map((solution, index) => {
        const h2 = Object.assign(document.createElement('h2'), {
            className: 'solution-title',
            textContent: solution.title
        });
        if (index === 0) h2.classList.add('active');
        titleContainer.appendChild(h2);
        return h2;
    });

    // Create media wrapper and elements
    const mediaWrapper = Object.assign(document.createElement('div'), { className: 'solution-media-wrapper' });
    const contentImage = Object.assign(document.createElement('img'), {
        className: 'solution-content-image',
        src: SOLUTIONS[0].image,
        alt: SOLUTIONS[0].title
    });
    const videoElement = Object.assign(document.createElement('video'), {
        className: 'solution-video hidden',
        controls: true
    });
    const playButton = Object.assign(document.createElement('button'), {
        className: 'solution-play-button',
        innerHTML: '<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="rgba(129, 129, 129, 0.6)"/><path d="M32 24L56 40L32 56V24Z" fill="#ffffff"/></svg>'
    });
    playButton.setAttribute('aria-label', 'Play video');

    mediaWrapper.append(contentImage, videoElement);
    contentContainer.append(mediaWrapper, playButton);

    // Toggle video visibility
    const toggleVideo = (show: boolean) => {
        isVideoPlaying = show;
        if (show) {
            stopRotation();
            videoElement.src = SOLUTIONS[currentIndex].video;
            videoElement.load();
            videoElement.play();
            contentImage.classList.add('hidden');
            playButton.classList.add('hidden');
            videoElement.classList.remove('hidden');
        } else {
            videoElement.pause();
            videoElement.classList.add('hidden');
            contentImage.style.removeProperty('opacity');
            contentImage.classList.remove('hidden');
            playButton.classList.remove('hidden');
            startRotation();
        }
    };

    // Switch to solution
    const switchTo = (index: number) => {
        currentIndex = index;
        titles.forEach((title, i) => title.classList.toggle('active', i === index));
        
        if (isVideoPlaying) toggleVideo(false);
        
        videoElement.src = SOLUTIONS[index].video;
        contentImage.style.removeProperty('opacity');
        contentImage.classList.add('fading');
        
        setTimeout(() => {
            contentImage.src = SOLUTIONS[index].image;
            contentImage.alt = SOLUTIONS[index].title;
            contentImage.classList.remove('fading');
        }, FADE_DURATION);
    };

    // Rotation control
    const stopRotation = () => intervalId && (clearInterval(intervalId), intervalId = null);
    const startRotation = () => {
        if (isVideoPlaying) return;
        stopRotation();
        intervalId = window.setInterval(() => !isVideoPlaying && switchTo((currentIndex + 1) % SOLUTIONS.length), ROTATE_INTERVAL);
    };

    // Event listeners
    playButton.addEventListener('click', () => toggleVideo(!isVideoPlaying));
    videoElement.addEventListener('ended', () => toggleVideo(false));
    titles.forEach((title, index) => title.addEventListener('click', () => (switchTo(index), startRotation())));

    startRotation();
}

