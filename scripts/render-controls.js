// ------------------------- //
//    Slider Animations      //
// ------------------------- //

const noteMeters = document.querySelectorAll('#ascii-meter');
const asciiRepeater = document.querySelectorAll('#ascii-repeater');
let transportInput = document.querySelector('#bpm');

export function renderControls() {
    const synthControls = document.querySelector('#synth-container');
    const fxControls = document.querySelector('#fx-container');
    synthControls.addEventListener('input', e => renderHorizontalControls(e));
    fxControls.addEventListener('input', e => renderHorizontalControls(e));
    renderTempoSlider();
    initVerticalControls();
    initHorizontalControls();
}

//TODO: add these conditions to renderHorizontalControls
function renderTempoSlider() {
    transportInput.addEventListener('input', ({ target }) => {
        const tempoMeter = document.getElementById('ascii-bpm');
        let block = '▓';
        let pipe = '|';
        let equals = '═';
        let linesAmount = parseInt(target.value / 20);
        tempoMeter.innerHTML = pipe.repeat(linesAmount - 1) + block + equals.repeat(25 - linesAmount) + ` ${pipe}`;
    });
}
function renderHorizontalControls(e) {
    let target = e.target;
    let block = '▓';
    let pipe = '|';
    let dash = '-';
    const FACTOR = 31;
    const CF_FACTOR = 18;
    const CF_FACTOR_CALC = parseInt((CF_FACTOR / target.max) * target.value);
    let linesAmount = parseInt((FACTOR / target.max) * target.value);
    if (target.id === 'crossfader') {
        linesAmount = CF_FACTOR_CALC;
        document.getElementById(target.dataset.ascii).innerText = pipe.repeat(linesAmount) + block + pipe.repeat(CF_FACTOR - linesAmount) + pipe;
    } else if (target.id === 'harmonicity') {
        linesAmount = CF_FACTOR_CALC;
        document.getElementById(target.dataset.ascii).innerText = pipe.repeat(linesAmount) + block + pipe.repeat(CF_FACTOR - linesAmount) + pipe;
        document.getElementById('ascii-harmonicity-num').innerText = pipe + parseFloat(target.value).toFixed(1) + pipe;
    } else if (target.id !== 'glide') {
        document.getElementById(target.dataset.ascii).innerText = pipe + pipe.repeat(linesAmount) + block + dash.repeat(FACTOR - linesAmount) + pipe;
    }
}
//TODO: this does work.  Just gotta see if it's worth adding a class to every control that would use it.
function initHorizontalControls() {
    const controls = document.querySelectorAll('.hControl');
    const controlsAscii = document.querySelectorAll('.ascii-params');
    let block = '▓';
    let pipe = '|';
    let dash = '-';
    let FACTOR = 31;
    for (let i = 0; i < controls.length; i++) {
        let linesAmount = parseInt((FACTOR / controls[i].max) * controls[i].value);
        console.log(controls[i]);
        // console.log(controlsAscii[i].innerText);
        controlsAscii[i].innerText = pipe + pipe.repeat(linesAmount) + block + dash.repeat(FACTOR - linesAmount) + pipe;
    }
}

/// Initialize note and flutter controls ui
