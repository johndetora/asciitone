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
import { playHeadUpdate } from './playhead';
import { glideController } from './glide-controller';
// ------------------------- //
//         Variables         //
// ------------------------- //
//TODO: See which ones can go into their own functions

let sequenceIndex = 0;
let steps = 8; // Total step length

// This will become index.js
// TODO: figure out why the theme selector breaks theme persistance if loaded here:
themeSelector();

window.addEventListener('load', () => {
    // glideController();
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
//TODO: put what's inside start and stopped into a master function
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
        playHeadUpdate('clear');
        Tone.Transport.stop();
        sequenceIndex = 0;
        clearInterval(randomMode);
    }
});

/*          ////////////// TEMPO /////////////////////// */

//TODO: add these conditions to renderHorizontalControls
//TODO: make tap tempo respond
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
// TODO: combine these three into own component
function refreshSlider(e) {
    const tempoMeter = document.getElementById('ascii-bpm');
    let block = '▓';
    let pipe = '|';
    let equals = '═';
    let linesAmount = parseInt(e / 20);
    tempoMeter.innerHTML = pipe.repeat(linesAmount - 1) + block + equals.repeat(25 - linesAmount) + ` ${pipe}`;
}

function setTempo() {
    let transportInput = document.querySelector('#bpm');
    Tone.Transport.bpm.value = transportInput.value;
    transportInput.addEventListener('input', ({ target }) => {
        Tone.Transport.bpm.value = target.value;
    });
}
/**       /////////////////////////////////////                          */

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

    if (random === true && step === 0) {
        setRandomNotes();
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
let randomMode;
let random = false;
function setSeqMode() {
    // const modes = ['forward', 'pendulum'];
    const ASCII_FORWARD = '[ --> ]';
    const ASCII_PENDULUM = '[ <-> ]';
    const ASCII_RANDOM = '[ ??? ]';
    const modeText = [ASCII_FORWARD, ASCII_PENDULUM, ASCII_RANDOM];
    let modeIndex = 1;
    const modeBtn = document.getElementById('seq-mode');

    modeBtn.addEventListener('click', e => {
        let currentMode = modeIndex % modeText.length;
        console.log(notes);
        modeBtn.innerText = modeText[currentMode];
        if (currentMode === 0) {
            part.loopEnd = '2m';
            steps = 8;
            random = false;
        }
        if (currentMode === 1) {
            part.loopEnd = '4m';
            steps = 16;
            clearInterval(randomMode);
            random = false;
        }
        if (currentMode === 2) {
            part.loopEnd = '2m';
            steps = 8;
            setRandomNotes();
            random = true;
        }
        modeIndex++;
    });
}

//TODO: move this and these other controls back to the sequencer controls
// ///////  Update Note Meters  ////////
function renderNoteMeters(inputVal) {
    const BARS_MAX = 12; // Max slider value for note meters
    let top = '_' + '<br>';
    let bottom = '^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(BARS_MAX - inputVal) + filled.repeat(inputVal) + filled + bottom;
}

function setRandomNotes() {
    const noteMeters = document.querySelectorAll('#ascii-meter');
    const metersEl = document.querySelectorAll('.meter');
    for (let i = 0; i < noteMeters.length; i++) {
        let rand = Math.floor(Math.random() * currentScale.length);
        notes[i].note = currentScale[rand];
        notes[15 - i].note = notes[i].note;
        noteMeters[i].innerHTML = renderNoteMeters(rand);
        // Calibrates input slider values
        metersEl[i].value = rand;
    }
}

// ------------------------- //
//       Animations          //
// ------------------------- //

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

// const sequence = {
//     setNoteData: () => {
//         stepContainer.addEventListener('input', ({ target }) => {
//             // Note Sliders
//             if (target.className === 'meter') {
//                 let reverse = 15 - target.dataset.index;
//                 // className == Meter so that the repeater slider isn't targeted
//                 noteMeters[target.dataset.index].innerHTML = renderNoteMeters(target.value); // Sets bar animation value
//                 notes[target.dataset.index].note = currentScale[target.value];
//                 notes[reverse].note = currentScale[target.value];
//             }
//             if (target.className === 'repeater-range') {
//                 notes[target.dataset.index].repeat = parseInt(target.value);
//                 repeatAnim(target);
//             }
//         });
//     },
//     propy: 'poop',
// };

window.addEventListener('keydown', e => keyHandler(e));

function keyHandler(e) {
    if (e.key === 't') {
        handleTaps();
    }
    if (e.code === 'Space') {
        console.log('space');
    }
}

//TODO: refactor this
let tapTotal = 0;
let startTimes = [];
export function handleTaps() {
    const MS = 1000;
    const TAPS_LIMIT = 5;
    // Pressing T starts the timer and adds a tap
    tapTotal++;
    startTimes.push(Date.now() / MS); //The tap is represented as that moment in time
    window.setTimeout(() => {
        if (tapTotal > 1 && tapTotal <= TAPS_LIMIT) {
            calcTempo(startTimes); // Calculate the times
        }
        tapTotal = 0; // reset times
        startTimes = [];
    }, 1000);
}
// Calculate the time elapsed between each step
// TODO: sum += looping through the array doesn't really make sense but when I changed it before it broke.  Try again later
function calcTempo(array) {
    let timeDiff = [];
    let sum = 0;
    for (let i = 0; i < array.length - 1; i++) {
        timeDiff.push(array[i + 1] - array[i]); // Find difference between each tap
    }
    // for (let k=0; k<)
    for (let j = 0; j < timeDiff.length; j++) {
        sum += timeDiff[j];
    }
    let average = sum / timeDiff.length;
    let bpm = 60 / average;
    Tone.Transport.bpm.value = bpm;
    refreshSlider(bpm); // Update tempo meter
    console.log('BPM changed to ' + bpm);
}
