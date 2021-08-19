import { renderNoteMeters } from './render-note-meters';

// ------------------------- //
//        Note Data          //
// ------------------------- //

const majorScale = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
export let currentScale = majorScale;
let scaleIndex = 0; // Should be global

export function setScale() {
    const chromaticScale = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4'];
    const minorScale = ['C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4'];
    const pentScale = ['C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'];
    const scales = [majorScale, minorScale, pentScale, chromaticScale];
    const scaleSelect = document.getElementById('scale-select');
    let scaleNames = ['[scale: major]', '[scale: minor]', '[scale: pent]', '[scale: chrom]'];

    scaleSelect.innerText = scaleNames[scaleIndex % scales.length];
    scaleSelect.addEventListener('click', defineScale);

    function defineScale() {
        scaleIndex++;

        console.log(scaleIndex);

        let currentNotes = document.querySelectorAll('.meter');
        const MAX = currentNotes.length;
        // Set global current scale
        currentScale = scales[scaleIndex % scales.length];

        // Set Storage
        storage.scale = currentScale;
        storage.index = scaleIndex;
        localStorage.setItem('scale', JSON.stringify(storage));
        setNotes();

        // Loop through the current note object and set the notes to the current slider values
        for (let i = 0; i < MAX; i++) {
            notes[i].note = currentScale[currentNotes[i].value];
            notes[15 - i].note = notes[i].note;
        }

        scaleSelect.innerText = scaleNames[scaleIndex % scales.length];
        // if (currentScale === scales[0]) scaleSelect.innerText = '[scale: major]';
        // if (currentScale === scales[1]) scaleSelect.innerText = '[scale: minor]';
        // if (currentScale === scales[2]) scaleSelect.innerText = '[scale: pent]';
        // if (currentScale === scales[3]) scaleSelect.innerText = '[scale: chrom]';
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

function getNotes() {
    // If Notes have been saved, load them
    const noteMeters = document.querySelectorAll('#ascii-meter');
    const metersEl = document.querySelectorAll('.meter');
    if (localStorage.getItem('notes')) {
        console.log('got them');
        let storedNotes = JSON.parse(localStorage.getItem('notes'));
        notes = storedNotes;
    }

    if (localStorage.getItem('scale')) {
        let savedScale = JSON.parse(localStorage.getItem('scale'));
        console.log(savedScale.scale);
        currentScale = savedScale.scale;
        scaleIndex = parseInt(savedScale.index);
        console.log(currentScale);
    }
    console.log('current', currentScale);
}

function setNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

let storage = {
    scale: currentScale,
    // index: scaleIndex,
    index: 0,
    steps: notes,
};
// console.log(storage);
window.addEventListener('load', getNotes());
setInterval(setNotes, 5000);
