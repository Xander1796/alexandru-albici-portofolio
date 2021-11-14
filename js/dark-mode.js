import { waves, lightModeWaveColors, darkModeWaveColors } from './hero-wave-canvas.js';
import { Particles, particlesArray, particleInit} from './hero-particles-canvas.js';
 
const colorSwitcherContainer = document.querySelector('.color-switcher-button');
const switcherIcon = document.querySelector('.switcher-icon');
const colorSwitcherText = document.querySelector('.color-switcher-text');
const body = document.querySelector('body');

if(!localStorage.getItem('theme')) localStorage.setItem('light-theme');

 const initCheckingTheme = async function() {
   if(localStorage.getItem('theme') === 'light-theme') {
      body.classList.add('light-theme');
      switcherIcon.classList.toggle('move-switcher-icon');
      switcherIcon.querySelector('.icon-body').classList.toggle('icon-body-light-color');
      switcherIcon.querySelectorAll('.moon-spots').forEach(spot => spot.classList.toggle('remove-moon-spots'));
      switcherIcon.querySelectorAll('.icon-face').forEach(part => part.classList.toggle('icon-face-light-color'));
   } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
   };

   body.classList.contains('dark-theme') ? colorSwitcherText.textContent = 'Dark' : colorSwitcherText.textContent = 'Light';
};

initCheckingTheme();

export const changingWavesColors = function() {
   let darkOrLightThemeWaves = body.classList.contains('light-theme') ? lightModeWaveColors : darkModeWaveColors;
   
   for(let i = 0; i < waves.length; i++) {
      waves[i].waveColor = darkOrLightThemeWaves[i];
   };
};

let changingParticles = function() {
   if(body.classList.contains('dark-theme')) {
      particlesArray.length = 0;
      particleInit();
   } else {
      particlesArray.length = 0;
      particlesArray.push(new Particles(window.innerWidth / 2, window.innerHeight - 150, '#FDFFA4', 0.5, 0.5, 120));
   };
};

colorSwitcherContainer.addEventListener('click', function() {
   colorSwitcherContainer.classList.toggle('color-switcher-button-container-light-background');

   body.classList.toggle('dark-theme');
   body.classList.toggle('light-theme');

   body.classList.contains('light-theme') ? localStorage.setItem('theme', 'light-theme') : localStorage.setItem('theme', 'dark-theme');

   body.classList.contains('dark-theme') ? colorSwitcherText.textContent = 'Dark' : colorSwitcherText.textContent = 'Light';

   changingWavesColors();
   changingParticles();

   switcherIcon.classList.toggle('move-switcher-icon');
   switcherIcon.querySelector('.icon-body').classList.toggle('icon-body-light-color');
   switcherIcon.querySelectorAll('.moon-spots').forEach(spot => spot.classList.toggle('remove-moon-spots'));
   switcherIcon.querySelectorAll('.icon-face').forEach(part => part.classList.toggle('icon-face-light-color'));
});
