let glideIndex = 0;

function coinToss() {
    const glideOptions = [0, 0, 0.05];
    synth.portamento = glideOptions[Math.floor(Math.random() * glideOptions.length)];
}

const asciiGlide = document.getElementById('ascii-glide');
asciiGlide.addEventListener('click', () => {
    // const glideRandom = setInterval(() => {
    //     const glideOptions = [0, 0, 0.05];
    //     synth.portamento = glideOptions[Math.floor(Math.random() * glideOptions.length)];
    //     console.log(synth.portamento);
    // }, bpm.value);
    // console.log(glideRandomState);
    glideIndex++;
    const glideText = ['[ ]', '[@]', '[p]'];
    const glideStates = [0, 0.05, 'random'];
    let glideState = glideStates[glideIndex % glideStates.length];

    asciiGlide.innerText = glideText[[glideIndex % glideText.length]];

    // console.log(glideState);
    if (glideState === 'random') {
        // glideRandom;
        synth.portamento = glideRandomState;
    } else {
        synth.portamento = glideState;
        // clearInterval(glideRandom);
    }
});
