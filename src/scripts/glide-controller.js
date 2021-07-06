import { synth } from './audio-objects.js';

console.log(rand);
function setRandomGlide() {
    const glideOptions = [0, 0, 0, 0, 0.01, 0.02, 0.05, 0.07];
    synth.portamento = glideOptions[Math.floor(Math.random() * glideOptions.length)];
}
let interval = (bpm.value * 10) / 8;
export function glideController() {
    let glideIndex = 0;
    const asciiGlide = document.getElementById('ascii-glide');
    asciiGlide.addEventListener('click', () => {
        glideIndex++;
        const glideRandom = setInterval(setRandomGlide, bpm.value);
        const glideText = ['[ ]', '[@]', '[p]'];
        const glideStates = [0, 0.05, 'random'];

        let glideState = glideStates[glideIndex % glideStates.length];
        asciiGlide.innerText = glideText[[glideIndex % glideText.length]];

        if (glideState === 'random') {
            glideRandom;
        } else {
            synth.portamento = glideState;
            clearInterval(glideRandom);
        }
    });
}
