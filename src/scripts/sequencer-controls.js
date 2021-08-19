// ------------------------- //
//   Sequencer User Input    //
// ------------------------- //
import { notes } from './note-data';
import { currentScale } from './note-data';

export function sequencerInput() {
    const stepContainer = document.querySelector('#steps');
    const noteMeters = document.querySelectorAll('#ascii-meter');
    const metersEl = document.querySelectorAll('.meter');
    const asciiRepeater = document.querySelectorAll('#ascii-repeater');

    initVerticalControls();

    // // Notes and Repeats
    stepContainer.addEventListener('input', ({ target }) => {
        // Note Sliders
        if (target.className === 'meter') {
            let reverse = 15 - target.dataset.index;
            // className == Meter so that the repeater slider isn't targeted
            noteMeters[target.dataset.index].innerHTML = renderNoteMeters(target.value); // Sets bar animation value
            notes[target.dataset.index].note = currentScale[target.value];
            notes[reverse].note = currentScale[target.value];
        }
        if (target.className === 'repeater-range') {
            notes[target.dataset.index].repeat = parseInt(target.value);
            repeatAnim(target);
        }
    });

    function initVerticalControls() {
        for (let i = 0; i < noteMeters.length; i++) {
            // noteMeters[i].innerHTML = renderNoteMeters(6);
            // Sets the notemeters value and rendering
            noteMeters[i].innerHTML = renderNoteMeters(currentScale.indexOf(notes[i].note));
            metersEl[i].value = currentScale.indexOf(notes[i].note);
            asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│↑' + '<br>' + '│-│↓' + '<br>' + '│o│' + '<br>';
            if (i === 7) {
                // Don't render arrows on last step
                asciiRepeater[i].innerHTML = '│-│' + '<br>' + '│-│' + '<br>' + '│-│' + '<br>' + '│o│' + '<br>';
            }
        }
    }

    // ///////  Update Note Meters  ////////
    function renderNoteMeters(inputVal) {
        const BARS_MAX = 12; // Max slider value for note meters
        let top = '_' + '<br>';
        let bottom = '^' + '<br>';
        let row = '|░|' + '<br>';
        let filled = '|▓|' + '<br>';
        return top + row.repeat(BARS_MAX - inputVal) + filled.repeat(inputVal) + filled + bottom;
    }

    // // Repeater ascii-animation. There's probably a better way to do this but it works.
    function repeatAnim(target) {
        let repeats = parseInt(target.value);
        const empty = '│-│' + '<br>';
        let arrowUp = '│-│↑' + '<br>';
        let arrowDown = '│-│↓' + '<br>';
        let arrowUpFilled = '│o│↑' + '<br>';
        let arrowDownFilled = '│o│↓' + '<br>';
        const filled = '│o│' + '<br>';
        // Don't render the arrows on the last step
        if (parseInt(target.dataset.index) === 7) {
            arrowUp = empty;
            arrowDown = empty;
            arrowUpFilled = filled;
            arrowDownFilled = filled;
        }
        if (repeats === 0) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDown + filled;
        if (repeats === 1) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUp + arrowDownFilled + empty;
        if (repeats === 2) asciiRepeater[target.dataset.index].innerHTML = empty + arrowUpFilled + arrowDown + empty;
        if (repeats === 3) asciiRepeater[target.dataset.index].innerHTML = filled + arrowUp + arrowDown + empty;
    }

    // Snooze Checks
    stepContainer.addEventListener('change', ({ target }) => {
        const asciiCheck = document.querySelectorAll('#ascii-checkbox');
        if (target.type == 'checkbox' && target.checked) {
            notes[target.dataset.index].velocity = 1; // Turns step 'on'
            // UI Update
            asciiCheck[target.dataset.index].style.color = 'var(--checksOn)';
            asciiRepeater[target.dataset.index].style.color = 'var(--repeaterOn)';
            noteMeters[target.dataset.index].style.color = 'var(--metersOn)';
        } else if (target.type == 'checkbox' && !target.checked) {
            notes[target.dataset.index].velocity = 0; // Turns step 'off'
            // UI Update
            noteMeters[target.dataset.index].style.color = 'var(--off)';
            asciiRepeater[target.dataset.index].style.color = 'var(--off)';
            asciiCheck[target.dataset.index].style.color = 'var(--off)';
        }
    });
}
