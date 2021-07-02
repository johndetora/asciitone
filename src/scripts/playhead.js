import { handleTaps } from './index.js';

const playHead = document.querySelector('#playhead');
playHead.addEventListener('click', e => handleTaps(e));

///// ASCII Playhead Animation
export function playHeadUpdate(step) {
    let headFwd = '>';
    let headBack = '<';
    let tail = '──────';
    let space = '&nbsp'.repeat(6);
    // Draw Forward
    if (step === 0) playHead.innerHTML = headFwd;
    if (step > 0 && step <= 7) playHead.innerHTML = tail.repeat(step) + headFwd;
    // Draw Backward
    if (step === 8) playHead.innerHTML = space.repeat(15 - step) + headBack;
    if (step === 15) playHead.innerHTML = headBack + tail.repeat(step - 8);
    if (step > 8 && step < 15) {
        playHead.innerHTML = '';
        playHead.innerHTML = space.repeat(15 - step) + headBack + tail.repeat(step - 8);
    }
    if (step === 'clear') return (playHead.innerText = '');
}
