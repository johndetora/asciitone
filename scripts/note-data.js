// ------------------------- //
//        Note Data          //
// ------------------------- //

const majorScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
export let currentScale = majorScale;

export function setScale() {
    const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4'];
    const minorScale = ['C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4'];
    const pentScale = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];
    const scales = [majorScale, minorScale, pentScale, chromaticScale];
    const scaleSelect = document.getElementById('scale-select');
    scaleSelect.addEventListener('click', defineScale);
    let scaleIndex = 0; // Should be global
    function defineScale() {
        scaleIndex++;
        let currentNotes = document.querySelectorAll('.meter');
        // Set global current scale
        currentScale = scales[scaleIndex % scales.length];
        // Loop through the current note object and set the notes to the current slider values
        for (let i = 0; i < currentNotes.length; i++) {
            notes[i].note = currentScale[currentNotes[i].value];
            notes[15 - i].note = notes[i].note;
        }
        // DOM
        if (currentScale === scales[0]) scaleSelect.innerText = '[scale: major]';
        if (currentScale === scales[1]) scaleSelect.innerText = '[scale: minor]';
        if (currentScale === scales[2]) scaleSelect.innerText = '[scale: pent]';
        if (currentScale === scales[3]) scaleSelect.innerText = '[scale: chrom]';
    }
}

export let notes = [
    {
        // Step 1
        time: '0:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 2
        time: '0:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 3
        time: '0:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 4
        time: '0:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 5
        time: '1:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 6
        time: '1:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 7
        time: '1:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 8
        time: '1:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    // // Added
    {
        // Step 9
        time: '2:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 10
        time: '2:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 11
        time: '2:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },

    {
        // Step 12
        time: '2:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 13
        time: '3:0:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 14
        time: '3:1:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 15
        time: '3:2:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
    {
        // Step 16
        time: '3:3:0',
        note: currentScale[6],
        velocity: 1,
        timing: '16n',
        repeat: 0,
    },
];
