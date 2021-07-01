export function renderNoteMeters(inputVal) {
    const BARS_MAX = 12; // Max slider value for note meters
    let top = '_' + '<br>';
    let bottom = '^' + '<br>';
    let row = '|░|' + '<br>';
    let filled = '|▓|' + '<br>';
    return top + row.repeat(BARS_MAX - inputVal) + filled.repeat(inputVal) + filled + bottom;
}
