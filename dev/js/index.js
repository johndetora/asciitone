import * as Tone from 'tone';
import '../styles/main.css';
import { themeSelector } from './theme-select.js';
import { synth, initAudioChain } from './audio-objects.js';
import { synthParamController } from './synth-controls.js';
import { notes, setScale, currentScale } from './note-data.js';
import { browserChecker } from './browser-checker.js';
import { mobileTabController, desktopTabController } from './tab-controller.js';
import { renderControls } from './horizontal-controls.js';
import { sequencerInput } from './sequencer-controls';

// ------------------------- //
//         Variables         //
// ------------------------- //
//TODO: See which ones can go into their own functions

const playHead = document.querySelector('#playhead');
let sequenceIndex = 0;
let steps = 8; // Total step length

// This will become index.js
// TODO: figure out why the theme selector breaks theme persistance if loaded here:
themeSelector();

window.addEventListener('load', () => {
    sequencerInput();
    desktopTabController();
    mobileTabController();
    renderControls();
    setScale();
    setTempo();
    initAudioChain();
    browserChecker();
    synthParamController();
    setSeqMode();
    renderTempoSlider();
});

// ------------------------- //
//    Transport / Init       //
// ------------------------- //
//Audio play confirmation - needed because of autoplay policy
document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
});

//////////////// Start Stop Init ////////////////////////
//  Starts transport and initializes certain animations like playhead and spin //
//TODO: add space key to play/pause
let playButton = document.getElementById('play-button');
playButton.addEventListener('click', async () => {
    await Tone.start();
    const asciiPlay = '[play]';
    const asciiPause = '[pause]';
    if (Tone.Transport.state !== 'started') {
        playButton.innerText = asciiPause;
        Tone.Transport.start();
        animateLFO(0);
        playHeadUpdate(0);
        sequenceIndex = 0;
    } else {
        playButton.innerText = asciiPlay;
        playHead.innerText = '';
        Tone.Transport.stop();
        sequenceIndex = 0;
    }
});

//TODO: add these conditions to renderHorizontalControls
function renderTempoSlider() {
    let transportInput = document.querySelector('#bpm');
    transportInput.addEventListener('input', ({ target }) => {
        const tempoMeter = document.getElementById('ascii-bpm');
        let block = '▓';
        let pipe = '|';
        let equals = '═';
        let linesAmount = parseInt(target.value / 20);
        tempoMeter.innerHTML = pipe.repeat(linesAmount - 1) + block + equals.repeat(25 - linesAmount) + ` ${pipe}`;
    });
}

function setTempo() {
    let transportInput = document.querySelector('#bpm');
    Tone.Transport.bpm.value = transportInput.value;
    transportInput.addEventListener('input', ({ target }) => {
        Tone.Transport.bpm.value = target.value;
    });
}

// Helper
// window.addEventListener('click', helper);
function helper() {
    console.log(currentScale);
    console.log(notes);
}

// ------------------------- //
//     Play Sequence         //
// ------------------------- //

let part = new Tone.Part((time, value) => {
    let step = sequenceIndex % steps;
    if (value.repeat === 0) {
        synth.triggerAttackRelease(value.note, value.timing, time, value.velocity);
    }
    if (value.repeat === 1) {
        // Can try setting the decay to a low value before this, and then setting it back after the notes play
        synth.triggerAttackRelease(value.note, '32n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '32n', time + 0.1, value.velocity);
    }
    if (value.repeat === 2) {
        synth.triggerAttackRelease(value.note, '48n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.075, value.velocity);
        synth.triggerAttackRelease(value.note, '48n', time + 0.15, value.velocity);
    }
    if (value.repeat === 3) {
        synth.triggerAttackRelease(value.note, '64n', time, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.05, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.1, value.velocity);
        synth.triggerAttackRelease(value.note, '64n', time + 0.15, value.velocity);
    }
    playHeadUpdate(step);
    sequenceIndex++;
}, notes);

/////// Transport and Loop ////////////
part.start('0m');
part.loopStart = '0m';
part.loopEnd = '2m';
part.loop = true;
Tone.Transport.loopStart = '0m';
Tone.Transport.loopEnd = '4m';
Tone.Transport.loop = true;
// Sequence mode
//TODO: refactor and add add array of modes like in scale select
function setSeqMode() {
    const ASCII_FORWARD = '[ --> ]';
    const ASCII_PENDULUM = '[ <--> ]';
    const modeBtn = document.getElementById('seq-mode');
    let pendulum = false;
    modeBtn.addEventListener('click', e => {
        pendulum = !pendulum;
        if (pendulum === true) {
            modeBtn.innerText = ASCII_PENDULUM;
            part.loopEnd = '4m';
            steps = 16;
        } else {
            modeBtn.innerText = ASCII_FORWARD;
            part.loopEnd = '2m';
            steps = 8;
        }
    });
}
// ------------------------- //
//       Animations          //
// ------------------------- //

///// ASCII Playhead Animation
function playHeadUpdate(step) {
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
}

///////  Spin  ////////
function animateLFO(index) {
    const ASCII_SPIN = ['&ndash;', '/', '|', '\\']; // Backward Spin
    document.getElementById('ascii-lfo-spin').innerHTML = ASCII_SPIN[index];
    let inputSlider = document.getElementById('lfo-rate');
    let frequency = inputSlider.value;
    setTimeout(() => {
        if (Tone.Transport.state === 'started') {
            animateLFO((index + 1) % ASCII_SPIN.length);
        }
    }, 500 / frequency);
}
