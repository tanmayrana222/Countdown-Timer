let timerInterval;
let totalTime = 0;
let timeLeft = 0;
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressBar = document.querySelector('.progress');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
function startTimer(duration) {
    let startTime = Date.now();
    let endTime = startTime + duration * 1000;
    timerInterval = setInterval(() => {
        timeLeft = Math.max(0, endTime - Date.now());
        updateDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}
function updateDisplay(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
    const progressWidth = ((totalTime * 1000 - time) / (totalTime * 1000)) * 100;
    progressBar.style.width = `${progressWidth}%`;
}
startButton.addEventListener('click', () => {
    if (!totalTime) {
        totalTime = 60; // Set default timer to 1 minute
    }
    timeLeft = totalTime * 1000;
    startTimer(totalTime);
});
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = totalTime * 1000;
    updateDisplay(timeLeft);
    progressBar.style.width = '0%';
});