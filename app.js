'use strict';

const wave = document.querySelectorAll('.section-wave-delimitator-svg');
const body = document.querySelector('body');


let scrollDirection = 0;
let transformVal = 0;

window.addEventListener('scroll', function() {
    // if(scrollDirection < +Math.abs(body.getBoundingClientRect().top)) {console.log('down')} else { console.log('up')};
    // scrollDirection = +Math.abs(body.getBoundingClientRect().top);
    // let newTransformVal = +window.getComputedStyle(wave[0])
    // .getPropertyValue('transform')
    // .split(",")[4];
    // transformVal += newTransformVal;
    
    let distanceFromTop = body.getBoundingClientRect().top;
    wave.forEach(wave => wave.style.transform = `translateX(${distanceFromTop}px)`);
    
    console.log(wave[0])

    console.log(`${body.getBoundingClientRect().top}px`)
})

