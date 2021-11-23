
const colorSwitcherContainer = document.querySelector('.color-switcher-button');
const colorSwitcherButtonHandle = document.querySelector('.color-switcher-button-handle');
const body = document.querySelector('body');

if(!localStorage.getItem('theme')) localStorage.setItem('theme', 'light-theme');

 const initCheckingTheme = async function() {
   if(localStorage.getItem('theme') === 'light-theme') {
      body.classList.add('light-theme');
   } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
   };
};

initCheckingTheme();


colorSwitcherContainer.addEventListener('click', function() {
   colorSwitcherContainer.classList.toggle('color-switcher-button-container-light-background');

   body.classList.toggle('dark-theme');
   body.classList.toggle('light-theme');

   body.classList.contains('light-theme') ? localStorage.setItem('theme', 'light-theme') : localStorage.setItem('theme', 'dark-theme');
});
