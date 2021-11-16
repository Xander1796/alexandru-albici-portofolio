import { changingWavesColors } from "./dark-mode.js";

const canvas = document.querySelector('#hero-wave');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Wave {
    constructor(waveHeight, waveFrequency, waveAmplitude, waveColor, waveIncrement, waveDirection) {
      this.waveHeight = waveHeight;
      this.waveFrequency = waveFrequency;
      this.waveAmplitude = waveAmplitude;
      this.waveColor = waveColor;
      this.waveIncrement = waveIncrement;
      this.waveDirection = waveIncrement * waveDirection;
    };

    drawWave() {
        ctx.strokeStyle = 'transparent';
        ctx.moveTo(0, canvas.height - this.waveHeight);

        ctx.beginPath();
        for(let i = 0;i < canvas.width; i++) {
            ctx.lineTo(i, canvas.height - this.waveHeight + Math.sin(i * 0.004 - (this.waveIncrement * this.waveDirection)) * this.waveAmplitude * Math.sin(this.waveIncrement));
        };
    
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(0, canvas.height - this.waveHeight);
    
        ctx.stroke();
        ctx.fillStyle = this.waveColor;
        ctx.fill();
    
        ctx.closePath();

        this.waveIncrement += this.waveFrequency;
    };
};

const wave1 = new Wave(150, 0.015, 50, '_', 0.001, -1);
const wave2 = new Wave(120, 0.015, 50, '_', 0.001, 1);
const wave3 = new Wave(100, 0.015, 50, '_', 0.001, -1);

export let darkModeWaveColors = ["#1B1B43", "#171739", "#11112A"];
export let lightModeWaveColors = ["#4E4EA4", "#454592", "#393976"];

export let waves = [wave1, wave2, wave3];

changingWavesColors();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < waves.length; i ++) {
        i % 2 ? waves[i].waveDirection = -1 : waves[i].waveDirection = 1;
        waves[i].drawWave();
    };

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});






