
const colorSwitcherContainer = document.querySelector('.color-switcher-button');
const switcherIcon = document.querySelector('.switcher-icon');
const body = document.querySelector('body');

if(!localStorage.getItem('theme')) localStorage.setItem('theme', 'light-theme');

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
};

initCheckingTheme();


colorSwitcherContainer.addEventListener('click', function() {
   colorSwitcherContainer.classList.toggle('color-switcher-button-container-light-background');

   body.classList.toggle('dark-theme');
   body.classList.toggle('light-theme');

   body.classList.contains('light-theme') ? localStorage.setItem('theme', 'light-theme') : localStorage.setItem('theme', 'dark-theme');

   switcherIcon.classList.toggle('move-switcher-icon');
   switcherIcon.querySelector('.icon-body').classList.toggle('icon-body-light-color');
   switcherIcon.querySelectorAll('.moon-spots').forEach(spot => spot.classList.toggle('remove-moon-spots'));
   switcherIcon.querySelectorAll('.icon-face').forEach(part => part.classList.toggle('icon-face-light-color'));
});
