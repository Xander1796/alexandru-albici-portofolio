
const particlesCanvas = document.querySelector('#particle-canvas');
const particlesCtx = particlesCanvas.getContext('2d');
const body = document.querySelector('body');


window.addEventListener('load', function() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight; 
});

export let numberOfParticles = window.innerWidth < 1000 ? 40 : 130;
let maximumSizeOfParticle = 2;
let minimumSizeOfParticle = 0.5;

let colorsArray = ['_', "#9F9FFF", '#FDFFA4'];

export class Particles {
    constructor(x, y, color, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    };

    update() {
        this.y += this.directionY;
        this.x += this.directionX;
    }

    draw() {
        particlesCtx.shadowColor = this.color;
        particlesCtx.shadowBlur = 15;
        particlesCtx.fillStyle = this.color;
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fill();
        particlesCtx.closePath();
    };
};

export let particlesArray = [];

export function particleInit() {
    if(!localStorage.getItem('theme')) localStorage.setItem('theme', 'light-theme');
    if(localStorage.getItem('theme') === 'dark-theme') {
        for(let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particles(Math.random() * window.innerWidth, Math.random() * window.innerHeight, '#9F9FFF', Math.random() - 0.5, Math.random() - 0.5, Math.floor(Math.random() * (maximumSizeOfParticle - minimumSizeOfParticle + 1) + minimumSizeOfParticle)));
        };
    };

    if(localStorage.getItem('theme') === 'light-theme') {
        particlesArray.push(new Particles(window.innerWidth / 2, window.innerHeight - 150, '#FDFFA4', 0.5, 0.5, 120));
    };
};

particleInit();

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particlesArray.forEach((particle, i) => {
       particle.update();
       particle.draw();
       if(particle.y < 0 || particle.y > particlesCanvas.height - 150) {
         particle.directionY = -particle.directionY;
        };
        if(particle.x < 0 || particle.x > particlesCanvas.width) {
         particle.directionX = -particle.directionX;
        };
    });
    requestAnimationFrame(animateParticles);
};

animateParticles();

let checkingResizingStatusTimeout;
let hasStoppedResizing = false;

window.addEventListener('resize', function() {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
      
    if(window.innerWidth < 1000) numberOfParticles = 50;

});

