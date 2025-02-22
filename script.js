let timerInterval;
let totalTime = 0;
let timeLeft = 0;
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressBar = document.querySelector('.progress');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const inputHours = document.getElementById('inputHours') ;
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
function startTimer(duration) {
    if(timerInterval) clearInterval (timerInterval) ;

    
    totalTime = duration;
    timeLeft = duration ;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    timerInterval = setInterval(() => {
        timeLeft = Math.max(0, endTime - Date.now());
        updateDisplay(timeLeft);
        const elapsed = totalTime * 1000 - timeLeft;
        const progressPercent = (elapsed/(totalTime*1000)) * 100 ;
        progressBar.style.width = `${progressPercent}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            progressBar.style.width = "100%" ;
            alert("Time's up!");
        }
    }, 50);
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
    const hours = parseInt(inputHours.value) || 0 ; 
    const minutes = parseInt(inputMinutes.value) || 0 ;
    const seconds = parseInt(inputSeconds.value) || 0 ;
    totalTime = hours * 3600 + minutes * 60 + seconds ;
    if (totalTime<= 0 ) {
        alert("please enter a valid time ");
        return;
    }
    inputHours.disabled = true 
    inputMinutes.disabled = true 
    inputSeconds.disabled = true 
    startTimer (totalTime);
}); 

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timeLeft = totalTime * 1000 ;
    updateDisplay (timeLeft)
    inputHours.disabled = false
    inputMinutes.disabled = false
    inputSeconds.disabled = false

    hoursElement.textContent = "00";
    MinutesElement.textContent = "00";
    SecondsElement.textContent = "00";
    
    progressBar.style.width = "0%"
    inputHours.value = ""
    inputMinutes.value = ""
    inputseconds.value = ""


});