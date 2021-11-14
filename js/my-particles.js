const canvas = document.querySelector('#particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const numberOfParticles = 130;
let colorParticles = ["_", "rgba(67, 67, 126, .5)", "#5F5F9B", "#5C5CCF", "#FDFFA4"];

class Particles {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = 0.3;
        this.directionX = Math.random() - 0.5;
        this.directionY = Math.random() - 0.5;
        this.size = Math.ceil(Math.random() * 2);
        this.color = colorParticles[Math.ceil(Math.random() * 3)];
    };

    update() {
        this.y += this.directionY;
        this.x += this.directionX;
    }

    draw() {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
};

let particlesArray = [];

function init() {
    for(let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particles());
    };
};

init();


function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, i) => {
       particle.update();
       particle.draw();

       if(particle.y < 0 || particle.x < 0 || particle.y > canvas.width || particle.x > canvas.width) {
           setTimeout(() => {
               particlesArray.splice(i, 1);
            }, 0);
           const newParticle = new Particles();
           newParticle.draw();
           particlesArray.push(newParticle);
        };
    });
    requestAnimationFrame(animateParticles);
};

animateParticles();
