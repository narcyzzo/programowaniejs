let currentSlide = 0;
let isPaused = false;
let intervalId;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide() {
    document.querySelector('.slides').style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide();
}

function pauseSlider() {
    clearInterval(intervalId);
    isPaused = true;
}

function startSlider() {
    intervalId = setInterval(() => {
        if (!isPaused) {
            nextSlide();
        }
    }, 2000); // Ustaw interwał według własnych preferencji
    isPaused = false;
}

startSlider();

document.querySelector('.prevBtn').addEventListener('click', () => {
    pauseSlider();
    prevSlide();
});

document.querySelector('.nextBtn').addEventListener('click', () => {
    pauseSlider();
    nextSlide();
});

document.querySelector('.pauseBtn').addEventListener('click', () => {
    pauseSlider();
});

document.querySelector('.playBtn').addEventListener('click', () => {
    startSlider();
});
