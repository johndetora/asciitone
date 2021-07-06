import { synth, delay, filter, crossFade, lfo, toFilt, toModIndex, toFreqRatio, reverb } from './audio-objects.js';
import { glideRandomState } from './index.js';

//TODO: could easy crush this down to half the size.
// Can do for instance synth[target.dataset.module][target.dataset.action] = target.value
// TODO: after that, turn them into arrow functions
export function synthParamController() {
    //////// OSC Select Boxes ////////////
    const oscWaves = ['sine', 'triangle', 'square', 'sawtooth'];

    const oscWaveSwitch = document.querySelector('#ascii-osc-wave');
    let waveIndex = 0;
    oscWaveSwitch.addEventListener('click', () => {
        waveIndex++;
        let currentWave = oscWaves[waveIndex % oscWaves.length];
        oscWaveSwitch.innerText = `[${oscWaves[waveIndex % oscWaves.length]}]`;
        synth.oscillator.type = currentWave;
    });

    //// Glide /////
    let glideIndex = 0;
    const asciiGlide = document.getElementById('ascii-glide');
    asciiGlide.addEventListener('click', () => {
        glideIndex++;
        const glideText = ['[ ]', '[@]'];
        const glideStates = [0, 0.05];
        let glideState = glideStates[glideIndex % glideStates.length];
        asciiGlide.innerText = glideText[[glideIndex % glideText.length]];
        synth.portamento = glideState;
    });

    /////// MOD WAVE ///////
    const modWaveSwitch = document.querySelector('#ascii-mod-wave');
    let modWaveIndex = 0;
    modWaveSwitch.addEventListener('click', function () {
        modWaveIndex++;
        let currentWave = oscWaves[modWaveIndex % oscWaves.length];
        modWaveSwitch.innerText = `[${currentWave}]`;
        synth.modulation.type = currentWave;
    });

    ///// HARMONICITY ///////
    let harmonicityInput = document.querySelector('#harmonicity');
    harmonicityInput.addEventListener('input', ({ target }) => {
        synth.harmonicity.value = target.value;
    });

    //// ENVELOPE ///////
    const envelope = document.querySelector('#envelope-container');
    envelope.addEventListener('input', ({ target }) => {
        synth.envelope[target.dataset.action] = target.value;
    });

    ///// MOD ENVELOPE
    const modEnvelope = document.querySelector('#modulation-envelope');
    modEnvelope.addEventListener('input', ({ target }) => {
        synth.modulationEnvelope[target.dataset.action] = target.value;
        if (target.dataset.action === 'modulationIndex') synth[target.dataset.action].value = target.value;
    });

    ////// CROSSFADER ////////
    const crossFadeInput = document.getElementById('crossfader');
    crossFadeInput.addEventListener('input', () => {
        crossFade.fade.value = crossFadeInput.value;
    });

    /////// FILTER ///////
    const filterControls = document.querySelector('#filter-container');
    filterControls.addEventListener('input', ({ target }) => {
        filter[target.dataset.parameter].value = target.value;
        // circleGrow(target);
    });

    //// LFO
    // const lfoWaveBtn = document.getElementById('lfo-wave');
    // let lfoWaves = ['sine', 'triangle', 'square2', 'sawtooth2'];
    // const lfoWaveLabels = ['sine', 'triangle', 'square', 'sawtooth'];
    // let lfoWaveIndex = 0;

    const lfoRate = document.getElementById('lfo-rate');
    const lfoAmt = document.querySelector('#lfo-amount');
    const lfoDestinations = [toFilt, toModIndex, toFreqRatio];
    const lfoDestinationsText = ['filter', 'mod index', 'freq ratio'];
    let lfoState = lfoDestinations[0];
    let lfoDestIndex = 0;
    const lfoDestBtn = document.getElementById('lfo-dest');

    // lfoWaveBtn.addEventListener('click', () => {
    //     lfoWaveIndex++;
    //     lfoWaveBtn.innerText = `[${lfoWaveLabels[lfoWaveIndex % lfoWaves.length]}]`;
    //     lfo.type = lfoWaves[lfoWaveIndex % lfoWaves.length];
    //     console.log(lfo.type);
    // });

    lfoDestBtn.addEventListener('click', () => {
        lfoDestIndex++;
        let destBtnText = lfoDestinationsText[lfoDestIndex % lfoDestinationsText.length];
        lfoState = lfoDestinations[lfoDestIndex % lfoDestinations.length];
        // Resets gain for each parameter
        lfoDestinations.forEach(destination => (destination.gain.value = 0));
        // Sets gain to current slider value
        lfoState.gain.value = lfoAmt.value;
        lfoDestBtn.innerText = `> [${destBtnText}]`;
    });
    lfoRate.addEventListener('input', function () {
        lfo.frequency.value = this.value;
    });

    lfoAmt.addEventListener('input', function () {
        lfoState.gain.value = this.value;
    });

    //////// Delay /////////////
    const delayControl = document.querySelector('#delay-container');
    delayControl.addEventListener('input', ({ target }) => {
        delay[target.dataset.parameter].value = target.value;
    });

    const reverbControl = document.querySelector('#reverb-container');
    reverbControl.addEventListener('input', ({ target }) => {
        if (target.id === 'reverbMix') {
            reverb[target.dataset.parameter].value = target.value;
        } else {
            reverb[target.dataset.parameter] = target.value;
        }
    });
}
