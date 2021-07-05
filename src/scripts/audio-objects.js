import * as Tone from 'tone';
// ------------------------- //
//    Synth Parameters       //
// ------------------------- //

export const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
    portamento: 0,
    detune: 0,
    oscillator: {
        type: 'sine',
    },

    envelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.2,
        attackCurve: 'exponential',
    },
    modulation: {
        type: 'sine',
    },
    modulationEnvelope: {
        attack: 0.01,
        decay: 0,
        sustain: 1,
        release: 0.2,
        attackCurve: 'exponential',
    },
});

/// Delay object
export const delay = new Tone.FeedbackDelay({
    delayTime: 0.2,
    feedback: 0.1,
    wet: 0,
});

// Filter Object
export const filter = new Tone.BiquadFilter({
    frequency: 1500,
    type: 'lowpass',
});

export const reverb = new Tone.Reverb({
    wet: 0,
    decay: 1.5,
    preDelay: 0.01,
});

export const crossFade = new Tone.CrossFade(0);
export const lfo = new Tone.LFO(1, 0.1, 1500).start();
export const gain = new Tone.Gain(0.7);
export const modGain = new Tone.Gain(0.2);

export const toFilt = new Tone.Gain(0);
export const toModIndex = new Tone.Gain(0);
export const toFreqRatio = new Tone.Gain(0);
// ------------------------- //
//         Routing           //
// ------------------------- //
export function initAudioChain() {
    lfo.fan(toFilt, toModIndex, toFreqRatio);

    toFilt.connect(filter.frequency);
    toModIndex.connect(synth.modulationIndex);
    toFreqRatio.connect(synth.harmonicity);
    synth.chain(gain, crossFade.a);
    synth.modulationEnvelope.chain(modGain, crossFade.b);
    crossFade.connect(filter);
    filter.connect(delay);
    delay.connect(reverb);
    reverb.generate().then(reverb.toDestination(0.8));
}
